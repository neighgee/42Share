import "server-only";

import { getEnv } from "@/lib/env";

type FortyTwoTokenResponse = {
  access_token: string;
  token_type: string;
};

type FortyTwoUserResponse = {
  id: number;
  login: string;
  displayname: string;
  image?: {
    link?: string | null;
    versions?: {
      small?: string | null;
      medium?: string | null;
    };
  };
};

export function getFortyTwoAuthorizationUrl(): string {
  const url = new URL("https://api.intra.42.fr/oauth/authorize");
  url.searchParams.set("client_id", getEnv("FORTYTWO_CLIENT_ID"));
  url.searchParams.set("redirect_uri", getEnv("FORTYTWO_REDIRECT_URI"));
  url.searchParams.set("response_type", "code");

  return url.toString();
}

export async function exchangeCodeForToken(code: string): Promise<string> {
  const response = await fetch("https://api.intra.42.fr/oauth/token", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "authorization_code",
      client_id: getEnv("FORTYTWO_CLIENT_ID"),
      client_secret: getEnv("FORTYTWO_CLIENT_SECRET"),
      code,
      redirect_uri: getEnv("FORTYTWO_REDIRECT_URI"),
    }),
  });

  if (!response.ok) {
    throw new Error("42 OAuth token exchange failed.");
  }

  const data = (await response.json()) as FortyTwoTokenResponse;
  return data.access_token;
}

export async function getFortyTwoUser(accessToken: string) {
  const response = await fetch("https://api.intra.42.fr/v2/me", {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("42 profile request failed.");
  }

  const user = (await response.json()) as FortyTwoUserResponse;

  return {
    id: user.id,
    login: user.login,
    displayName: user.displayname,
    avatarUrl: user.image?.versions?.small ?? user.image?.link ?? null,
  };
}
