import classNames from "classnames";
import { Link, useLocation } from "@remix-run/react";

import MainLogo from "~/Icons/MainLogo";

import LanguagePicker from "~/components/LanguagePicker";

import { NAVIGATION_LINKS } from "~/utils/constants";
import MainLogoWhite from "~/Icons/MainLogoWhite";

const Navbar = () => {
  const { pathname } = useLocation();

  const isCurrentPageAboutUs = pathname.includes("/about-us")

  return (
    <nav className={classNames("navbar", {
      "navbar--transparent": isCurrentPageAboutUs
    })}>
      <section className="navbar__container side-padding">
        <div className="navbar__logo-container">
          <Link to="/">
            {isCurrentPageAboutUs ? <MainLogoWhite /> : <MainLogo />}
            
          </Link>
        </div>
        <div className="navbar__line" />
        <ul className="navbar__links">
          {NAVIGATION_LINKS.map((link) => (
            <li
              key={link.to}
              className={classNames("navbar__link-item", {
                "navbar__link-item--active": link.to === pathname,
              })}
            >
              <Link to={link.to}>{link.title}</Link>
            </li>
          ))}
        </ul>
        <div className="navbar__actions">
          <LanguagePicker onTransparent={isCurrentPageAboutUs} />
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
