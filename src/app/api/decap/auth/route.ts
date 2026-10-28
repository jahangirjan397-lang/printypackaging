import { randomBytes } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";

// Step 1 of the admin (/admin) GitHub login: send the editor to GitHub.
// Needs a GitHub OAuth App; see content/help "Admin login setup".
export async function GET(request: NextRequest) {
  const clientId = process.env.DECAP_GITHUB_CLIENT_ID;

  if (!clientId) {
    return new NextResponse(
      "Admin login is not set up yet: DECAP_GITHUB_CLIENT_ID is missing in the Vercel environment variables.",
      { status: 500 },
    );
  }

  const state = randomBytes(16).toString("hex");
  const callbackUrl = new URL("/api/decap/callback", request.nextUrl.origin);

  const githubUrl = new URL("https://github.com/login/oauth/authorize");
  githubUrl.searchParams.set("client_id", clientId);
  githubUrl.searchParams.set("redirect_uri", callbackUrl.toString());
  githubUrl.searchParams.set("scope", "repo,user");
  githubUrl.searchParams.set("state", state);

  const response = NextResponse.redirect(githubUrl);
  response.cookies.set("decap_oauth_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/api/decap",
    maxAge: 600,
  });

  return response;
}
