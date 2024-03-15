import sal from "sal.js";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation } from "swiper/modules";

import aboutUsStyles from "~/styles/pages/about-us.css";
import mediaQueryStyles from "~/styles/media-queries.css";

import Arrow from "~/Icons/Arrow";

import Stats from "~/components/page/Stats";
import Partners from "~/components/Partners";
import MissionAndVision from "~/components/page/MissionAndVision";

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

const AboutUs = () => {
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
        <img src="/images/about-us/hero.jpg" alt="About us hero section" />
      </section>

      <section className="about-us__hero-details max-w">
        <div className="about-us__hero-content">
          <h1 data-sal="fade" data-sal-delay="200">
            About Us
          </h1>
          <p data-sal="fade" data-sal-delay="300">
            “We’ve worked extensively in terms of geography and sector”
          </p>
        </div>
        <div
          className="about-us__hero-stacked-cards"
          data-sal="fade"
          data-sal-delay="500"
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
          <span data-sal="fade" data-sal-delay="200">
            Goran Group thrives across diverse sectors, guided by visionary
            leadership. With a professional team and strategic decisions, we
            elevate benefits, fostering growth and innovation since 2005.
          </span>
          <br />
          <br />
          <span data-sal="fade" data-sal-delay="300">
            United in Excellence, Goran Group thrives across diverse sectors,
            guided by visionary leadership. With a professional team and
            strategic decisions, we elevate benefits, fostering growth and
            innovation since 2005.United in Excellence, Goran Group thrives
            across diverse sectors, guided by visionary leadership. With a
            professional team and strategic decisions, we elevate benefits,
            fostering growth and innovation since 2005.
          </span>
          <br />
          <br />
          <span data-sal="fade" data-sal-delay="400">
            Goran Group thrives across diverse sectors, guided by visionary
            leadership. With a professional team and strategic decisions.
          </span>
        </p>
      </section>

      <section className="about-us__stats" data-sal="fade" data-sal-delay="200">
        <Stats />
      </section>

      <section className="about-us__specializations max-w" data-sal="fade" data-sal-delay="200">
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
          slidesPerView={3}
          slidesPerGroup={3}
          modules={[Navigation]}
          navigation={{
            nextEl: ".about-us__specializations-action-button--next",
            prevEl: ".about-us__specializations-action-button--prev",
          }}
          onSlideChange={({ isEnd, isBeginning }) =>
            setSpecializationActions({ isEnd, isBeginning })
          }
        >
          <SwiperSlide>
            <div className="about-us__specialization-cards">
              <div className="about-us__specialization-card-image">
                <img
                  src="/images/about-us/specialization/1.jpg"
                  alt="construction"
                />
              </div>
              <div className="about-us__specialization-card-line" />
              <div className="about-us__specialization-card-content">
                <h4>construction company</h4>
                <p>
                  Goran Group thrives across diverse sectors, guided by
                  visionary leadership. With a professional team and strategic
                  decisions.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="about-us__specialization-cards">
              <div className="about-us__specialization-card-image">
                <img
                  src="/images/about-us/specialization/2.jpg"
                  alt="construction"
                />
              </div>
              <div className="about-us__specialization-card-line" />
              <div className="about-us__specialization-card-content">
                <h4>Oil Company</h4>
                <p>
                  Goran Group thrives across diverse sectors, guided by
                  visionary leadership. With a professional team and strategic
                  decisions.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="about-us__specialization-cards">
              <div className="about-us__specialization-card-image">
                <img
                  src="/images/about-us/specialization/3.jpg"
                  alt="construction"
                />
              </div>
              <div className="about-us__specialization-card-line" />
              <div className="about-us__specialization-card-content">
                <h4>Generator Company</h4>
                <p>
                  Goran Group thrives across diverse sectors, guided by
                  visionary leadership. With a professional team and strategic
                  decisions.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="about-us__specialization-cards">
              <div className="about-us__specialization-card-image">
                <img
                  src="/images/about-us/specialization/1.jpg"
                  alt="construction"
                />
              </div>
              <div className="about-us__specialization-card-line" />
              <div className="about-us__specialization-card-content">
                <h4>construction company</h4>
                <p>
                  Goran Group thrives across diverse sectors, guided by
                  visionary leadership. With a professional team and strategic
                  decisions.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="about-us__specialization-cards">
              <div className="about-us__specialization-card-image">
                <img
                  src="/images/about-us/specialization/2.jpg"
                  alt="construction"
                />
              </div>
              <div className="about-us__specialization-card-line" />
              <div className="about-us__specialization-card-content">
                <h4>Oil Company</h4>
                <p>
                  Goran Group thrives across diverse sectors, guided by
                  visionary leadership. With a professional team and strategic
                  decisions.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="about-us__specialization-cards">
              <div className="about-us__specialization-card-image">
                <img
                  src="/images/about-us/specialization/3.jpg"
                  alt="construction"
                />
              </div>
              <div className="about-us__specialization-card-line" />
              <div className="about-us__specialization-card-content">
                <h4>Generator Company</h4>
                <p>
                  Goran Group thrives across diverse sectors, guided by
                  visionary leadership. With a professional team and strategic
                  decisions.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="about-us__specialization-cards">
              <div className="about-us__specialization-card-image">
                <img
                  src="/images/about-us/specialization/1.jpg"
                  alt="construction"
                />
              </div>
              <div className="about-us__specialization-card-line" />
              <div className="about-us__specialization-card-content">
                <h4>construction company</h4>
                <p>
                  Goran Group thrives across diverse sectors, guided by
                  visionary leadership. With a professional team and strategic
                  decisions.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="about-us__specialization-cards">
              <div className="about-us__specialization-card-image">
                <img
                  src="/images/about-us/specialization/2.jpg"
                  alt="construction"
                />
              </div>
              <div className="about-us__specialization-card-line" />
              <div className="about-us__specialization-card-content">
                <h4>Oil Company</h4>
                <p>
                  Goran Group thrives across diverse sectors, guided by
                  visionary leadership. With a professional team and strategic
                  decisions.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="about-us__specialization-cards">
              <div className="about-us__specialization-card-image">
                <img
                  src="/images/about-us/specialization/3.jpg"
                  alt="construction"
                />
              </div>
              <div className="about-us__specialization-card-line" />
              <div className="about-us__specialization-card-content">
                <h4>Generator Company</h4>
                <p>
                  Goran Group thrives across diverse sectors, guided by
                  visionary leadership. With a professional team and strategic
                  decisions.
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      <div className="max-w">
        <MissionAndVision />
      </div>

      <section className="about-us__partners">
        <Partners />
      </section>
    </article>
  );
};

export default AboutUs;
