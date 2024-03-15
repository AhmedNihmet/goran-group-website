import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
  useSearchParams,
} from "@remix-run/react";
import { ParallaxProvider } from "react-scroll-parallax";

import rootStyles from "~/styles/root.css";
import salStyles from "../node_modules/sal.js/dist/sal.css";

import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer"; 
import { isUrlValid } from "./utils/general";
import Reel from "./components/Reel";

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

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams(); 

  return (
    <html lang="en">
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
                const updatedSearchParams = new URLSearchParams(searchParams);
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
