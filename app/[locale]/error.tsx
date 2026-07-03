'use client';
export default function ErrorBoundary({ error }: { error: Error & { digest?: string } }) {
  return (
    <div style={{ fontFamily: 'system-ui', padding: 40, color: '#333' }}>
      <h2>Page Error</h2>
      <pre style={{ whiteSpace: 'pre-wrap', background: '#f5f5f5', padding: 16, borderRadius: 8 }}>
        {error.message}
      </pre>
      <p style={{ fontSize: 12, color: '#999' }}>digest: {error.digest ?? 'n/a'}</p>
    </div>
  );
}
