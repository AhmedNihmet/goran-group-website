import * as Slider from "react-slick";
import { json, useLoaderData } from "@remix-run/react";

import homeStyles from "~/styles/pages/home.css";

import Play from "~/Icons/Play";

import CustomButton from "~/components/CustomButton";

import { buildUrl } from "~/api/config";
import { useEffect, useRef, useState } from "react";
import { truncateString } from "~/utils/general";
import Arrow from "~/Icons/Arrow";
import classNames from "classnames";

const SliderWrapper = Slider.default.default;

/**
 * @returns {import("@remix-run/node").LinkDescriptor[]}
 */
export const links = () => [
  {
    rel: "stylesheet",
    href: homeStyles,
  },
];

/**
 * @returns {import("@remix-run/node").MetaDescriptor[]}
 */
export const meta = () => {
  return [{ title: "Goran Group | Home page" }];
};

/**
 * @type {import("react-router").LoaderFunction}
 */
export const loader = async ({ request }) => {
  const url = buildUrl(request, "/data/specialization.json");

  const specializationsResponse = await fetch(url);
  const { specializations } = await specializationsResponse.json();

  return json(specializations);
};

/** @type {import("react-slick").Settings} */
const settingsMain = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 1000,
  fade: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipe: false,
  slide: false,
  lazyLoad: true,
  className: "home__main-slider",
};

/** @type {import("react-slick").Settings} */
const settingsThumbs = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 8000,
  slidesToShow: 4,
  slidesToScroll: 1,
  focusOnSelect: true,
  swipeToSlide: true,
};

const Home = () => {
  const mainSliderRef = useRef(null);
  const thumbSliderRef = useRef(null);
  const loaderData = useLoaderData();

  const [currentActiveThumb, setCurrentActiveThumb] = useState(0);
  const [isThumbActionActive, setIsThumbActionActive] = useState(null);

  useEffect(() => {
    if (isThumbActionActive !== null)
      setTimeout(() => {
        setIsThumbActionActive(null);
      }, 300);
  }, [isThumbActionActive]);

  useEffect(() => {
    mainSliderRef.current.slickGoTo(currentActiveThumb);
  }, [currentActiveThumb]);

  settingsThumbs.beforeChange = (_, activeIndex) =>
    setCurrentActiveThumb(activeIndex);

  return (
    <article className="home">
      <SliderWrapper {...settingsMain} ref={mainSliderRef}>
        {loaderData.map((item) => (
          <div key={item.key}>
            <section className="home__hero-section">
              <div className="home__hero-background">
                <div className="home__hero-background-mask" />
                <img
                  alt={item.title}
                  src={item.image_path}
                  className="home__hero-background-image"
                />
              </div>
              <div className="home__hero-content">
                <div className="home__hero-content-container side-padding">
                  <h1 className="large-title">{item.title}</h1>
                  <p className="medium-paragraph">
                    {truncateString(item.description, 21)}
                  </p>
                  <CustomButton text="see a video" icon={<Play />} />
                </div>
              </div>
            </section>
          </div>
        ))}
      </SliderWrapper>

      <section className="home__hero-thumbs">
        <section className="home__hero-thumb-actions-container">
          <button
            className={classNames(
              "button home__hero-thumb-action",
              "home__hero-thumb-action--prev",
              {
                "home__hero-thumb-action--active":
                  isThumbActionActive === "thumb--prev",
              }
            )}
            onClick={() => {
              thumbSliderRef.current.slickPrev();
              setIsThumbActionActive("thumb--prev");
            }}
          >
            <Arrow
              width={32}
              height={32}
              className="home__hero-thumb-action-icon home__hero-thumb-action-icon--prev"
            />
          </button>
          <button
            className={classNames("button home__hero-thumb-action", {
              "home__hero-thumb-action--active":
                isThumbActionActive === "thumb--next",
            })}
            onClick={() => {
              thumbSliderRef.current.slickNext();
              setIsThumbActionActive("thumb--next");
            }}
          >
            <Arrow
              width={32}
              height={32}
              className="home__hero-thumb-action-icon"
            />
          </button>
        </section>
        <SliderWrapper {...settingsThumbs} ref={thumbSliderRef}>
          {loaderData.map((item) => (
            <div key={item.key}>
              <div className="home__hero-thumb-card">
                <div className="home__hero-thumb-card-image">
                  <img src={item.card_icon_path} alt={item.thumb_title} />
                </div>
                <h3 className="home__hero-thumb-card-title">
                  {item.thumb_title}
                </h3>
                <p className="home__hero-thumb-card-paragraph">
                  {truncateString(item.description, 21)}
                </p>
              </div>
            </div>
          ))}
        </SliderWrapper>
      </section>

      <div style={{ height: 600 }} />
    </article>
  );
};

export default Home;
