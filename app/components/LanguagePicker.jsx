import classNames from "classnames";
import { useState } from "react";

import { LANGUAGES } from "~/utils/constants";

const LanguagePicker = () => {
  const [isActive, setIsActive] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[1]);

  return (
    <section
      className={classNames("language-picker", {
        "language-picker--active": isActive,
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
