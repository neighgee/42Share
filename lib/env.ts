type EnvKey =
  | "SUPABASE_URL"
  | "SUPABASE_SERVICE_ROLE_KEY"
  | "FORTYTWO_CLIENT_ID"
  | "FORTYTWO_CLIENT_SECRET"
  | "FORTYTWO_REDIRECT_URI"
  | "SESSION_SECRET"
  | "NEXT_PUBLIC_APP_URL";

export function getEnv(key: EnvKey): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
}

export function getOptionalEnv(key: EnvKey): string | undefined {
  return process.env[key];
}
