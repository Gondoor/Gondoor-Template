'use client';

interface RouteErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RouteError({ error, reset }: RouteErrorProps) {
  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={headingStyle}>Gondor MVP — Runtime Error</h1>
        <p style={labelStyle}>
          <strong>Source:</strong> Route error boundary (app/error.tsx)
        </p>
        <p style={labelStyle}>
          <strong>Message:</strong> {error.message || '(no message)'}
        </p>
        {error.digest && (
          <p style={labelStyle}>
            <strong>Digest:</strong> <code>{error.digest}</code>
          </p>
        )}
        <pre style={preStyle}>{error.stack ?? '(no stack trace)'}</pre>
        <button type="button" onClick={() => reset()} style={buttonStyle}>
          Try again
        </button>
        <p style={footerStyle}>
          This is a Gondor diagnostic error boundary. If you&apos;re seeing this on a deployed
          site, the error message above explains what went wrong inside the worker.
        </p>
      </div>
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  fontFamily: 'ui-monospace, "SF Mono", Menlo, Monaco, "Cascadia Mono", "Roboto Mono", monospace',
  padding: '24px',
  minHeight: '100vh',
  background: '#0f0f0f',
  color: '#fafafa',
};

const cardStyle: React.CSSProperties = {
  maxWidth: '900px',
  margin: '40px auto',
  background: '#1a1a1a',
  borderRadius: '12px',
  padding: '32px',
  border: '1px solid #2a2a2a',
};

const headingStyle: React.CSSProperties = {
  color: '#ff6b6b',
  fontSize: '20px',
  marginBottom: '20px',
  marginTop: 0,
};

const labelStyle: React.CSSProperties = {
  marginBottom: '12px',
  lineHeight: '1.5',
  fontSize: '14px',
};

const preStyle: React.CSSProperties = {
  background: '#0f0f0f',
  padding: '16px',
  borderRadius: '8px',
  overflow: 'auto',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  fontSize: '12px',
  lineHeight: '1.6',
  marginTop: '16px',
  marginBottom: '20px',
  border: '1px solid #2a2a2a',
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 18px',
  background: '#fafafa',
  color: '#0f0f0f',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontFamily: 'inherit',
  fontSize: '13px',
  fontWeight: 600,
};

const footerStyle: React.CSSProperties = {
  marginTop: '24px',
  fontSize: '11px',
  color: '#888',
  lineHeight: '1.5',
};
