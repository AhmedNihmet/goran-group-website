import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

import { LANGUAGES } from "~/utils/constants";

const LanguagePicker = ({ onTransparent = false, appearOnTop = false }) => {
  const menuRef = useRef(null);

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
        <span>{selectedLanguage.title}</span>
      </button>
      <ul className="language-picker__lists">
        {LANGUAGES.map((language) => (
          <button
            key={language.key}
            className="button language-picker__list-item"
            onClick={() => (setSelectedLanguage(language), setIsActive(false))}
          >
            <img src={language.image_src} alt={language.image_alt} />
            <span>{language.title}</span>
          </button>
        ))}
      </ul>
    </section>
  );
};

export default LanguagePicker;
