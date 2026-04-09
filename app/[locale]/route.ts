import { getSiteConfig } from "@/lib/site-config";

export async function GET(): Promise<Response> {
  const config = await getSiteConfig();

  if (config?.generatedHtml) {
    return new Response(config.generatedHtml, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  return new Response(
    `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Setting up your site...</title></head>
     <body style="font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0">
       <p>Your site is being set up. Check back in a moment.</p>
     </body></html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}
