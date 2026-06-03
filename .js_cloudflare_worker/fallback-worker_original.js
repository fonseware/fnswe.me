export default {
  async fetch(request, env, ctx) {
    // 1. SMART CHECK: "Try" the site first.
    // We pass the request to the origin (Tunnel) exactly as is.
    // If the site is up, this returns 200 OK immediately.
    const response = await fetch(request);

    // 2. ERROR DETECTION: Check if the Tunnel is down (Status 530)
    if (response.status === 530) {

      // 3. BROWSER CHECK: Ensure this is a human in a browser.
      // We check the "Accept" header for "text/html".
      // This prevents interfering with API calls, webhooks, or CLI tools.
      const acceptHeader = request.headers.get("Accept");
      const isBrowser = acceptHeader && acceptHeader.includes("text/html");

      if (isBrowser) {
        const url = new URL(request.url);
        const STATUS_PAGE = 'https://status.fonseware.com';
        const GITHUB_FALLBACK = 'https://fonseware.github.io/fallback/offline';

        // SCENARIO: The Status Page itself is down.
        // Redirect to the external GitHub page.
        if (url.hostname === 'status.fonseware.com') {
           return Response.redirect(GITHUB_FALLBACK, 302);
        }

        // SCENARIO: Any other site (www, forum, etc.) is down.
        // Redirect to Status Page.
        return Response.redirect(STATUS_PAGE, 302);
      }
    }

    // 4. DEFAULT: Return the response.
    // This happens if:
    // - The site is UP (Status 200).
    // - The site is DOWN, but the user is an API/CLI (not a browser).
    return response;
  }
};