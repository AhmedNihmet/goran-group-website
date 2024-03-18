import sal from "sal.js";
import classNames from "classnames";
import * as Slider from "react-slick";
import { useEffect, useRef, useState } from "react";
import {
  Link,
  json,
  useLoaderData,
  useLocation,
  useRouteLoaderData,
  useSearchParams,
} from "@remix-run/react";

import homeStyles from "~/styles/pages/home.css";
import mediaQueryStyles from "~/styles/media-queries.css";

import Play from "~/Icons/Play";
import Arrow from "~/Icons/Arrow";

import Stats from "~/components/page/Stats";
import Partners from "~/components/Partners";
import CustomButton from "~/components/CustomButton";

import { buildUrl } from "~/api/config";
import { truncateString } from "~/utils/general";

const SliderWrapper = Slider.default.default;

/**
 * @returns {import("@remix-run/node").LinkDescriptor[]}
 */
export const links = () => [
  {
    rel: "stylesheet",
    href: homeStyles,
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
  return [{ title: "Goran Group | Home page" }];
};

/**
 * @type {import("react-router").LoaderFunction}
 */
export const loader = async ({ request }) => {
  const url = buildUrl(request, "/data/home.json");

  const res = await fetch(url);

  const data = await res.json();

  return json(data);
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
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 540,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 420,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const Home = () => {
  const mainSliderRef = useRef(null);
  const thumbSliderRef = useRef(null);

  const { search } = useLocation();
  const { about_us, chairman, companies_header } = useLoaderData();
  const { specializations, companies } = useRouteLoaderData("root");

  const [searchParams, setSearchParams] = useSearchParams();

  const [currentActiveThumb, setCurrentActiveThumb] = useState(0);
  const [isThumbActionActive, setIsThumbActionActive] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(search);

    const specialty = searchParams.get("specialty");
    if (specialty) {
      const selectedSpecialtyIndex = specializations.findIndex(
        (item) => item.key === specialty
      );

      setTimeout(() => {
        mainSliderRef.current.slickGoTo(selectedSpecialtyIndex);
        thumbSliderRef.current.slickGoTo(selectedSpecialtyIndex);
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, specializations]);

  useEffect(() => {
    if (isThumbActionActive !== null)
      setTimeout(() => {
        setIsThumbActionActive(null);
      }, 300);
  }, [isThumbActionActive]);

  useEffect(() => {
    mainSliderRef?.current?.slickGoTo(currentActiveThumb);
  }, [currentActiveThumb]);

  useEffect(() => {
    sal({
      threshold: 0.5,
    });
  }, []);

  settingsThumbs.beforeChange = (_, activeIndex) =>
    setCurrentActiveThumb(activeIndex);

  const playVideo = (url) => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set("reel-state", "active");
    updatedSearchParams.set(
      "reel-url",
      `${window?.location?.origin || ""}${url}`
    );

    return setSearchParams(updatedSearchParams);
  };

  return (
    <article className="home">
      <section
        className="home__hero-container"
        data-sal="fade"
        data-sal-delay="300"
      >
        <SliderWrapper {...settingsMain} ref={mainSliderRef}>
          {specializations.map((item) => (
            <div key={item.key}>
              <section className="home__hero-section">
                <div className="home__hero-background">
                  <div className="home__hero-background-mask" />
                  <img
                    alt={item.title.en}
                    src={item.image_path}
                    className="home__hero-background-image"
                  />
                </div>
                <div className="home__hero-content">
                  <div className="home__hero-content-container side-padding">
                    <h2 className="large-title">{item.title.en}</h2>
                    <p className="medium-paragraph">
                      {truncateString(item.description.en, 21)}
                    </p>
                    {item?.video_path && (
                      <CustomButton
                        text="see a video"
                        icon={<Play />}
                        onClick={() => playVideo(item.video_path)}
                      />
                    )}
                  </div>
                </div>
              </section>
            </div>
          ))}
        </SliderWrapper>

        <section className="home__hero-thumbs max-w">
          <section className="home__hero-thumb-actions-container">
            <button
              type="button"
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
              type="button"
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
            {specializations.map((item) => (
              <div key={item.key}>
                <div className="home__hero-thumb-card">
                  <div className="home__hero-thumb-card-image">
                    <img src={item.card_icon_path} alt={item.thumb_title.en} />
                  </div>
                  <h3 className="home__hero-thumb-card-title">
                    {item.thumb_title.en}
                  </h3>
                  <p className="home__hero-thumb-card-paragraph">
                    {truncateString(item.description.en, 21)}
                  </p>
                </div>
              </div>
            ))}
          </SliderWrapper>
        </section>
      </section>

      <section className="home__about-us side-padding">
        <div className="home__about-us-content">
          <span data-sal="fade" data-sal-delay="100">
            {about_us.sub_title.en}
          </span>
          <h4 data-sal="fade" data-sal-delay="200">
            {about_us.title.en}
          </h4>
          <p data-sal="fade" data-sal-delay="300">
            {about_us.paragraph.en}
          </p>

          <div data-sal="fade" data-sal-delay="400">
            <CustomButton
              icon={<Arrow />}
              text={about_us.action.text.en}
              linkTo={about_us.action.link_to}
            />
          </div>
        </div>
        <div
          className="home__about-us-image"
          data-sal="fade"
          data-sal-delay="500"
          style={{ "--sal-duration": "1s" }}
        >
          <img src={about_us.image_path} alt="Get to know us better" />
        </div>
      </section>

      <section className="home__companies side-padding" id="companies">
        <div className="home__companies-header">
          <h2 data-sal="fade" data-sal-delay="200">
            {companies_header.title.en}
          </h2>
          <p data-sal="fade" data-sal-delay="250">
            {companies_header.paragraph.en}
          </p>
        </div>
        <ul className="home__companies-cards">
          {companies.map((company) => {
            return (
              <Link
                data-sal="fade"
                data-sal-delay="200"
                key={company.slug}
                to={`/company/${company.slug}/view`}
                className="home__companies-card-item"
              >
                <div className="home__companies-card-item-image">
                  <img alt={company.title.en} src={company.thumbnail} />
                </div>
                <div className="home__companies-card-item-image-content">
                  <h3>{company.card_title.en}</h3>
                  <p>{company.card_paragraph.en}</p>
                </div>
              </Link>
            );
          })}
        </ul>

        <div
          data-sal="fade"
          data-sal-delay="200"
          className="home__companies-see-more"
        >
          <CustomButton text="See More" linkTo="/companies" />
        </div>
      </section>

      <section className="home__chairman max-w">
        <div
          className="home__chairman-image"
          data-sal="fade"
          data-sal-delay="200"
        >
          <img
            src={chairman.image_path}
            alt="Mr. Khalil Abbo Mirza. goran groups chairman"
          />
        </div>
        <div className="home__chairman-content">
          <span data-sal="fade" data-sal-delay="400">
            {chairman.sub_title.en}
          </span>
          <h1 data-sal="fade" data-sal-delay="500">
            {chairman.title.en}
          </h1>
          <p data-sal="fade" data-sal-delay="600">
            {chairman.paragraph.en}
          </p>
        </div>
      </section>

      <section
        className="home__stats"
        data-sal="fade"
        data-sal-delay="200"
        id="achievements"
      >
        <Stats />
      </section>

      <section className="home__partners side-padding" id="partners">
        <Partners />
      </section>
    </article>
  );
};

export default Home;
