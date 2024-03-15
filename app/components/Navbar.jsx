import classNames from "classnames";
import { useMemo, useState } from "react";
import { Link, useLocation } from "@remix-run/react";

import MainLogo from "~/Icons/MainLogo";
import MenuIcon from "~/Icons/MenuIcon";
import Facebook from "~/Icons/social/Facebook";
import Instagram from "~/Icons/social/Instagram";
import LinkedIn from "~/Icons/social/LinkedIn";
import MainLogoWhite from "~/Icons/MainLogoWhite";

import LanguagePicker from "~/components/LanguagePicker";

import { MOBILE_NAVIGATION_LINKS, NAVIGATION_LINKS } from "~/utils/constants";

const Navbar = () => {
  const { pathname } = useLocation();

  const [isMenuActive, setIsMenuActive] = useState(false);

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
            {prepareNavbarsTransparentState && !isMenuActive ? (
              <MainLogoWhite />
            ) : (
              <MainLogo />
            )}
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
        <div className="navbar__menu-icon">
          <MenuIcon
            onStateChange={setIsMenuActive}
            isOnTransparent={prepareNavbarsTransparentState}
          />
        </div>
        <div
          className={classNames("navbar__menu", {
            "navbar__menu--active": isMenuActive,
          })}
        >
          <div className="navbar__menu-mask" />
          <div className="navbar__menu-content">
            <ul className="navbar__menu-links">
              {MOBILE_NAVIGATION_LINKS.map((link) => {
                return (
                  <li
                    key={link.to}
                    className={classNames("navbar__menu-link-item", {
                      "navbar__menu-link-item--active":
                        link.to === pathname ||
                        pathname.includes(link?.sub_children_key),
                    })}
                  >
                    <Link to={link.to}>{link.title}</Link>
                  </li>
                );
              })}
            </ul>
            <div className="navbar__menu-end-section">
              <div className="navbar__menu-social">
                <Link className="navbar__menu-social-item">
                  <Facebook width={28} height={28} />
                </Link>
                <Link className="navbar__menu-social-item">
                  <Instagram width={23} height={23} />
                </Link>
                <Link className="navbar__menu-social-item">
                  <LinkedIn width={32} height={32} />
                </Link>
              </div>
              <div className="navbar__menu-language-picker">
                <LanguagePicker appearOnTop />
              </div>
            </div>
          </div>
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
