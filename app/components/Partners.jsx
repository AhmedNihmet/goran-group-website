/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useTranslation } from "react-i18next";
import { useNavigate, useRouteLoaderData } from "@remix-run/react";

const Partners = () => {
  const navigate = useNavigate();

  const { i18n } = useTranslation();
  const { our_companies, our_partners } = useRouteLoaderData("root");
  return (
    <section className="partners-container">
      <section className="partners">
        <div className="partners__content" data-sal="fade" data-sal-delay="200">
          <div className="partners__content-subtitle-container">
            <span>{our_companies.sub_title[i18n.language]}</span>
            <hr />
          </div>
          <h3>{our_companies.title[i18n.language]}</h3>
          <p>{our_companies.paragraph[i18n.language]}</p>
        </div>

        <div className="partners__logo-container">
          {our_companies.logos?.length > 0 &&
            our_companies.logos?.map((logo, index) => {
              const delay = index * 50;

              return (
                <div
                  key={logo.image_path}
                  data-sal="fade"
                  data-sal-delay={250 + delay}
                  style={{ textAlign: "center" }}
                  onClick={() => navigate(logo.redirects_to)}
                >
                  {logo.image_path && (
                    <img src={logo.image_path} alt="Goran Groups Companies" />
                  )}
                </div>
              );
            })}
        </div>
      </section>

      <section className="partners partners--the-second">
        <div className="partners__content" data-sal="fade" data-sal-delay="200">
          <div className="partners__content-subtitle-container">
            <span>{our_partners.sub_title[i18n.language]}</span>
          </div>
          <h3>{our_partners.title[i18n.language]}</h3>
          <p>{our_partners.paragraph[i18n.language]}</p>
        </div>

        <div className="partners__logo-container">
          {our_partners.logos?.length > 0 &&
            our_partners.logos?.map((logo, index) => {
              const delay = index * 50;

              return (
                <div
                  key={logo.image_path}
                  data-sal="fade"
                  data-sal-delay={250 + delay}
                  style={{ textAlign: "center" }}
                  onClick={() =>
                    logo.redirects_to ? navigate(logo.redirects_to) : {}
                  }
                >
                  {logo.image_path && (
                    <img
                      src={logo.image_path}
                      alt="Goran Groups Partner"
                      style={{
                        cursor: !logo.redirects_to ? "default" : "pointer",
                      }}
                    />
                  )}
                </div>
              );
            })}
        </div>
      </section>
    </section>
  );
};

export default Partners;
