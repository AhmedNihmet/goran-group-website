import sal from "sal.js";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { Swiper, SwiperSlide } from "swiper/react";
import { Fragment, useEffect, useState } from "react";
import { EffectCards, Navigation } from "swiper/modules";
import { json, useLoaderData, useRouteLoaderData } from "@remix-run/react";

import aboutUsStyles from "~/styles/pages/about-us.css";
import mediaQueryStyles from "~/styles/media-queries.css";

import Arrow from "~/Icons/Arrow";
import Download from "~/Icons/Download";

import Stats from "~/components/page/Stats";
import Partners from "~/components/Partners";
import CustomButton from "~/components/CustomButton";
import MissionAndVision from "~/components/page/MissionAndVision";

import { buildUrl } from "~/api/config";

/**
 * @returns {import("@remix-run/node").LinkDescriptor[]}
 */
export const links = () => [
  {
    rel: "stylesheet",
    href: aboutUsStyles,
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
  return [{ title: "Goran Group | About us page" }];
};

/**
 * @type {import("react-router").LoaderFunction}
 */
export const loader = async ({ request }) => {
  const url = buildUrl(request, "/data/about-us.json");

  const res = await fetch(url);

  const body = await res.json();

  return json(body);
};

const AboutUs = () => {
  const { hero } = useLoaderData();
  const { t, i18n } = useTranslation();
  const { specializations } = useRouteLoaderData("root");

  const [isThumbActionActive, setIsThumbActionActive] = useState(null);
  const [specializationActions, setSpecializationActions] = useState({
    isEnd: false,
    isBeginning: true,
  });

  useEffect(() => {
    sal({
      threshold: 0.5,
    });
  }, []);

  useEffect(() => {
    if (isThumbActionActive !== null)
      setTimeout(() => {
        setIsThumbActionActive(null);
      }, 300);
  }, [isThumbActionActive]);

  return (
    <article className="about-us">
      <section className="about-us__hero" data-sal="fade">
        <img src={hero.image_path} alt="About us hero section" />
      </section>

      <section className="about-us__hero-details max-w">
        <div className="about-us__hero-content">
          <h1 data-sal="fade" data-sal-delay="200">
            {hero.title[i18n.language]}
          </h1>
          <p data-sal="fade" data-sal-delay="300">
            {hero.sub_title[i18n.language]}
          </p>
          <div data-sal="fade" data-sal-delay="350">
          <CustomButton
            downloadable
            target="_blank"
            icon={<Download />}
            text={t("our profile")}
            className="about-us__hero-content-download"
            linkTo="/images/about-us/goran-group-profile.pdf"
          />
          </div>
        </div>
        <div
          data-sal="fade"
          data-sal-delay="500"
          className="about-us__hero-stacked-cards"
        >
          <Swiper
            dir="rtl"
            effect={"cards"}
            modules={[Navigation, EffectCards]}
            navigation={{
              nextEl: ".about-us__hero-stacked-cards-action-button--next",
              prevEl: ".about-us__hero-stacked-cards-action-button--prev",
            }}
            cardsEffect={{
              rotate: false,
              slideShadows: false,
              perSlideOffset: 12,
            }}
          >
            {hero.slider.map((item) => (
              <SwiperSlide key={item} className="about-us__hero-stacked-card">
                <img src={item} alt="stacked cards" />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="about-us__hero-stacked-cards-action">
            <button
              className={classNames(
                "button about-us__hero-stacked-cards-action-button",
                "about-us__hero-stacked-cards-action-button--prev",
                {
                  "about-us__hero-stacked-cards-action-button--prev-active":
                    isThumbActionActive === "thumb--prev",
                }
              )}
              onClick={() => setIsThumbActionActive("thumb--prev")}
            >
              <Arrow
                width={32}
                height={32}
                className="about-us__hero-stacked-cards-action-prev-icon"
              />
            </button>
            <button
              className={classNames(
                "button about-us__hero-stacked-cards-action-button",
                "about-us__hero-stacked-cards-action-button--next",
                {
                  "about-us__hero-stacked-cards-action-button--next-active":
                    isThumbActionActive === "thumb--next",
                }
              )}
              onClick={() => setIsThumbActionActive("thumb--next")}
            >
              <Arrow width={32} height={32} />
            </button>
          </div>
        </div>
      </section>

      <section className="about-us__hero-detailed-paragraph max-w">
        <div>
          {hero.paragraphs.map((paragraph, index) => {
            const delay = 200 + index * 100;

            return (
              <Fragment key={index}>
                <p data-sal="fade" data-sal-delay={delay}>
                  {paragraph[i18n.language]}
                </p>
                {paragraph?.list?.length > 0 && (
                  <ul data-sal="fade" data-sal-delay={delay}>
                    {paragraph.list.map((paragraphListItem) => (
                      <li key={paragraphListItem.en}>
                        {paragraphListItem[i18n.language]}
                      </li>
                    ))}
                  </ul>
                )}
              </Fragment>
            );
          })}
        </div>
      </section>

      <section className="about-us__stats" data-sal="fade" data-sal-delay="200">
        <Stats />
      </section>

      <section
        data-sal="fade"
        data-sal-delay="200"
        id="specializations"
        className="about-us__specializations max-w"
      >
        <div className="about-us__specializations-actions">
          <button
            onClick={() => setIsThumbActionActive("specialization--prev")}
            className={classNames(
              "button about-us__specializations-action-button",
              "about-us__specializations-action-button--prev",
              {
                "about-us__specializations-action-button--hidden":
                  specializationActions.isBeginning === true,
                "about-us__specializations-action-button--prev-active":
                  isThumbActionActive === "specialization--prev",
              }
            )}
          >
            <Arrow
              width={32}
              height={32}
              className="about-us__hero-stacked-cards-action-prev-icon"
            />
          </button>
          <button
            onClick={() => setIsThumbActionActive("specialization--next")}
            className={classNames(
              "button about-us__specializations-action-button",
              "about-us__specializations-action-button--next",
              {
                "about-us__specializations-action-button--hidden":
                  specializationActions.isEnd === true,
                "about-us__specializations-action-button--next-active":
                  isThumbActionActive === "specialization--next",
              }
            )}
          >
            <Arrow width={32} height={32} />
          </button>
        </div>
        <Swiper
          slidesPerView={1}
          slidesPerGroup={1}
          modules={[Navigation]}
          breakpoints={{
            540: {
              slidesPerView: 2,
              slidesPerGroup: 2,
            },
            768: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
          }}
          navigation={{
            nextEl: ".about-us__specializations-action-button--next",
            prevEl: ".about-us__specializations-action-button--prev",
          }}
          onSlideChange={({ isEnd, isBeginning }) =>
            setSpecializationActions({ isEnd, isBeginning })
          }
        >
          {specializations.map((specialty) => (
            <SwiperSlide key={specialty.key}>
              <div className="about-us__specialization-cards">
                <div className="about-us__specialization-card-image">
                  <img
                    alt={specialty.title[i18n.language]}
                    src={specialty.thumbnail}
                  />
                </div>
                <div className="about-us__specialization-card-line" />
                <div className="about-us__specialization-card-content">
                  <h4>{specialty.thumb_title[i18n.language]}</h4>
                  <p>{specialty.description[i18n.language]}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <div className="max-w">
        <MissionAndVision />
      </div>

      <section className="about-us__partners" id="our-brands">
        <Partners />
      </section>
    </article>
  );
};

export default AboutUs;
