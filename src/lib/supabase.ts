import "server-only";

/** Cliente mínimo de la API REST de Supabase. La clave secreta solo existe en el servidor. */
const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseConfigured = Boolean(url && key);

export function supabaseFetch(path: string, init: RequestInit & { headers?: Record<string, string> } = {}) {
  return fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      // Las claves nuevas (sb_secret_…) van solo en `apikey`; las antiguas (JWT service_role) también en Authorization.
      apikey: key!,
      ...(key!.startsWith("sb_") ? {} : { Authorization: `Bearer ${key}` }),
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
}
