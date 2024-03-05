import { Link } from "@remix-run/react";

import contactUsStyles from "~/styles/pages/contact-us.css";

import LinkedIn from "~/Icons/social/LinkedIn";
import Facebook from "~/Icons/social/Facebook";
import Instagram from "~/Icons/social/Instagram";

import ClientOnly from "~/components/ClientOnly";
import { Map } from "~/components/map/Map.client";

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
    href: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
  },
];

/**
 * @returns {import("@remix-run/node").MetaDescriptor[]}
 */
export const meta = () => {
  return [{ title: "Goran Group | Company details page" }];
};

const ContactUs = () => {
  const mapHeight = "550px";
  

  return (
    <article className="contact-us">
      <section className="contact-us__header side-padding">
        <h1>Contact Us</h1>

        <div className="contact-us__header-content-container">
          <ul className="contact-us__header-content" dir="ltr">
            <span>Phone</span>
            <li className="contact-us__header-content-item">
              +964 (750) 200 3000
            </li>
            <li className="contact-us__header-content-item">
              +964 (750) 200 4000
            </li>
          </ul>
          <ul className="contact-us__header-content">
            <span>Address</span>
            <li className="contact-us__header-content-item">
              Iraq - Kurdistan - Erbil: Italian Village{" "}
            </li>
            <li className="contact-us__header-content-item">
              Iraq - Kurdistan - Slemani
            </li>
          </ul>
          <ul className="contact-us__header-content">
            <span>Email</span>
            <li className="contact-us__header-content-item">
              gorangroup@emial.com
            </li>
          </ul>
          <div className="contact-us__header-socials">
            <span>Social Media</span>
            <ul className="contact-us__header-social-lists">
              <Link className="contact-us__header-social-item">
                <Facebook width={28} height={28} />
              </Link>
              <Link className="contact-us__header-social-item">
                <Instagram width={23} height={23} />
              </Link>
              <Link className="contact-us__header-social-item">
                <LinkedIn width={32} height={32} />
              </Link>
            </ul>
          </div>
        </div>
      </section>

      <section className="contact-us__map side-padding">
        <ClientOnly
          fallback={
            <div
              id="skeleton"
              style={{ height: mapHeight, background: "#d1d1d1" }}
            />
          }
        >
          {() => <Map height={mapHeight} />}
        </ClientOnly>
      </section>
    </article>
  );
};

export default ContactUs;
