import { useMemo } from "react";
import classNames from "classnames";
import { Link, useLocation } from "@remix-run/react";

import MainLogo from "~/Icons/MainLogo";
import MainLogoWhite from "~/Icons/MainLogoWhite";

import LanguagePicker from "~/components/LanguagePicker";

import { NAVIGATION_LINKS } from "~/utils/constants";

const Navbar = () => {
  const { pathname } = useLocation();

  const prepareNavbarsTransparentState = useMemo(() => {
    const isCurrentPageAboutUs = pathname.includes("/about-us");
    const isCurrentPageCompanyView =
      pathname.includes("/company") && pathname.includes("/view");
    if (isCurrentPageAboutUs || isCurrentPageCompanyView) return true;

    return false;
  }, [pathname]);

  return (
    <nav
      data-sal="fade"
      className={classNames("navbar", {
        "navbar--transparent": prepareNavbarsTransparentState,
      })}
    >
      <section className="navbar__container side-padding">
        <div className="navbar__logo-container">
          <Link to="/">
            {prepareNavbarsTransparentState ? <MainLogoWhite /> : <MainLogo />}
          </Link>
        </div>
        <div className="navbar__line" />
        <ul className="navbar__links">
          {NAVIGATION_LINKS.map((link) => (
            <li
              key={link.to}
              className={classNames("navbar__link-item", {
                "navbar__link-item--active":
                  link.to === pathname ||
                  pathname.includes(link?.sub_children_key),
              })}
            >
              <Link to={link.to}>{link.title}</Link>
            </li>
          ))}
        </ul>
        <div className="navbar__actions">
          <LanguagePicker onTransparent={prepareNavbarsTransparentState} />
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
