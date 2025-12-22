'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div 
          className="min-h-screen flex items-center justify-center p-6"
          style={{ backgroundColor: 'var(--color-base-bg)' }}
        >
          <div 
            className="max-w-md w-full p-8 text-center"
            style={{
              backgroundColor: 'var(--color-base-surface)',
              border: '1px solid var(--color-base-border)',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <h2 
              className="text-2xl font-bold mb-4"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Oops! Something went wrong
            </h2>
            <p 
              className="mb-6"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              We encountered an unexpected error. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="px-6 py-3 font-medium transition-opacity hover:opacity-70"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'white',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              Go to Homepage
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary 
                  className="cursor-pointer text-sm"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  Error Details (Development Only)
                </summary>
                <pre 
                  className="mt-2 p-4 text-xs overflow-auto"
                  style={{
                    backgroundColor: 'var(--color-base-bg)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--color-text-primary)'
                  }}
                >
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
