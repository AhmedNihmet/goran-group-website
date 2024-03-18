import classNames from "classnames";
import { useFetcher, useRouteLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";

import { LANGUAGES } from "~/utils/constants";

const LanguagePicker = ({ onTransparent = false, appearOnTop = false }) => {
  const fetcher = useFetcher();
  const menuRef = useRef(null);
  const { t } = useTranslation();
  const { locale } = useRouteLoaderData("root");

  const [isActive, setIsActive] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[1]);

  useEffect(() => {
    if (locale !== LANGUAGES[1].abbreviation) {
      let selectedLanguage = LANGUAGES.filter(
        (language) => language.abbreviation === locale
      )?.[0];
      setSelectedLanguage(selectedLanguage);
    }
  }, [locale]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target))
        setIsActive(false);
    };

    if (isActive) document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isActive]);

  return (
    <section
      ref={menuRef}
      className={classNames("language-picker", {
        "language-picker--active": isActive,
        "language-picker--transparent": onTransparent,
        "language-picker--open-upwards": appearOnTop,
      })}
    >
      <button
        onClick={() => setIsActive((prevState) => !prevState)}
        className="button language-picker__selected-language"
      >
        <img
          src={selectedLanguage.image_src}
          alt={selectedLanguage.image_alt}
        />
        <span>{t(selectedLanguage.title)}</span>
      </button>
      <ul className="language-picker__lists">
        {LANGUAGES.map((language) => (
          <fetcher.Form
            method="post"
            key={language.abbreviation}
            action={`/actions/change-languages?lng=${language.abbreviation}`}
          >
            <button
              className="button language-picker__list-item"
              onClick={() => (
                setSelectedLanguage(language), setIsActive(false)
              )}
            >
              <img src={language.image_src} alt={language.image_alt} />
              <span>{t(language.title)}</span>
            </button>
          </fetcher.Form>
        ))}
      </ul>
    </section>
  );
};

export default LanguagePicker;
