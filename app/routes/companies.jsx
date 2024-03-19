import sal from "sal.js";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Link,
  json,
  useLoaderData,
  useRouteLoaderData,
  useSearchParams,
} from "@remix-run/react";

import companiesStyles from "~/styles/pages/companies.css";
import mediaQueryStyles from "~/styles/media-queries.css";

import Play from "~/Icons/Play";

import CustomButton from "~/components/CustomButton";
import MissionAndVision from "~/components/page/MissionAndVision";

import { buildUrl } from "~/api/config";

/**
 * @returns {import("@remix-run/node").LinkDescriptor[]}
 */
export const links = () => [
  {
    rel: "stylesheet",
    href: companiesStyles,
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
  return [{ title: "Goran Group | Companies page" }];
};

/**
 * @type {import("react-router").LoaderFunction}
 */
export const loader = async ({ request }) => {
  const url = buildUrl(request, "/data/companies.json");

  const res = await fetch(url);

  const body = await res.json();

  return json(body);
};

const Companies = () => {
  const { i18n } = useTranslation()
  const { companies } = useRouteLoaderData("root");
  const { hero, companies_header, we_work } = useLoaderData();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    sal({
      threshold: 0.5,
    });
  }, []);

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
    <article className="companies">
      <section className="companies__hero">
        <div className="companies__hero-background" data-sal="fade">
          <div className="companies__hero-background-mask" />
          <img src={hero.image_path} alt="Our Companies main background" />
        </div>
        <div className="companies__hero-content">
          <h1 data-sal="fade" data-sal-delay="200">
            {hero.title[i18n.language]}
          </h1>
          <p data-sal="fade" data-sal-delay="300">
            {hero.paragraph[i18n.language]}
          </p>
          <div data-sal="fade" data-sal-delay="500">
            {hero?.video_path && (
              <CustomButton
                icon={<Play />}
                text={hero.video_button_title[i18n.language]}
                onClick={() => playVideo(hero.video_path)}
              />
            )}
          </div>
        </div>
      </section>

      <section className="companies__our-companies max-w">
        <div className="companies__our-companies-header">
          <h2 data-sal="fade">{companies_header.title[i18n.language]}</h2>
          <p data-sal="fade" data-sal-delay="100">
            {companies_header.paragraph[i18n.language]}
          </p>
        </div>
        <div
          className="companies__our-companies-list"
          data-sal="fade"
          data-sal-delay="100"
        >
          {companies.map((company, index) => {
            const delay = index * 50;

            return (
              <Link
                data-sal="fade"
                data-sal-delay={200 + delay}
                key={company.slug}
                to={`/company/${company.slug}/view`}
                className="companies__our-companies-list-item"
              >
                <div className="companies__our-companies-list-item-image">
                  <img alt={company.title[i18n.language]} src={company.thumbnail} />
                </div>
                <h5>{company.card_title[i18n.language]}</h5>
                <p>{company.card_paragraph[i18n.language]}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="companies__we-have-worked max-w">
        <div className="companies__we-have-worked-header">
          <h3 data-sal="fade" data-sal-delay="100">
            {we_work.title[i18n.language]}
          </h3>
        </div>
        <p
          className="companies__we-have-worked-content"
          data-sal="fade"
          data-sal-delay="100"
        >
          {we_work.paragraphs.map((paragraph, index) => {
            const delay = 200 + index * 100;

            return (
              <span key={index} data-sal="fade" data-sal-delay={delay}>
                {paragraph[i18n.language]}
              </span>
            );
          })}
        </p>
      </section>

      <div className="max-w">
        <MissionAndVision />
      </div>
    </article>
  );
};

export default Companies;
