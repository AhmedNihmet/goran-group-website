import classNames from "classnames";
import * as Slider from "react-slick";
import { useEffect, useRef, useState } from "react";
import { Link, json, useLoaderData } from "@remix-run/react";

import homeStyles from "~/styles/pages/home.css";

import Play from "~/Icons/Play";
import Arrow from "~/Icons/Arrow";

import Partners from "~/components/Partners";
import CustomButton from "~/components/CustomButton";

import { buildUrl } from "~/api/config";
import { truncateString } from "~/utils/general";
import Stats from "~/components/page/Stats";

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
      <section className="home__hero-container">
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
                    <h2 className="large-title">{item.title}</h2>
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

        <section className="home__hero-thumbs max-w">
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
      </section>

      <section className="home__about-us side-padding">
        <div className="home__about-us-content">
          <span>About Us</span>
          <h4>Get to know us better!</h4>
          <p>
            Our tailored energy solutions focus on optimizing efficiency,
            reducing consumption, and enhancing sustainability. From
            cutting-edge technologies to personalized energy audits, we provide
            innovative strategies to streamline your energy audits, we provide
            innovative strategies to streamline your
          </p>

          <CustomButton text="Learn More" icon={<Arrow />} />
        </div>
        <div className="home__about-us-image">
          <img
            src="/images/home/about-us-image.webp"
            alt="Get to know us better"
          />
        </div>
      </section>

      <section className="home__companies side-padding">
        <div className="home__companies-header">
          <h2>Embrace Your experience</h2>
          <p>
            United in Excellence, Goran Group thrives across diverse sectors,
            guided by visionary leadership. With a professional team and
            strategic
          </p>
        </div>
        <ul className="home__companies-cards">
          {Array.from({ length: 4 }).map((_, index) => {
            return (
              <Link className="home__companies-card-item" key={index}>
                <div className="home__companies-card-item-image">
                  <img
                    alt="Company alt text"
                    src="/images/home/hero-slider/restaurant.jpg"
                  />
                </div>
                <div className="home__companies-card-item-image-content">
                  <h3>Saray Baklava</h3>
                  <p>
                    United in Excellence, Goran Group thrives across diverse
                    sectors, guided by visionary leadership
                  </p>
                </div>
              </Link>
            );
          })}
        </ul>

        <div className="home__companies-see-more">
          <CustomButton text="See More" />
        </div>
      </section>

      <section className="home__chairman max-w">
        <div className="home__chairman-image">
          <img
            src="/images/home/chairman.jpg"
            alt="Mr. Khalil Abbo Mirza. goran groups chairman"
          />
        </div>
        <div className="home__chairman-content">
          <span>CEO of Goran Group Company</span>
          <h1>Mr. Khalil Abbo Mirza</h1>
          <p>
            Mr. Khalil, entered business from its narrow gate and insisted to
            work alone as in 1981 he started with setting up a small store for
            selling agricultural materials. Although he started business at a
            young age, yet he finished his education. Currently, he is head of
            the Administration Board of Goran Group, which consists of several
            trading companies, constructions, and selling power generators,
            medical and plastic surgery materials, and equipment.
          </p>
        </div>
      </section>

      <section className="home__stats">
        <Stats />
      </section>

      <section className="home__partners side-padding">
        <Partners />
      </section>
    </article>
  );
};

export default Home;
