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
          No {title.toLowerCase()} yet
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
            Admin Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                disabled={isAuthenticating}
                className="w-full bg-transparent border-b border-brand-text text-lg font-light outline-none transition-colors duration-300 pb-2 placeholder:text-brand-text/50 focus:border-brand-accent focus:text-brand-accent"
                style={{
                  caretColor: '#E58F65',
                }}
              />
            </div>
            {authError && (
              <p className="text-red-400 text-sm font-light">{authError}</p>
            )}
            <button
              type="submit"
              disabled={isAuthenticating || !password}
              className="w-full px-6 py-3 bg-brand-accent text-brand-bg rounded-md hover:opacity-80 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed font-light"
            >
              {isAuthenticating ? 'Authenticating...' : 'Login'}
            </button>
            <a
              href="/"
              className="block text-center text-brand-text hover:text-brand-accent transition-colors text-base font-light mt-4"
            >
              Back to Site
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
            Recommendations Admin
          </h1>
          <p className="text-lg font-light text-brand-text">Loading...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-light text-brand-text mb-8">
            Recommendations Admin
          </h1>
          <p className="text-lg font-light text-red-400 mb-4">{error}</p>
          <p className="text-base font-light text-brand-text/80">
            Check the DATABASE_SETUP.md file for setup instructions.
          </p>
          <button
            onClick={fetchRecommendations}
            className="mt-4 px-4 py-2 bg-brand-accent text-brand-bg rounded-md hover:opacity-80 transition-opacity"
          >
            Try Again
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
            Recommendations Admin
          </h1>
          <div className="flex gap-4">
            <button
              onClick={fetchRecommendations}
              className="px-4 py-2 text-brand-text hover:text-brand-accent transition-colors text-base font-light"
            >
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-brand-text hover:text-brand-accent transition-colors text-base font-light"
            >
              Logout
            </button>
            <a
              href="/"
              className="px-4 py-2 text-brand-text hover:text-brand-accent transition-colors text-base font-light"
            >
              Back to Site
            </a>
          </div>
        </div>

        <RecommendationSection 
          title="Song Recommendations" 
          recommendations={songRecs} 
        />
        
        <RecommendationSection 
          title="Writing Requests" 
          recommendations={writingRecs} 
        />
        
        <RecommendationSection 
          title="Book Recommendations" 
          recommendations={bookRecs} 
        />
      </div>
    </main>
  );
}

