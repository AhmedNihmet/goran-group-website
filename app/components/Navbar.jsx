import { Link, useLocation } from "@remix-run/react";
import classNames from "classnames";

import MainLogo from "~/Icons/MainLogo";

import { NAVIGATION_LINKS } from "~/utils/constants";
import LanguagePicker from "./LanguagePicker";

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <section className="navbar__container max-w">
        <div className="navbar__logo-container">
          <Link to="/">
            <MainLogo />
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
          <LanguagePicker />
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
