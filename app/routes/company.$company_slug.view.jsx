import sal from "sal.js";
import classNames from "classnames";

import { Navigation } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useMemo, useState } from "react";
import {
  Link,
  Outlet,
  json,
  redirect,
  useLoaderData,
  useLocation,
  useSearchParams,
} from "@remix-run/react";
import { PhotoProvider, PhotoView } from "react-image-previewer";
import { SlideToolbar, CloseButton } from "react-image-previewer/ui";

import companyViewStyles from "~/styles/pages/company-view.css";
import contactUsStyles from "~/styles/pages/contact-us.css";
import mediaQueryStyles from "~/styles/media-queries.css";

import Play from "~/Icons/Play";
import Indicator from "~/Icons/Indicator";
import ExpandIcon from "~/Icons/ExpandIcon";
import Facebook from "~/Icons/social/Facebook";
import Instagram from "~/Icons/social/Instagram";
import LinkedIn from "~/Icons/social/LinkedIn";

import ClientOnly from "~/components/ClientOnly";
import { Map } from "~/components/map/Map.client";
import CustomButton from "~/components/CustomButton";

import { buildUrl } from "~/api/config";
import View from "~/Icons/View";
import ExternalLink from "~/Icons/ExternalLink";

/**
 * @returns {import("@remix-run/node").LinkDescriptor[]}
 */
