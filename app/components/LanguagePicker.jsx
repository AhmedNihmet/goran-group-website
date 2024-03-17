import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { LANGUAGES } from "~/utils/constants";

const LanguagePicker = ({ onTransparent = false, appearOnTop = false }) => {
  const menuRef = useRef(null);
  const { t, i18n } = useTranslation();

  const [isActive, setIsActive] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[1]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target))
        setIsActive(false);
    };

    if (isActive) document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isActive]);

  useEffect(() => {
    if (Object.keys(selectedLanguage).length > 0)
      localStorage.setItem("language", selectedLanguage.abbreviation);
  }, [selectedLanguage]);

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
          <button
            key={language.abbreviation}
            className="button language-picker__list-item"
            onClick={() => (
              i18n.changeLanguage(language.abbreviation),
              setSelectedLanguage(language),
              setIsActive(false)
            )}
          >
            <img src={language.image_src} alt={language.image_alt} />
            <span>{t(language.title)}</span>
          </button>
        ))}
      </ul>
    </section>
  );
};

export default LanguagePicker;
