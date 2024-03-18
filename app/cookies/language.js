import { createCookie } from "@remix-run/node";


export const languageCookie = createCookie("language", {
  sameSite: "lax",
  path: "/",
  httpOnly: true,
  secrets: "s3crit",
  secure: process.env.NODE_ENV === "production",
})