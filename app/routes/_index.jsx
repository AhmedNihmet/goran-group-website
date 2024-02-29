import * as Slider from "react-slick";
import { json, useLoaderData } from "@remix-run/react";

import homeStyles from "~/styles/pages/home.css";

import Play from "~/Icons/Play";

import CustomButton from "~/components/CustomButton";

import { buildUrl } from "~/api/config";
import { useRef } from "react";

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
};

/** @type {import("react-slick").Settings} */
const settingsThumbs = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  focusOnSelect: true, 
  swipeToSlide: true,
};

const Home = () => {
  const mainSliderRef = useRef(null);
  const loaderData = useLoaderData();

  console.log(loaderData);

  return (
    <article className="home">
      <SliderWrapper
        {...settingsMain}
        ref={mainSliderRef}
        className="slider-main"
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index}>
            <section className="home__hero-section">
              <div className="home__hero-background">
                <div className="home__hero-background-mask" />
                <img
                  src="/images/home/hero.jpg"
                  alt="Construction background"
                />
              </div>
              <div className="home__hero-content">
                <div className="home__hero-content-container max-w">
                  <h1 className="large-title">
                    Your Gateway to Excellence in Energy Power {index + 1}
                  </h1>
                  <p className="medium-paragraph">
                    Empowering the Future through Sustainable Energy Solutions,
                    Fueling Tomorrow Twice as Much.
                  </p>
                  <CustomButton text="see a video" icon={<Play />} />
                </div>
              </div>
            </section>
          </div>
        ))}
      </SliderWrapper>

      <section className="home__hero-thumbs">
        <SliderWrapper {...settingsThumbs} className="slider-nav">
          <div>
            <button className="button" onClick={() => mainSliderRef.current.slickGoTo(0)}>go to slide 1</button>
          </div>
          <div>
            <button className="button" onClick={() => mainSliderRef.current.slickGoTo(1)}>go to slide 2</button>
          </div>
          <div>
            <button className="button" onClick={() => mainSliderRef.current.slickGoTo(2)}>go to slide 3</button>
          </div>
          <div>
            <button className="button" onClick={() => mainSliderRef.current.slickGoTo(3)}>go to slide 4</button>
          </div>
        </SliderWrapper>
      </section>

      <div style={{ height: 600 }} />
    </article>
  );
};

export default Home;
