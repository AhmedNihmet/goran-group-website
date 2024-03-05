import classNames from "classnames";
import { useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import companyViewStyles from "~/styles/pages/company-view.css";

import Play from "~/Icons/Play";
import Indicator from "~/Icons/Indicator";

import CustomButton from "~/components/CustomButton";

/**
 * @returns {import("@remix-run/node").LinkDescriptor[]}
 */
export const links = () => [
  {
    rel: "stylesheet",
    href: companyViewStyles,
  },
];

/**
 * @returns {import("@remix-run/node").MetaDescriptor[]}
 */
export const meta = () => {
  return [{ title: "Goran Group | Company details page" }];
};

const CompanyView = () => {
  const [isSliderControlActive, setIsSliderControlActive] = useState(null);

  useEffect(() => {
    if (isSliderControlActive !== null)
      setTimeout(() => {
        setIsSliderControlActive(null);
      }, 300);
  }, [isSliderControlActive]);

  const services = [
    {
      key: 1,
      title: "Efficient Energy Solutions",
      description:
        "Our tailored energy solutions focus on optimizing efficiency, reducing consumption, and enhancing sustainability. From cutting-edge technologies to personalized energy audits, we provide innovative strategies to streamline your",
      image_path: "/images/company/falkonoil/service-1.jpg",
    },
    {
      key: 2,
      title: "24/7 Customer Support",
      description:
        "Our tailored energy solutions focus on optimizing efficiency, reducing consumption, and enhancing sustainability. From cutting-edge technologies to personalized energy audits, we provide innovative strategies to streamline your",
      image_path: "/images/company/falkonoil/service-2.jpg",
    },
    {
      key: 3,
      title: "Equipment Rental Services",
      description:
        "Our tailored energy solutions focus on optimizing efficiency, reducing consumption, and enhancing sustainability. From cutting-edge technologies to personalized energy audits, we provide innovative strategies to streamline your",
      image_path: "/images/company/falkonoil/service-3.jpg",
    },
  ];

  return (
    <article className="company-view">
      <section className="company-view__hero">
        <div className="company-view__hero-background">
          <div className="company-view__hero-background-mask" />
          <img
            src="/images/home/hero-slider/oil-company.jpg"
            alt="Company main background"
          />
        </div>
        <div className="company-view__hero-content">
          <div className="side-padding">
            <h1>FalconOil</h1>
            <p>
              Empowering the Future through Sustainable Energy Solutions,
              Fueling Tomorrow Twice as Much.
            </p>
            <CustomButton text="See our work" icon={<Play />} />
          </div>
        </div>
      </section>

      <section className="company-view__services">
        <ul className="company-view__service-list">
          {services.map((service) => (
            <li key={service.key} className="company-view__service-card">
              <div className="company-view__service-card-container max-w">
                <div className="company-view__service-card-image">
                  <img src={service.image_path} alt={service.title} />
                </div>
                <div className="company-view__service-card-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="company-view__slider-section side-padding">
        <div className="company-view__slider-section-header">
          <h2>Powering Progress, Fueling Tomorrow</h2>
          <p>
            Accelerating innovation and sustainability, our commitment runs deep
            in every drop, propelling a future defined by progress and
            environmental responsibility.
          </p>
        </div>
        <Swiper
          loop
          modules={[Navigation]}
          className="company-view__slider"
          navigation={{
            nextEl: ".company-view__slider-action-button--next",
            prevEl: ".company-view__slider-action-button--prev",
          }}
        >
          {Array.from({ length: 2 }).map((_, index) => (
            <SwiperSlide key={index} className="company-view__slider-card">
              <div className="company-view__slider-card-image">
                <img
                  alt="slider 1"
                  src={`/images/company/falkonoil/slider-${index + 1}.jpg`}
                />
              </div>
            </SwiperSlide>
          ))}
          <div className="company-view__slider-card-content">
            <div className="company-view__slider-card-details">
              <span>Gallery</span>
              <h5>Falkonoil</h5>
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
                  <Indicator width={18} height={18} />
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
                  <Indicator width={18} height={18} />
                </div>
              </button>
            </div>
          </div>
        </Swiper>
      </section>
    </article>
  );
};

export default CompanyView;
