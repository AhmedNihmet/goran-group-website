import classNames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation } from "swiper/modules";

import aboutUsStyles from "~/styles/pages/about-us.css";

import Arrow from "~/Icons/Arrow";
import { useEffect, useState } from "react";

/**
 * @returns {import("@remix-run/node").LinkDescriptor[]}
 */
export const links = () => [
  {
    rel: "stylesheet",
    href: aboutUsStyles,
  },
];

/**
 * @returns {import("@remix-run/node").MetaDescriptor[]}
 */
export const meta = () => {
  return [{ title: "Goran Group | About us page" }];
};

const AboutUs = () => {
  const [isThumbActionActive, setIsThumbActionActive] = useState(null);

  useEffect(() => {
    if (isThumbActionActive !== null)
      setTimeout(() => {
        setIsThumbActionActive(null);
      }, 300);
  }, [isThumbActionActive]);

  return (
    <article className="about-us">
      <section className="about-us__hero">
        <img src="/images/about-us/hero.jpg" alt="About us hero section" />
      </section>

      <section className="about-us__hero-details max-w">
        <div className="about-us__hero-content">
          <h1>About Us</h1>
          <p>“We’ve worked extensively in terms of geography and sector”</p>
        </div>
        <div className="about-us__hero-stacked-cards">
          <Swiper
            dir="rtl"
            effect={"cards"} 
            modules={[Navigation, EffectCards]}
            navigation={{
              nextEl: '.about-us__hero-stacked-cards-action-button--next',
              prevEl: '.about-us__hero-stacked-cards-action-button--prev',
            }}
            cardsEffect={{
              rotate: false,
              slideShadows: false,
              perSlideOffset: 12,
            }}
          >
            <SwiperSlide className="about-us__hero-stacked-card">
              <img
                alt="stacked card number 1"
                src="/images/about-us/stacked-cards/1.jpg"
              />
            </SwiperSlide>
            <SwiperSlide className="about-us__hero-stacked-card">
              <img
                alt="stacked card number 2"
                src="/images/about-us/stacked-cards/2.png"
              />
            </SwiperSlide>
            <SwiperSlide className="about-us__hero-stacked-card">
              <img
                alt="stacked card number 3"
                src="/images/about-us/stacked-cards/3.jpg"
              />
            </SwiperSlide>
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
        <p>
          Goran Group thrives across diverse sectors, guided by visionary
          leadership. With a professional team and strategic decisions, we
          elevate benefits, fostering growth and innovation since 2005.
          <br />
          <br />
          United in Excellence, Goran Group thrives across diverse sectors,
          guided by visionary leadership. With a professional team and strategic
          decisions, we elevate benefits, fostering growth and innovation since
          2005.United in Excellence, Goran Group thrives across diverse sectors,
          guided by visionary leadership. With a professional team and strategic
          decisions, we elevate benefits, fostering growth and innovation since
          2005.
          <br />
          <br />
          Goran Group thrives across diverse sectors, guided by visionary
          leadership. With a professional team and strategic decisions.
        </p>
      </section>
    </article>
  );
};

export default AboutUs;
