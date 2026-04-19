'use client';

import { Component } from 'react';
import { useLocale } from '../lib/i18n';

class ErrorBoundaryInner extends Component {
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
      const { message, retry } = this.props;
      return (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--gray)' }}>
          <p>{message} <button onClick={() => this.setState({ hasError: false })} style={{ textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--acc)' }}>{retry}</button></p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function ErrorBoundary({ children }) {
  const { T } = useLocale();
  return (
    <ErrorBoundaryInner message={T.errorBoundary.message} retry={T.errorBoundary.retry}>
      {children}
    </ErrorBoundaryInner>
  );
}
