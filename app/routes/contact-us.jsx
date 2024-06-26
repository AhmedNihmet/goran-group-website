import sal from "sal.js";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Link,
  json,
  useLoaderData,
  useRouteLoaderData,
} from "@remix-run/react";

import contactUsStyles from "~/styles/pages/contact-us.css";
import mediaQueryStyles from "~/styles/media-queries.css";

import LinkedIn from "~/Icons/social/LinkedIn";
import Facebook from "~/Icons/social/Facebook";
import Instagram from "~/Icons/social/Instagram";

import ClientOnly from "~/components/ClientOnly";
import { Map } from "~/components/map/Map.client";

import { buildUrl } from "~/api/config";

/**
 * @returns {import("@remix-run/node").LinkDescriptor[]}
 */
export const links = () => [
  {
    rel: "stylesheet",
    href: contactUsStyles,
  },
  {
    rel: "stylesheet",
    href: mediaQueryStyles,
  },
  {
    rel: "stylesheet",
    href: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
  },
];

/**
 * @returns {import("@remix-run/node").MetaDescriptor[]}
 */
export const meta = () => {
  return [{ title: "Goran Group | Company details page" }];
};

/**
 * @type {import("react-router").LoaderFunction}
 */
export const loader = async ({ request }) => {
  const url = buildUrl(request, "/data/contact-us.json");

  const res = await fetch(url);

  const body = await res.json();

  return json(body);
};

const mapHeight = "550px";
const ContactUs = () => {
  const { i18n } = useTranslation();
  const loaderData = useLoaderData();
  const { social_links } = useRouteLoaderData("root");

  useEffect(() => {
    sal({
      threshold: 0.5,
    });
  }, []);

  return (
    <article className="contact-us">
      <section className="contact-us__header side-padding">
        <h1 data-sal="fade" data-sal-delay="200">
          {loaderData.title[i18n.language]}
        </h1>

        <div className="contact-us__header-content-container">
          <ul
            data-sal="fade"
            data-sal-delay="300"
            className="contact-us__header-content"
          >
            <span>{loaderData.phone.title[i18n.language]}</span>
            {loaderData.phone.entities.map((item, index) => (
              <li
                dir="ltr"
                key={index}
                className="contact-us__header-content-item phone"
              >
                {item}
              </li>
            ))}
          </ul>
          <ul
            className="contact-us__header-content"
            data-sal="fade"
            data-sal-delay="400"
          >
            <span>{loaderData.address.title[i18n.language]}</span>
            {loaderData.address.entities.map((item, index) => (
              <li key={index} className="contact-us__header-content-item">
                {item[i18n.language]}
              </li>
            ))}
          </ul>
          <ul
            className="contact-us__header-content"
            data-sal="fade"
            data-sal-delay="500"
          >
            <span>{loaderData.email.title[i18n.language]}</span>
            {loaderData.email.entities.map((item, index) => (
              <li
                key={index}
                className="contact-us__header-content-item email"
                dir="ltr"
              >
                {item}
              </li>
            ))}
          </ul>
          <div
            className="contact-us__header-socials"
            data-sal="fade"
            data-sal-delay="600"
          >
            <span>{loaderData.social.title[i18n.language]}</span>
            <ul className="contact-us__header-social-lists">
              <Link
                target="_blank"
                rel="noreferrer"
                to={social_links.facebook}
                className="contact-us__header-social-item"
              >
                <Facebook width={28} height={28} />
              </Link>
              <Link
                target="_blank"
                rel="noreferrer"
                to={social_links.instagram}
                className="contact-us__header-social-item"
              >
                <Instagram width={23} height={23} />
              </Link>
              <Link
                target="_blank"
                rel="noreferrer"
                to={social_links.linked_in}
                className="contact-us__header-social-item"
              >
                <LinkedIn width={32} height={32} />
              </Link>
            </ul>
          </div>
        </div>
      </section>

      <section
        data-sal="fade"
        data-sal-delay="600"
        className="contact-us__map side-padding"
      >
        <ClientOnly
          fallback={
            <div
              id="skeleton"
              style={{ height: mapHeight, background: "#d1d1d1" }}
            />
          }
        >
          {() => (
            <Map
              isMultiple
              height={mapHeight}
              position={loaderData.coordinates}
              multiplePins={loaderData.company_coordinates}
            />
          )}
        </ClientOnly>
      </section>
    </article>
  );
};

export default ContactUs;
