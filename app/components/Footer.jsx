import { Link } from "@remix-run/react";

import ArrowTop from "~/Icons/ArrowTop";
import MainLogo from "~/Icons/MainLogo";

import { NAVIGATION_LINKS } from "~/utils/constants";

const Footer = () => {
  return (
    <section className="footer" data-sal="fade" data-sal-delay="200">
      <div className="side-padding">
        <section className="footer__links-section">
          <ul className="footer__links">
            <span>Specialization</span>
            <li className="footer__link-items">
              <Link>General Trading</Link>
            </li>
            <li className="footer__link-items">
              <Link>Health Care</Link>
            </li>
            <li className="footer__link-items">
              <Link>Oil Company</Link>
            </li>
            <li className="footer__link-items">
              <Link>Food & Restaurants</Link>
            </li>
            <li className="footer__link-items">
              <Link>Power Generators</Link>
            </li>
            <li className="footer__link-items">
              <Link>General Constructions</Link>
            </li>
          </ul>

          <ul className="footer__links">
            <span>Links</span>
            {NAVIGATION_LINKS.map((link) => (
              <li className="footer__link-items" key={link.to}>
                <Link to={link.to}>{link.title}</Link>
              </li>
            ))}
          </ul>

          <ul className="footer__links">
            <span>Company</span>
            <li className="footer__link-items">
              <Link>About Us</Link>
            </li>
            <li className="footer__link-items">
              <Link>Specializations</Link>
            </li>
            <li className="footer__link-items">
              <Link>Our Mission</Link>
            </li>
            <li className="footer__link-items">
              <Link>Our Vision</Link>
            </li>
            <li className="footer__link-items">
              <Link>Our Brands</Link>
            </li>
          </ul>

          <div className="footer__links-end-section">
            <MainLogo width={195} height={76} />

            <div className="footer__links-end-section-phone-numbers">
              <span>+964 (750) 200 4000</span>
              <span>+964 (750) 200 3000</span>
            </div>
          </div>
        </section>
        <section className="footer__social-sections">
          <div className="footer__social-first-part">
            <Link>Achievements</Link>
            <Link>Careers</Link>
            <Link>Partners</Link>
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
            <Link>Instagram</Link>
            <Link>Facebook</Link>
            <Link>LinkedIn</Link>
          </div>
        </section>
        <section className="footer__rights-section">
          <span>©2023 GORAN gROUP cO. ALL RIGHTS RESERVED.</span>
        </section>
      </div>
    </section>
  );
};

export default Footer;
