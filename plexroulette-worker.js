/**
 * Plex Roulette — Cloudflare Worker proxy
 *
 * Forwards requests to a Plex server, adding CORS headers so the app
 * can be served from any domain (e.g. GitHub Pages).
 *
 * Deploy with:
 *   npx wrangler deploy worker.js --name plex-roulette-proxy --compatibility-date 2024-01-01
 *
 * Or paste into the Cloudflare Workers dashboard (workers.cloudflare.com).
 *
 * Usage from the app:
 *   Instead of fetching https://your-plex-server:32400/library/sections
 *   the app fetches https://your-worker.workers.dev/proxy?url=https://your-plex-server:32400/library/sections
 *   The token is passed as a normal query parameter and forwarded as-is.
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Accept, Content-Type',
};

export default {
  async fetch(request) {
    // Handle preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const url = new URL(request.url);

    // Only allow /proxy route
    if (url.pathname !== '/proxy') {
      return new Response('Not found', { status: 404 });
    }

    const target = url.searchParams.get('url');
    if (!target) {
      return new Response('Missing ?url= parameter', { status: 400 });
    }

    // Only allow proxying to Plex-related hosts
    let targetUrl;
    try {
      targetUrl = new URL(target);
    } catch {
      return new Response('Invalid target URL', { status: 400 });
    }

    const allowed =
      targetUrl.hostname.endsWith('.plex.direct') ||
      targetUrl.hostname.endsWith('.plex.tv') ||
      targetUrl.port === '32400';

    if (!allowed) {
      return new Response('Target host not allowed', { status: 403 });
    }

    // Forward the request
    const proxyRes = await fetch(target, {
      headers: { Accept: request.headers.get('Accept') || 'application/json' },
    });

    const body = await proxyRes.arrayBuffer();

    return new Response(body, {
      status: proxyRes.status,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': proxyRes.headers.get('Content-Type') || 'application/json',
      },
    });
  },
};
