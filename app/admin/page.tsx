'use client';

import { useState, useEffect } from 'react';
import ClickSpark from '@/components/ClickSpark';

interface Recommendation {
  type: string;
  content: string;
  timestamp: number;
  date: string;
}

interface AppleStatus {
  connected: boolean;
  configured: boolean;
}

// MusicKit JS ships no bundled types, so the global is typed as any.
declare global {
  interface Window {
    MusicKit: any;
  }
}

const MUSICKIT_SRC = 'https://js-cdn.music.apple.com/musickit/v3/musickit.js';

// Injects the MusicKit script once and resolves when the global is ready.
function loadMusicKit(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (window.MusicKit) {
      resolve(window.MusicKit);
      return;
    }

    const timer = window.setTimeout(
      () => reject(new Error('musickit js did not load in time')),
      15000
    );

    document.addEventListener(
      'musickitloaded',
      () => {
        window.clearTimeout(timer);
        resolve(window.MusicKit);
      },
      { once: true }
    );

    if (!document.querySelector(`script[src="${MUSICKIT_SRC}"]`)) {
      const script = document.createElement('script');
      script.src = MUSICKIT_SRC;
      script.async = true;
      script.onerror = () => {
        window.clearTimeout(timer);
        reject(new Error('could not load musickit js'));
      };
      document.head.appendChild(script);
    }
  });
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const [songRecs, setSongRecs] = useState<Recommendation[]>([]);
  const [writingRecs, setWritingRecs] = useState<Recommendation[]>([]);
  const [bookRecs, setBookRecs] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentSong, setCurrentSong] = useState({ title: '', url: '' });
  const [editingSong, setEditingSong] = useState(false);
  const [songUpdateSuccess, setSongUpdateSuccess] = useState(false);
  const [titleFocused, setTitleFocused] = useState(false);
  const [urlFocused, setUrlFocused] = useState(false);

  // The apple music endpoints re-check the password on every call, so the
  // admin password is kept in sessionStorage for the session. Tradeoff: it is
  // readable by any script on this page, acceptable for a single-user admin.
  const [adminPassword, setAdminPassword] = useState('');
  const [appleStatus, setAppleStatus] = useState<AppleStatus | null>(null);
  const [appleBusy, setAppleBusy] = useState(false);
  const [appleMessage, setAppleMessage] = useState('');

  useEffect(() => {
    // Check if already authenticated in session storage
    const authenticated = sessionStorage.getItem('admin_authenticated');
    if (authenticated === 'true') {
      const storedPassword = sessionStorage.getItem('admin_password') || '';
      setIsAuthenticated(true);
      setAdminPassword(storedPassword);
      fetchRecommendations();
      fetchAppleStatus(storedPassword);
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsAuthenticating(true);

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.authenticated) {
        sessionStorage.setItem('admin_authenticated', 'true');
        sessionStorage.setItem('admin_password', password);
        setIsAuthenticated(true);
        setAdminPassword(password);
        setPassword('');
        fetchRecommendations();
        fetchAppleStatus(password);
      } else {
        setAuthError('Incorrect password');
      }
    } catch (err) {
      setAuthError('Authentication failed. Please try again.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    sessionStorage.removeItem('admin_password');
    setIsAuthenticated(false);
    setAdminPassword('');
    setAppleStatus(null);
    setAppleMessage('');
    setSongRecs([]);
    setWritingRecs([]);
    setBookRecs([]);
  };

  const fetchAppleStatus = async (pw: string) => {
    if (!pw) {
      setAppleMessage('log in again to manage apple music.');
      return;
    }

    try {
      const response = await fetch('/api/apple-music/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: pw, status: true }),
      });

      if (!response.ok) {
        setAppleMessage('could not check apple music status.');
        return;
      }

      const data = await response.json();
      setAppleStatus({
        connected: Boolean(data.connected),
        configured: Boolean(data.configured),
      });
      setAppleMessage('');
    } catch (err) {
      setAppleMessage('could not check apple music status.');
    }
  };

  const handleConnectAppleMusic = async () => {
    setAppleBusy(true);
    setAppleMessage('opening apple music sign in...');

    try {
      const tokenResponse = await fetch('/api/apple-music/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: adminPassword }),
      });

      const tokenData = await tokenResponse.json();

      if (!tokenResponse.ok || !tokenData.developerToken) {
        setAppleMessage(tokenData.error || 'could not get a developer token.');
        return;
      }

      const MusicKit = await loadMusicKit();
      await MusicKit.configure({
        developerToken: tokenData.developerToken,
        app: { name: 'barna marczali', build: '1' },
      });

      const musicUserToken = await MusicKit.getInstance().authorize();

      if (!musicUserToken) {
        setAppleMessage('apple music sign in was cancelled.');
        return;
      }

      const connectResponse = await fetch('/api/apple-music/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: adminPassword, musicUserToken }),
      });

      const connectData = await connectResponse.json();

      if (!connectResponse.ok || !connectData.success) {
        setAppleMessage(connectData.error || 'could not save the apple music token.');
        return;
      }

      setAppleStatus({ configured: true, connected: true });
      setAppleMessage('connected.');
    } catch (err) {
      setAppleMessage('apple music connection failed. try again.');
    } finally {
      setAppleBusy(false);
    }
  };

  const handleDisconnectAppleMusic = async () => {
    setAppleBusy(true);
    setAppleMessage('');

    try {
      const response = await fetch('/api/apple-music/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: adminPassword, disconnect: true }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setAppleMessage(data.error || 'could not disconnect.');
        return;
      }

      setAppleStatus({ configured: true, connected: false });
      setAppleMessage('disconnected.');
    } catch (err) {
      setAppleMessage('could not disconnect. try again.');
    } finally {
      setAppleBusy(false);
    }
  };

  const fetchRecommendations = async () => {
    setLoading(true);
    setError(null);

    try {
      const [songs, writing, books, currentSongData] = await Promise.all([
        fetch('/api/recommendations?type=song').then(r => r.json()),
        fetch('/api/recommendations?type=writing').then(r => r.json()),
        fetch('/api/recommendations?type=book').then(r => r.json()),
        fetch('/api/current-song').then(r => r.json()),
      ]);

      setSongRecs(songs.recommendations || []);
      setWritingRecs(writing.recommendations || []);
      setBookRecs(books.recommendations || []);
      setCurrentSong(currentSongData.currentSong || { title: '', url: '' });
    } catch (err) {
      setError('Failed to load recommendations. Make sure Vercel KV is set up.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleUpdateCurrentSong = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditingSong(true);
    setSongUpdateSuccess(false);

    try {
      const response = await fetch('/api/current-song', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentSong),
      });

      const data = await response.json();

      if (data.success) {
        setSongUpdateSuccess(true);
        setTimeout(() => setSongUpdateSuccess(false), 3000);
      } else {
        alert('Failed to update current song');
      }
    } catch (err) {
      alert('Error updating current song');
    } finally {
      setEditingSong(false);
    }
  };

  const RecommendationSection = ({ 
    title, 
    recommendations 
  }: { 
    title: string; 
    recommendations: Recommendation[];
  }) => (
    <div className="mb-6 md:mb-8">
      <h2 className="text-xl md:text-2xl font-light text-brand-accent mb-3 md:mb-4">
        {title} ({recommendations.length})
      </h2>
      {recommendations.length === 0 ? (
        <p className="text-brand-text/60 text-base md:text-lg font-light">
          no {title.toLowerCase()} yet
        </p>
      ) : (
        <div className="space-y-2 md:space-y-3">
          {recommendations.map((rec, index) => (
            <div
              key={`${rec.timestamp}-${index}`}
              className="p-3 md:p-4 rounded-lg"
              style={{ backgroundColor: 'rgba(229, 143, 101, 0.08)' }}
            >
              <p className="text-base md:text-lg font-light text-brand-text mb-1 md:mb-2 break-words">
                {rec.content}
              </p>
              <p className="text-xs md:text-sm font-light text-brand-text/60">
                {formatDate(rec.date)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Login form
  if (!isAuthenticated) {
    return (
      <ClickSpark
        sparkColor="#E58F65"
        sparkSize={9}
        sparkRadius={18}
        sparkCount={7}
        duration={500}
      >
        <main className="min-h-screen p-4 md:p-8 flex items-center justify-center">
        <div className="max-w-md w-full">
          <h1 className="text-2xl md:text-3xl font-light text-brand-text mb-6 md:mb-8 text-center">
            admin login
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="enter admin password"
                  disabled={isAuthenticating}
                  className={`w-full bg-transparent text-base md:text-lg font-light outline-none pb-1 placeholder:transition-colors placeholder:duration-300 transition-colors duration-300 ${
                    isFocused
                      ? 'text-brand-accent placeholder:text-brand-accent/50'
                      : 'text-brand-text placeholder:text-brand-text/50'
                  }`}
                  style={{
                    caretColor: '#E58F65',
                  }}
                />
                <div className={`absolute bottom-0 left-0 right-0 h-[1px] transition-colors duration-300 ${
                  isFocused ? 'bg-brand-accent' : 'bg-brand-text'
                }`}></div>
              </div>
              <button
                type="submit"
                disabled={isAuthenticating || !password}
                className={`group flex-shrink-0 transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed ${
                  isFocused ? 'text-brand-accent' : 'text-brand-text hover:text-brand-accent'
                }`}
                aria-label="Submit"
              >
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>
            {authError && (
              <p className="text-red-400 text-xs md:text-sm font-light">{authError}</p>
            )}
            <a
              href="/"
              className="block text-center text-brand-text hover:text-brand-accent transition-colors text-sm md:text-base font-light mt-4"
            >
              back to site
            </a>
          </form>
        </div>
      </main>
      </ClickSpark>
    );
  }

  if (loading) {
    return (
      <ClickSpark
        sparkColor="#E58F65"
        sparkSize={9}
        sparkRadius={18}
        sparkCount={7}
        duration={500}
      >
        <main className="min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-light text-brand-text mb-6 md:mb-8">
            admin dashboard
          </h1>
          <p className="text-base md:text-lg font-light text-brand-text">loading...</p>
        </div>
      </main>
      </ClickSpark>
    );
  }

  if (error) {
    return (
      <ClickSpark
        sparkColor="#E58F65"
        sparkSize={9}
        sparkRadius={18}
        sparkCount={7}
        duration={500}
      >
        <main className="min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-light text-brand-text mb-6 md:mb-8">
            admin dashboard
          </h1>
          <p className="text-base md:text-lg font-light text-red-400 mb-4">{error}</p>
          <p className="text-sm md:text-base font-light text-brand-text/80">
            check the README.md file for setup instructions.
          </p>
          <button
            onClick={fetchRecommendations}
            className="group flex items-center gap-2 text-brand-text hover:text-brand-accent transition-colors duration-300 font-light text-base md:text-lg mt-4"
          >
            <span>try again</span>
            <svg
              className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>
      </main>
      </ClickSpark>
    );
  }

  return (
    <ClickSpark
      sparkColor="#E58F65"
      sparkSize={9}
      sparkRadius={18}
      sparkCount={7}
      duration={500}
    >
      <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8 gap-4">
          <h1 className="text-2xl md:text-3xl font-light text-brand-text">
            admin dashboard
          </h1>
          <div className="flex flex-wrap gap-3 md:gap-4">
            <button
              onClick={fetchRecommendations}
              className="px-3 py-1.5 md:px-4 md:py-2 text-brand-text hover:text-brand-accent transition-colors text-sm md:text-base font-light"
            >
              refresh
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 md:px-4 md:py-2 text-brand-text hover:text-brand-accent transition-colors text-sm md:text-base font-light"
            >
              logout
            </button>
            <a
              href="/"
              className="px-3 py-1.5 md:px-4 md:py-2 text-brand-text hover:text-brand-accent transition-colors text-sm md:text-base font-light"
            >
              back to site
            </a>
          </div>
        </div>

        {/* Current Song Editor */}
        <div className="mb-8 md:mb-12 p-4 md:p-6 rounded-lg" style={{ backgroundColor: 'rgba(229, 143, 101, 0.08)' }}>
          <h2 className="text-xl md:text-2xl font-light text-brand-accent mb-4 md:mb-6">
            currently listening to
          </h2>
          <form onSubmit={handleUpdateCurrentSong} className="space-y-4 md:space-y-6">
            <div className="relative">
              <input
                id="songTitle"
                type="text"
                value={currentSong.title}
                onChange={(e) => setCurrentSong({ ...currentSong, title: e.target.value })}
                onFocus={() => setTitleFocused(true)}
                onBlur={() => setTitleFocused(false)}
                placeholder="song title"
                required
                className={`w-full bg-transparent text-base md:text-lg font-light outline-none pb-1 placeholder:transition-colors placeholder:duration-300 transition-colors duration-300 ${
                  titleFocused
                    ? 'text-brand-accent placeholder:text-brand-accent/50'
                    : 'text-brand-text placeholder:text-brand-text/50'
                }`}
                style={{ caretColor: '#E58F65' }}
              />
              <div className={`absolute bottom-0 left-0 right-0 h-[1px] transition-colors duration-300 ${
                titleFocused ? 'bg-brand-accent' : 'bg-brand-text'
              }`}></div>
            </div>
            <div className="relative">
              <input
                id="songUrl"
                type="url"
                value={currentSong.url}
                onChange={(e) => setCurrentSong({ ...currentSong, url: e.target.value })}
                onFocus={() => setUrlFocused(true)}
                onBlur={() => setUrlFocused(false)}
                placeholder="song url (spotify, apple music, etc.)"
                required
                className={`w-full bg-transparent text-base md:text-lg font-light outline-none pb-1 placeholder:transition-colors placeholder:duration-300 transition-colors duration-300 ${
                  urlFocused
                    ? 'text-brand-accent placeholder:text-brand-accent/50'
                    : 'text-brand-text placeholder:text-brand-text/50'
                }`}
                style={{ caretColor: '#E58F65' }}
              />
              <div className={`absolute bottom-0 left-0 right-0 h-[1px] transition-colors duration-300 ${
                urlFocused ? 'bg-brand-accent' : 'bg-brand-text'
              }`}></div>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <button
                type="submit"
                disabled={editingSong}
                className="group flex items-center gap-2 text-brand-text hover:text-brand-accent transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed font-light text-base md:text-lg"
              >
                <span>{editingSong ? 'updating...' : 'update song'}</span>
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
              {songUpdateSuccess && (
                <span className="text-brand-accent font-light text-xs md:text-sm">
                  updated successfully!
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Apple Music Connection */}
        <div className="mb-8 md:mb-12 p-4 md:p-6 rounded-lg" style={{ backgroundColor: 'rgba(229, 143, 101, 0.08)' }}>
          <h2 className="text-xl md:text-2xl font-light text-brand-accent mb-4 md:mb-6">
            apple music
          </h2>

          {appleStatus === null ? (
            <p className="text-base md:text-lg font-light text-brand-text/80">
              checking apple music status...
            </p>
          ) : !appleStatus.configured ? (
            <p className="text-base md:text-lg font-light text-brand-text/80">
              apple music keys not configured on the server. see README for setup.
            </p>
          ) : appleStatus.connected ? (
            <div className="space-y-3 md:space-y-4">
              <p className="text-base md:text-lg font-light text-brand-text/80">
                apple music connected. the site now shows your recently played track
                (updates as songs finish). the manual field above still works as a
                fallback.
              </p>
              <button
                onClick={handleDisconnectAppleMusic}
                disabled={appleBusy}
                className="text-brand-text hover:text-brand-accent transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed font-light text-sm md:text-base"
              >
                {appleBusy ? 'disconnecting...' : 'disconnect'}
              </button>
            </div>
          ) : (
            <div className="space-y-3 md:space-y-4">
              <p className="text-base md:text-lg font-light text-brand-text/80">
                connect your apple music account and the site will show what you have
                been listening to. apple only exposes recently played tracks, so the
                song changes once each one finishes.
              </p>
              <button
                onClick={handleConnectAppleMusic}
                disabled={appleBusy || !adminPassword}
                className="group flex items-center gap-2 text-brand-text hover:text-brand-accent transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed font-light text-base md:text-lg"
              >
                <span>{appleBusy ? 'connecting...' : 'connect apple music'}</span>
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>
          )}

          {appleMessage && (
            <p className="text-brand-accent font-light text-xs md:text-sm mt-3 md:mt-4">
              {appleMessage}
            </p>
          )}
        </div>

        <RecommendationSection
          title="song recommendations"
          recommendations={songRecs}
        />
        
        <RecommendationSection 
          title="writing requests" 
          recommendations={writingRecs} 
        />
        
        <RecommendationSection 
          title="book recommendations" 
          recommendations={bookRecs} 
        />
      </div>
    </main>
    </ClickSpark>
  );
}

