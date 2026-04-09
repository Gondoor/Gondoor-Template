'use client';

// Required for Cloudflare Pages compatibility — see CLAUDE.md "Cloudflare Pages: Edge Runtime Required"
export const runtime = 'edge';

interface GlobalErrorProps {
  error: Error & { digest?: string };
}

export default function GlobalError({ error }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily:
            'ui-monospace, "SF Mono", Menlo, Monaco, "Cascadia Mono", "Roboto Mono", monospace',
          padding: '24px',
          minHeight: '100vh',
          background: '#0f0f0f',
          color: '#fafafa',
          margin: 0,
        }}
      >
        <div
          style={{
            maxWidth: '900px',
            margin: '40px auto',
            background: '#1a1a1a',
            borderRadius: '12px',
            padding: '32px',
            border: '1px solid #2a2a2a',
          }}
        >
          <h1 style={{ color: '#ff6b6b', fontSize: '20px', marginBottom: '20px', marginTop: 0 }}>
            Gondor MVP — Global Runtime Error
          </h1>
          <p style={{ marginBottom: '12px', lineHeight: 1.5, fontSize: '14px' }}>
            <strong>Source:</strong> Root layout / global error boundary (app/global-error.tsx)
          </p>
          <p style={{ marginBottom: '12px', lineHeight: 1.5, fontSize: '14px' }}>
            <strong>Message:</strong> {error.message || '(no message)'}
          </p>
          {error.digest && (
            <p style={{ marginBottom: '12px', lineHeight: 1.5, fontSize: '14px' }}>
              <strong>Digest:</strong> <code>{error.digest}</code>
            </p>
          )}
          <pre
            style={{
              background: '#0f0f0f',
              padding: '16px',
              borderRadius: '8px',
              overflow: 'auto',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              fontSize: '12px',
              lineHeight: 1.6,
              marginTop: '16px',
              marginBottom: '20px',
              border: '1px solid #2a2a2a',
            }}
          >
            {error.stack ?? '(no stack trace)'}
          </pre>
          <p style={{ marginTop: '24px', fontSize: '11px', color: '#888', lineHeight: 1.5 }}>
            This error was caught at the root layout level — likely a crash during module
            initialization or in app/layout.tsx itself. Common causes: missing environment
            variables (BETTER_AUTH_SECRET, DATABASE_URL), eager database calls at module load,
            edge-runtime-incompatible imports.
          </p>
        </div>
      </body>
    </html>
  );
}
