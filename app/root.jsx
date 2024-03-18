import { useChangeLanguage } from "remix-i18next/react";
import { ParallaxProvider } from "react-scroll-parallax";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  json,
  useLoaderData,
  useRouteError,
  useSearchParams,
} from "@remix-run/react";

import rootStyles from "~/styles/root.css";
import salStyles from "../node_modules/sal.js/dist/sal.css";

import Reel from "~/components/Reel";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";

import { buildUrl } from "~/api/config";
import { isUrlValid } from "~/utils/general";
import i18next from "~/lib/i18next.server";
import { languageCookie } from "./cookies/language";

/**
 * @returns {import("@remix-run/node").LinkDescriptor[]}
 */
export const links = () => [
  {
    rel: "stylesheet",
    href: rootStyles,
  },
  {
    rel: "stylesheet",
    href: salStyles,
  },
  {
    rel: "stylesheet",
    type: "text/css",
    href: "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css",
  },
  {
    rel: "stylesheet",
    type: "text/css",
    href: "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css",
  },
  {
    rel: "stylesheet",
    type: "text/css",
    href: "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css",
  },
];

/**
 * @type {import("react-router").LoaderFunction}
 */
export const loader = async ({ request }) => {
  let locale = await i18next.getLocale(request);

  const cookieString = request.headers.get("Cookie");
  const selectedLanguage = await languageCookie.parse(cookieString);
  if (selectedLanguage) locale = selectedLanguage;

  const url = buildUrl(request, "/data/general.json");

  const res = await fetch(url);
  const body = await res.json();

  body.locale = locale;

  return json(body);
};

export let handle = {
  // In the handle export, we can add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  // TIP: In most cases, you should set this to your defaultNS from your i18n config
  // or if you did not set one, set it to the i18next default namespace "translation"
  i18n: "common",
};

export default function App() {
  const { locale } = useLoaderData();

  const [searchParams, setSearchParams] = useSearchParams();

  // This hook will change the i18n instance language to the current locale
  // detected by the loader, this way, when we do something to change the
  // language, this locale will change and i18next will load the correct
  // translation files
  useChangeLanguage(locale);

  return (
    <html lang={locale} dir={locale === "en" ? "ltr" : "rtl"}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
        <script></script>
      </head>
      <body>
        <Navbar />
        <ParallaxProvider>
          <main className="main-wrapper">
            <Outlet />

            {searchParams.get("reel-state") === "active" &&
              isUrlValid(searchParams.get("reel-url")) && (
                <Reel
                  state={searchParams.get("reel-state")}
                  reelUrl={searchParams.get("reel-url")}
                  onCloseClicked={() => {
                    const updatedSearchParams = new URLSearchParams(
                      searchParams
                    );
                    updatedSearchParams.delete("reel-state");
                    updatedSearchParams.delete("reel-url");

                    setSearchParams(updatedSearchParams);
                  }}
                />
              )}
          </main>
        </ParallaxProvider>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <html lang="en">
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <h1>
          {isRouteErrorResponse(error)
            ? `${error.status} ${error.statusText}`
            : error instanceof Error
            ? error.message
            : "Unknown Error"}
        </h1>
        <Scripts />
      </body>
    </html>
  );
}
