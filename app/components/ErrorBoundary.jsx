'use client';

import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--gray)' }}>
          <p>Something went wrong. <button onClick={() => this.setState({ hasError: false })} style={{ textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--acc)' }}>Try again</button></p>
        </div>
      );
    }
    return this.props.children;
  }
}
