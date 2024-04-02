import sal from "sal.js";
import classNames from "classnames";

import { Navigation } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useMemo, useState } from "react";
import { json, redirect, useLoaderData } from "@remix-run/react";
import { PhotoProvider, PhotoView } from "react-image-previewer";
import { SlideToolbar, CloseButton } from "react-image-previewer/ui";

import companyViewStyles from "~/styles/pages/company-view.css";
import mediaQueryStyles from "~/styles/media-queries.css";

import Play from "~/Icons/Play";
import Indicator from "~/Icons/Indicator";

import CustomButton from "~/components/CustomButton";

import { buildUrl } from "~/api/config";
import ExpandIcon from "~/Icons/ExpandIcon";

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
    href: mediaQueryStyles,
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

const CompanyView = () => {
  const { data } = useLoaderData();
  const { i18n } = useTranslation();

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

  const prepareGalleryArrays = useMemo(() => {
    const arrayOfImageStrings = data?.gallery?.images;

    if (!arrayOfImageStrings) return [];

    const result = [];
    for (let i = 0; i < arrayOfImageStrings.length; i += 4) {
      result.push(arrayOfImageStrings.slice(i, i + 4));
    }
    return result;
  }, [data.gallery.images]);

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
            <div data-sal="fade" data-sal-delay="500">
              {data.company_video && (
                <CustomButton text="See our work" icon={<Play />} />
              )}
            </div>
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

          <div className="company-view__slider-card-controls">
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
    </article>
  );
};

export default CompanyView;
