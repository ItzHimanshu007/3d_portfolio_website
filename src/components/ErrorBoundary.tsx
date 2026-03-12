import React, { Component, type ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
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

    render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '200px',
                    padding: '2rem',
                    color: '#888',
                    fontFamily: 'Outfit, sans-serif',
                    textAlign: 'center',
                }}>
                    <div style={{
                        fontSize: '2rem',
                        marginBottom: '0.5rem',
                        color: '#ff3333',
                        fontWeight: 700,
                    }}>
                        ⚠ RENDER_ERROR
                    </div>
                    <p style={{ fontSize: '0.9rem', maxWidth: '400px' }}>
                        This section encountered an error. Please try refreshing the page.
                    </p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
