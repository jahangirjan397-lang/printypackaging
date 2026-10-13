import { NextResponse, type NextRequest } from "next/server";

// Step 2 of the admin (/admin) GitHub login: swap GitHub's code for a token
// and hand it to the Decap CMS window that opened this popup.
function popupResponse(status: "success" | "error", content: object) {
  const message = `authorization:github:${status}:${JSON.stringify(content)}`;

  // The token is only posted to the window that opened the popup, and only
  // after that window (the admin page on this same site) says hello.
  const html = `<!doctype html>
<html><body><p>Logging in…</p><script>
(function () {
  var message = ${JSON.stringify(message).replace(/</g, "\\u003c")};
  function receive(event) {
    if (event.origin !== window.location.origin) return;
    window.opener.postMessage(message, event.origin);
    window.removeEventListener("message", receive);
    setTimeout(function () { window.close(); }, 300);
  }
  window.addEventListener("message", receive);
  window.opener && window.opener.postMessage("authorizing:github", window.location.origin);
})();
</script></body></html>`;

  const response = new NextResponse(html, {
    status: status === "success" ? 200 : 400,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
  response.cookies.delete({ name: "decap_oauth_state", path: "/api/decap" });
  return response;
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const savedState = request.cookies.get("decap_oauth_state")?.value;

  if (!code || !state || !savedState || state !== savedState) {
    return popupResponse("error", {
      message: "Login expired or was not started from the admin page. Please try again.",
    });
  }

  const clientId = process.env.DECAP_GITHUB_CLIENT_ID;
  const clientSecret = process.env.DECAP_GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return popupResponse("error", {
      message: "Admin login is not set up: GitHub OAuth keys are missing on the server.",
    });
  }

  try {
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
        }),
      },
    );
    const data = (await tokenResponse.json()) as {
      access_token?: string;
      error_description?: string;
    };

    if (!data.access_token) {
      return popupResponse("error", {
        message: data.error_description || "GitHub did not return a login token.",
      });
    }

    return popupResponse("success", {
      token: data.access_token,
      provider: "github",
    });
  } catch {
    return popupResponse("error", {
      message: "Could not reach GitHub. Please try again.",
    });
  }
}
