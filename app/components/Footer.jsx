import { Link, useRouteLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";

import ArrowTop from "~/Icons/ArrowTop";
import MainLogo from "~/Icons/MainLogo";

import { NAVIGATION_LINKS } from "~/utils/constants";

const Footer = () => {
  const { t } = useTranslation();
  const { social_links } = useRouteLoaderData("root");

  return (
    <section className="footer">
      <div className="side-padding">
        <section className="footer__links-section">
          <ul className="footer__links">
            <span>{t("Specialization")}</span>
            <li className="footer__link-items">
              <Link to="?specialty=general-trading">
                {t("General Trading")}
              </Link>
            </li>
            <li className="footer__link-items">
              <Link to="?specialty=health-care">{t("Health Care")}</Link>
            </li>
            <li className="footer__link-items">
              <Link to="?specialty=oil-company">{t("Oil Company")}</Link>
            </li>
            <li className="footer__link-items">
              <Link to="?specialty=food-and-restaurants">
                {t("Food & Restaurants")}
              </Link>
            </li>
            <li className="footer__link-items">
              <Link to="?specialty=power-generators">
                {t("Power Generators")}
              </Link>
            </li>
            <li className="footer__link-items">
              <Link to="?specialty=general-constructions">
                {t("General Constructions")}
              </Link>
            </li>
          </ul>

          <ul className="footer__links">
            <span>{t("Links")}</span>
            {NAVIGATION_LINKS.map((link) => (
              <li className="footer__link-items" key={link.to}>
                <Link to={link.to}>{t(link.title)}</Link>
              </li>
            ))}
          </ul>

          <ul className="footer__links">
            <span>{t("Company")}</span>
            <li className="footer__link-items">
              <Link to="/about-us#specializations">{t("Specializations")}</Link>
            </li>
            <li className="footer__link-items">
              <Link to="/about-us#mission">{t("Our Mission")}</Link>
            </li>
            <li className="footer__link-items">
              <Link to="/about-us#vision">{t("Our Vision")}</Link>
            </li>
            <li className="footer__link-items">
              <Link to="/about-us#our-brands">{t("Our Brands")}</Link>
            </li>
          </ul>

          <div className="footer__links-end-section">
            <MainLogo width={195} height={76} />

            <div className="footer__links-end-section-phone-numbers" dir="ltr">
              <span>+964 (750) 777 7719</span> 
            </div>
          </div>
        </section>
        <section className="footer__social-sections">
          <div className="footer__social-first-part">
            <Link to="/#companies">{t("Companies")}</Link>
            <Link to="/#achievements">{t("Achievements")}</Link>
            <Link to="/#partners">{t("Partners")}</Link>
          </div>
          <div className="footer__social-middle-part">
            <button
              className="button footer__social-section-arrow"
              onClick={() =>
                typeof window !== "undefined" &&
                window?.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
            >
              <ArrowTop />
            </button>
          </div>
          <div className="footer__social-end-part">
            <Link target="_blank" rel="noreferrer" to={social_links.instagram}>
              {t("Instagram")}
            </Link>
            <Link target="_blank" rel="noreferrer" to={social_links.facebook}>
              {t("Facebook")}
            </Link>
            <Link target="_blank" rel="noreferrer" to={social_links.linked_in}>
              {t("LinkedIn")}
            </Link>
          </div>
        </section>
        <section className="footer__rights-section">
          <h4 className="footer__view-our-profile">
            <Link target="_blank" to="/images/about-us/goran-group-profile.pdf">
              {t("View")}
            </Link>
            <span> {t("or")} </span>
            <Link
              download
              target="_blank"
              to="/images/about-us/goran-group-profile.pdf"
            >
              {t("Download")}
            </Link>
            <span> {t("our profile")}</span>.
          </h4>
          <span>{t("RIGHTS RESERVED")}</span>
        </section>
      </div>
    </section>
  );
};

export default Footer;
