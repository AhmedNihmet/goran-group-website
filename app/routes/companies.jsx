import { Link } from "@remix-run/react";

import companiesStyles from "~/styles/pages/companies.css";

import Play from "~/Icons/Play";

import CustomButton from "~/components/CustomButton";
import MissionAndVision from "~/components/page/MissionAndVision";

/**
 * @returns {import("@remix-run/node").LinkDescriptor[]}
 */
export const links = () => [
  {
    rel: "stylesheet",
    href: companiesStyles,
  },
];

/**
 * @returns {import("@remix-run/node").MetaDescriptor[]}
 */
export const meta = () => {
  return [{ title: "Goran Group | Companies page" }];
};

const Companies = () => {
  return (
    <article className="companies">
      <section className="companies__hero">
        <div className="companies__hero-background">
          <div className="companies__hero-background-mask" />
          <img
            src="/images/companies/hero-bg.jpg"
            alt="Our Companies main background"
          />
        </div>
        <div className="companies__hero-content">
          <h1>our companies</h1>
          <p>
            United in Excellence, Goran Group thrives across diverse sectors,
            guided by visionary leadership. With a professional team and
            strategic decisions, we elevate benefits, fostering growth and
            innovation since 2005.
          </p>
          <CustomButton text="See our work" icon={<Play />} />
        </div>
      </section>

      <section className="companies__our-companies max-w">
        <div className="companies__our-companies-header">
          <h2>Embrace Your experience</h2>
          <p>
            United in Excellence, Goran Group thrives across diverse sectors,
            guided by visionary leadership. With a professional team and
            strategic
          </p>
        </div>
        <div className="companies__our-companies-list">
          {Array.from({ length: 10 }).map((_, index) => {
            return (
              <Link to={`/company/${index + 1}/view`} key={index} className="companies__our-companies-list-item">
                <div className="companies__our-companies-list-item-image">
                  <img
                    src="/images/companies/company-img-2.jpg"
                    alt="alt text"
                  />
                </div>
                <h5>FalconOil</h5>
                <p>
                  developing, producing and distributing high quality lubricants
                  and specialties for more than 40 years
                </p>
              </Link>
            );
          })}
        </div>
      </section> 

      <section className="companies__we-have-worked max-w">
        <div className="companies__we-have-worked-header">
          <h3>We’ve worked extensively in terms of geography </h3>
        </div>
        <p className="companies__we-have-worked-content">
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
          leadership. With a professional team and strategic decisions, we
          elevate benefits, fostering growth and innovation since 2005.
          <br />
          <br />
          Goran Group thrives across diverse sectors, guided by visionary
          leadership. With a professional team and strategic decisions, we
          elevate benefits, fostering growth and innovation since 2005. Goran
          Group thrives across diverse sectors, guided by visionary leadership
        </p>
      </section>

      
      <div className="max-w">
        <MissionAndVision />
      </div>
    </article>
  );
};

export default Companies;
