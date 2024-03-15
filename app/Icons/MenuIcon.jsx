import { useLocation } from "@remix-run/react";
import classNames from "classnames";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

const MenuIcon = forwardRef(function MenuIcon(
  { onStateChange, isOnTransparent = true },
  ref
) {
  const { pathname, hash } = useLocation();

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    onStateChange(isActive);
  }, [isActive, onStateChange]);

  useEffect(() => {
    setIsActive(false);
  }, [pathname, hash]);

  useImperativeHandle(ref, () => ({
    closeMenu: () => setIsActive(false)
  }));

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={classNames("menu-icon", {
        "menu-icon--on-transparent-bg": isOnTransparent && !isActive,
      })}
      onClick={() => setIsActive((prevState) => !prevState)}
    >
      <svg>
        <defs>
          <filter id="gooeyness">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="2.2"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
              result="gooeyness"
            />
            <feComposite in="SourceGraphic" in2="gooeyness" operator="atop" />
          </filter>
        </defs>
      </svg>
      <div className="plates">
        <div className={classNames("plate plate5", { active: isActive })}>
          <svg
            className="burger"
            version="1.1"
            height="100"
            width="100"
            viewBox="0 0 100 100"
          >
            <path className="line line1" d="M 30,35 H 70 " />
            <path className="line line2" d="M 50,50 H 30 L 34,32" />
            <path className="line line3" d="M 50,50 H 70 L 66,68" />
            <path className="line line4" d="M 30,65 H 70 " />
          </svg>
          <svg
            className="x"
            version="1.1"
            height="100"
            width="100"
            viewBox="0 0 100 100"
          >
            <path className="line" d="M 34,32 L 66,68" />
            <path className="line" d="M 66,32 L 34,68" />
          </svg>
        </div>
      </div>
    </div>
  );
});

export default MenuIcon;
