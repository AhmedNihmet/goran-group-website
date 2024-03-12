import sal from "sal.js";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import { json, redirect, useLoaderData } from "@remix-run/react";
import { Swiper, SwiperSlide } from "swiper/react";

import companyViewStyles from "~/styles/pages/company-view.css";

import Play from "~/Icons/Play";
import Indicator from "~/Icons/Indicator";

import CustomButton from "~/components/CustomButton";

import { buildUrl } from "~/api/config";

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

/**
 * @type {import("react-router").LoaderFunction}
 */
export const loader = async ({ request, params }) => {
  const url = buildUrl(request, "/data/companies.json");

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

  return (
    <article className="company-view">
      <section className="company-view__hero" data-sal="fade">
        <div className="company-view__hero-background">
          <div className="company-view__hero-background-mask" />
          <img src={data.hero_image} alt={data.title} />
        </div>
        <div className="company-view__hero-content">
          <div className="side-padding">
            <h1 data-sal="fade" data-sal-delay="200">
              {data.title}
            </h1>
            <p data-sal="fade" data-sal-delay="300">
              {data.paragraph}
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
                    <img src={service.image_path} alt={service.title} />
                  </div>
                  <div className="company-view__service-card-content">
                    <h3 data-sal="fade" data-sal-delay="300">
                      {service.title}
                    </h3>
                    <p data-sal="fade" data-sal-delay="300">
                      {service.description}
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
              {data.gallery.title}
            </h2>
            <p data-sal="fade" data-sal-delay="300">
              {data.gallery.paragraph}
            </p>
          </div>
          <div data-sal="fade" data-sal-delay="300">
            <Swiper
              loop
              modules={[Navigation]}
              className="company-view__slider"
              navigation={{
                nextEl: ".company-view__slider-action-button--next",
                prevEl: ".company-view__slider-action-button--prev",
              }}
            >
              {data.gallery.images.map((image, index) => (
                <SwiperSlide key={image} className="company-view__slider-card">
                  <div className="company-view__slider-card-image">
                    <img src={image} alt={`Gallery no.${index + 1}`} />
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
          </div>
        </section>
      )}
    </article>
  );
};

export default CompanyView;
