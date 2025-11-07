'use client';

import { useState, useEffect } from 'react';

interface Recommendation {
  type: string;
  content: string;
  timestamp: number;
  date: string;
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

  useEffect(() => {
    // Check if already authenticated in session storage
    const authenticated = sessionStorage.getItem('admin_authenticated');
    if (authenticated === 'true') {
      setIsAuthenticated(true);
      fetchRecommendations();
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
        setIsAuthenticated(true);
        setPassword('');
        fetchRecommendations();
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
    setIsAuthenticated(false);
    setSongRecs([]);
    setWritingRecs([]);
    setBookRecs([]);
  };

  const fetchRecommendations = async () => {
    setLoading(true);
    setError(null);

    try {
      const [songs, writing, books] = await Promise.all([
        fetch('/api/recommendations?type=song').then(r => r.json()),
        fetch('/api/recommendations?type=writing').then(r => r.json()),
        fetch('/api/recommendations?type=book').then(r => r.json()),
      ]);

      setSongRecs(songs.recommendations || []);
      setWritingRecs(writing.recommendations || []);
      setBookRecs(books.recommendations || []);
    } catch (err) {
      setError('Failed to load recommendations. Make sure Vercel KV is set up.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const RecommendationSection = ({ 
    title, 
    recommendations 
  }: { 
    title: string; 
    recommendations: Recommendation[];
  }) => (
    <div className="mb-8">
      <h2 className="text-2xl font-light text-brand-accent mb-4">
        {title} ({recommendations.length})
      </h2>
      {recommendations.length === 0 ? (
        <p className="text-brand-text/60 text-lg font-light">
          no {title.toLowerCase()} yet
        </p>
      ) : (
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <div
              key={`${rec.timestamp}-${index}`}
              className="p-4 rounded-lg"
              style={{ backgroundColor: 'rgba(229, 143, 101, 0.08)' }}
            >
              <p className="text-lg font-light text-brand-text mb-2">
                {rec.content}
              </p>
              <p className="text-sm font-light text-brand-text/60">
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
      <main className="min-h-screen p-8 flex items-center justify-center">
        <div className="max-w-md w-full">
          <h1 className="text-3xl font-light text-brand-text mb-8 text-center">
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
                  className={`w-full bg-transparent text-lg font-light outline-none pb-1 placeholder:transition-colors placeholder:duration-300 transition-colors duration-300 ${
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
                  className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1"
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
              <p className="text-red-400 text-sm font-light">{authError}</p>
            )}
            <a
              href="/"
              className="block text-center text-brand-text hover:text-brand-accent transition-colors text-base font-light mt-4"
            >
              back to site
            </a>
          </form>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-light text-brand-text mb-8">
            recommendations admin
          </h1>
          <p className="text-lg font-light text-brand-text">loading...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-light text-brand-text mb-8">
            recommendations admin
          </h1>
          <p className="text-lg font-light text-red-400 mb-4">{error}</p>
          <p className="text-base font-light text-brand-text/80">
            check the DATABASE_SETUP.md file for setup instructions.
          </p>
          <button
            onClick={fetchRecommendations}
            className="mt-4 px-4 py-2 bg-brand-accent text-brand-bg rounded-md hover:opacity-80 transition-opacity"
          >
            try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-light text-brand-text">
            recommendations admin
          </h1>
          <div className="flex gap-4">
            <button
              onClick={fetchRecommendations}
              className="px-4 py-2 text-brand-text hover:text-brand-accent transition-colors text-base font-light"
            >
              refresh
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-brand-text hover:text-brand-accent transition-colors text-base font-light"
            >
              logout
            </button>
            <a
              href="/"
              className="px-4 py-2 text-brand-text hover:text-brand-accent transition-colors text-base font-light"
            >
              back to site
            </a>
          </div>
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
  );
}

