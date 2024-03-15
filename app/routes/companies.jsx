import sal from "sal.js";
import { useEffect } from "react";
import { Link, json, useLoaderData } from "@remix-run/react";

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

  const { companies } = await res.json();

  return json({ companies });
};

const Companies = () => {
  const { companies } = useLoaderData();

  useEffect(() => {
    sal({
      threshold: 0.5,
    });
  }, []);

  return (
    <article className="companies">
      <section className="companies__hero">
        <div className="companies__hero-background" data-sal="fade">
          <div className="companies__hero-background-mask" />
          <img
            src="/images/companies/hero-bg.jpg"
            alt="Our Companies main background"
          />
        </div>
        <div className="companies__hero-content">
          <h1 data-sal="fade" data-sal-delay="200">
            our companies
          </h1>
          <p data-sal="fade" data-sal-delay="300">
            United in Excellence, Goran Group thrives across diverse sectors,
            guided by visionary leadership. With a professional team and
            strategic decisions, we elevate benefits, fostering growth and
            innovation since 2005.
          </p>
          <div data-sal="fade" data-sal-delay="500">
            <CustomButton text="See our work" icon={<Play />} />
          </div>
        </div>
      </section>

      <section className="companies__our-companies max-w">
        <div className="companies__our-companies-header">
          <h2 data-sal="fade">Embrace Your experience</h2>
          <p data-sal="fade" data-sal-delay="100">
            United in Excellence, Goran Group thrives across diverse sectors,
            guided by visionary leadership. With a professional team and
            strategic
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
                  <img alt={company.title} src={company.thumbnail} />
                </div>
                <h5>{company.card_title}</h5>
                <p>{company.card_paragraph}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="companies__we-have-worked max-w">
        <div className="companies__we-have-worked-header">
          <h3 data-sal="fade" data-sal-delay="100">
            We’ve worked extensively in terms of geography{" "}
          </h3>
        </div>
        <p
          className="companies__we-have-worked-content"
          data-sal="fade"
          data-sal-delay="100"
        >
          <span data-sal="fade" data-sal-delay="200">
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
          <span data-sal="fade" data-sal-delay="300">
            Goran Group thrives across diverse sectors, guided by visionary
            leadership. With a professional team and strategic decisions, we
            elevate benefits, fostering growth and innovation since 2005.
          </span>
          <br />
          <br />
          <span data-sal="fade" data-sal-delay="400">
            Goran Group thrives across diverse sectors, guided by visionary
            leadership. With a professional team and strategic decisions, we
            elevate benefits, fostering growth and innovation since 2005. Goran
            Group thrives across diverse sectors, guided by visionary leadership
          </span>
        </p>
      </section>

      <div className="max-w">
        <MissionAndVision />
      </div>
    </article>
  );
};

export default Companies;
