import { json } from "@remix-run/react";
import { languageCookie } from "~/cookies/language";

/**
 * @type { import("@remix-run/node").ActionFunction }
 */
export const action = async ({ request }) => {
  const url = new URL(request.url);
  const locale = url.searchParams.get("lng"); 

  const headers = new Headers();
  headers.append("Set-Cookie", await languageCookie.serialize(locale))

  return json({ locale }, { headers });
};
