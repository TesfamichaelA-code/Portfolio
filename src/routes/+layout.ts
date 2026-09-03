// The whole site is static content — no server data, no forms, no sessions.
// Prerendering it moves every route onto the CDN as plain HTML instead of
// invoking a Node serverless function per request.
export const prerender = true;