export const links = () => [
  {
    rel: "stylesheet",
    href: companyViewStyles,
  },
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
export const loader = async ({ request, params }) => {
  const url = buildUrl(request, "/data/general.json");

  const res = await fetch(url);
  const { companies } = await res.json();

  const { company_slug } = params;
  const company = companies.filter((item) => item.slug === company_slug);

  if (company.length === 0) return redirect("/companies");

  const [selectedCompany] = company;

  return json({ data: selectedCompany });
};

const mapHeight = "550px";
const CompanyView = () => {
  const { data } = useLoaderData();
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const [isSliderControlActive, setIsSliderControlActive] = useState(null);

  useEffect(() => {
    if (isSliderControlActive !== null)
      setTimeout(() => {
        setIsSliderControlActive(null);
      }, 300);
  }, [isSliderControlActive]);

  useEffect(() => {
    sal({
      threshold: 0.5,
    });
  }, []);

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    const navbarElement = document.querySelector("nav");

    if (pathname.split("/").length > 4) {
      htmlElement.classList.add("disable-scroll");
      navbarElement.classList.add("disable-scroll");
    } else {
      htmlElement.classList.remove("disable-scroll");
      navbarElement.classList.remove("disable-scroll");
    }
  }, [pathname]);

  const prepareGalleryArrays = useMemo(() => {
    const arrayOfImageStrings = data?.gallery?.images;

    if (!arrayOfImageStrings) return [];

    const result = [];
    for (let i = 0; i < arrayOfImageStrings.length; i += 4) {
      result.push(arrayOfImageStrings.slice(i, i + 4));
    }
    return result;
  }, [data.gallery.images]);

  const playVideo = (url) => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set("reel-state", "active");

    if (url.includes("youtube")) {
      updatedSearchParams.set("reel-url", url);
    } else {
      updatedSearchParams.set(
        "reel-url",
        `${window?.location?.origin || ""}${url}`
      );
    }

    return setSearchParams(updatedSearchParams);
  };

  return (
    <article className="company-view">
      <section className="company-view__hero" data-sal="fade">
        <div className="company-view__hero-background">
          <div className="company-view__hero-background-mask" />
          <img src={data.hero_image} alt={data.title[i18n.language]} />
        </div>
        <div className="company-view__hero-content">
          <div className="side-padding">
            <h1 data-sal="fade" data-sal-delay="200">
              {data.title[i18n.language]}
            </h1>
            <p data-sal="fade" data-sal-delay="300">
              {data.paragraph[i18n.language]}
            </p>
            <div className="company-view__hero-content-actions">
              {data.company_video && (
                <div data-sal="fade" data-sal-delay="500">
                  <CustomButton
                    text="See our work"
                    icon={<Play />}
                    onClick={() => playVideo(data.company_video)}
                  />
                </div>
              )}
              {data?.company_catalog && (
                <div data-sal="fade" data-sal-delay="550">
                  <CustomButton
                    secondary
                    target="_blank"
                    icon={<View />}
                    text={t("see our catalog")}
                    linkTo="/images/company/falkonoil/Falkenoil Passenger Car 15W-40.pdf"
                  />
                </div>
              )}
            </div>
            {data?.external_link && (
              <div className="company-view__referral-link">
                <Link target="_blank" rel="noreferrer" to={data.external_link}>
                  <span>Go to website</span> 
                    <ExternalLink /> 
                </Link>
              </div>
            )} 
          </div>
        </div>
      </section>

      {data.sub_sections.length > 0 && (
        <section className="company-view__services">
          <ul className="company-view__service-list">
            {data.sub_sections.map((service) => (
              <li key={service.key} className="company-view__service-card">
                <div className="company-view__service-card-container max-w">
                  <div
                    className="company-view__service-card-image"
                    data-sal="fade"
                    data-sal-delay="500"
                    style={{ "--sal-duration": "1s" }}
                  >
                    <img
                      src={service.image_path}
                      alt={service.title[i18n.language]}
                    />
                  </div>
                  <div className="company-view__service-card-content">
                    <h3 data-sal="fade" data-sal-delay="300">
                      {service.title[i18n.language]}
                    </h3>
                    <p data-sal="fade" data-sal-delay="300">
                      {service.description[i18n.language]}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {data?.youtube_video && (
        <section className="company-view__video side-padding">
          <iframe
            src={data.youtube_video}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </section>
      )}

      {data.gallery.images.length > 0 && (
        <section className="company-view__slider-section side-padding">
          <div className="company-view__slider-section-header">
            <h2 data-sal="fade" data-sal-delay="200">
              {data.gallery.title[i18n.language]}
            </h2>
            <p data-sal="fade" data-sal-delay="300">
              {data.gallery.paragraph[i18n.language]}
            </p>
          </div>

          <div
            data-sal="fade"
            data-sal-delay="400"
            className="company-view__slider-card-controls"
          >
            <button
              onClick={() => setIsSliderControlActive("prev")}
              className={classNames(
                "button company-view__slider-action-button",
                "company-view__slider-action-button--prev",
                {
                  "company-view__slider-action-button--prev-active":
                    isSliderControlActive === "prev",
                }
              )}
            >
              <div className="company-view__slider-action-icon company-view__slider-action-icon--prev">
                <Indicator width={32} height={32} />
              </div>
            </button>
            <button
              onClick={() => setIsSliderControlActive("next")}
              className={classNames(
                "button company-view__slider-action-button",
                "company-view__slider-action-button--next",
                {
                  "company-view__slider-action-button--next-active":
                    isSliderControlActive === "next",
                }
              )}
            >
              <div className="company-view__slider-action-icon">
                <Indicator width={32} height={32} />
              </div>
            </button>
          </div>

          <PhotoProvider
            overlayRender={(props) => {
              const { onClose } = props;
              return (
                <>
                  <SlideToolbar {...props} />
                  <CloseButton onClick={onClose} />
                </>
              );
            }}
          >
            <Swiper
              data-sal="fade"
              data-sal-delay="600"
              slidesPerView={"auto"}
              spaceBetween={20}
              modules={[Navigation]}
              navigation={{
                nextEl: ".company-view__slider-action-button--next",
                prevEl: ".company-view__slider-action-button--prev",
              }}
            >
              {prepareGalleryArrays.map((groupedArrays, index) => (
                <SwiperSlide key={index}>
                  <ul className="company-view__list">
                    {groupedArrays.map((image) => (
                      <PhotoView src={image} key={image}>
                        <li className="company-view__list-item" key={image}>
                          <div className="company-view__list-item-hover-content">
                            <button className="button company-view__list-item-image-previewer">
                              <ExpandIcon width={28} height={28} />
                            </button>
                          </div>
                          <img src={image} alt="Company views gallery item" />
                        </li>
                      </PhotoView>
                    ))}
                  </ul>
                </SwiperSlide>
              ))}
            </Swiper>
          </PhotoProvider>
        </section>
      )}

      {data?.our_products && (
        <section
          id="our-products"
          className="company-view__our-products side-padding"
        >
          <h3
            data-sal="fade"
            data-sal-delay="300"
            className="company-view__our-products-title"
          >
            {data.our_products.title[i18n.language]}
          </h3>

          <ul className="company-view__our-products-list">
            {data.our_products.products.map((product, index) => {
              const delay = index * 100;

              return (
                <li
                  key={index}
                  data-sal="fade"
                  data-sal-delay={300 + delay}
                  className="company-view__our-products-list-item"
                >
                  <div className="company-view__our-products-item-image">
                    <img
                      src={product.card_image}
                      alt={product.title[i18n.language]}
                    />
                  </div>
                  <div className="company-view__our-products-item-contents">
                    <div>
                      <span className="company-view__our-products-item-title">
                        {product.title[i18n.language]}
                      </span>
                      <Link
                        replace
                        preventScrollReset
                        to={`./${product.slug}`}
                        className="company-view__our-products-item-action"
                      >
                        {t("View Products")}
                      </Link>
                      {product?.brochure_path && (
                        <Link
                          replace
                          preventScrollReset
                          target="_blank"
                          rel="noreferrer"
                          to={product.brochure_path}
                          className="company-view__our-products-item-action"
                        >
                          {t("View Brochure")}
                        </Link>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section className="contact-us side-padding">
        <section className="contact-us__header ">
          <h1 data-sal="fade" data-sal-delay="200">
            {data.contact.title[i18n.language]}
          </h1>

          <div className="contact-us__header-content-container">
            <ul
              data-sal="fade"
              data-sal-delay="300"
              className="contact-us__header-content"
            >
              <span>{data.contact.phone.title[i18n.language]}</span>
              {data.contact.phone.entities.map((item, index) => (
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
              <span>{data.contact.address.title[i18n.language]}</span>
              {data.contact.address.entities.map((item, index) => (
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
              <span>{data.contact.email.title[i18n.language]}</span>
              {data.contact.email.entities.map((item, index) => (
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
              <span>{data.contact.social.title[i18n.language]}</span>
              <ul className="contact-us__header-social-lists">
                {data.contact.social.links.facebook && (
                  <Link
                    target="_blank"
                    rel="noreferrer"
                    to={data.contact.social.links.facebook}
                    className="contact-us__header-social-item"
                  >
                    <Facebook width={28} height={28} />
                  </Link>
                )}
                {data.contact.social.links.instagram && (
                  <Link
                    target="_blank"
                    rel="noreferrer"
                    to={data.contact.social.links.instagram}
                    className="contact-us__header-social-item"
                  >
                    <Instagram width={23} height={23} />
                  </Link>
                )}
                {data.contact.social.links.linked_in && (
                  <Link
                    target="_blank"
                    rel="noreferrer"
                    to={data.contact.social.links.linked_in}
                    className="contact-us__header-social-item"
                  >
                    <LinkedIn width={32} height={32} />
                  </Link>
                )}
              </ul>
            </div>
          </div>
        </section>

        <section
          data-sal="fade"
          data-sal-delay="600"
          className="contact-us__map"
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
                height={mapHeight}
                position={data.contact.coordinates}
                popupTitle={data.title[i18n.language]}
              />
            )}
          </ClientOnly>
        </section>
      </section>

      <Outlet />
    </article>
  );
};

export default CompanyView;
