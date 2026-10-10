import React, { Component, type ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    // When this value changes (e.g. the route), a previous error is cleared.
    resetKey?: string;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught:', error, errorInfo);
    }

    componentDidUpdate(prevProps: Props) {
        if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
            this.setState({ hasError: false, error: undefined });
        }
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div role="alert" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                    minHeight: '60vh',
                    padding: '120px 2rem 2rem',
                    color: '#b3b3b3',
                    fontFamily: 'Outfit, sans-serif',
                    textAlign: 'center',
                }}>
                    <h1 style={{ fontSize: '2rem', color: '#fff', fontWeight: 700 }}>
                        Something went wrong
                    </h1>
                    <p style={{ fontSize: '1rem', maxWidth: '420px', lineHeight: 1.6 }}>
                        This page hit an unexpected error. Reloading usually fixes it.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            padding: '12px 28px',
                            borderRadius: '50px',
                            background: '#e01e1e',
                            color: '#fff',
                            fontWeight: 600,
                        }}
                    >
                        Reload page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
