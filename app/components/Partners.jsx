import { useNavigate, useRouteLoaderData } from "@remix-run/react";

const Partners = () => {
  const navigate = useNavigate();

  const { partners } = useRouteLoaderData("root");

  return (
    <section className="partners">
      <div className="partners__content" data-sal="fade" data-sal-delay="200">
        <div className="partners__content-subtitle-container">
          <span>{partners?.sub_title?.en}</span>
          <hr />
        </div>
        <h3>{partners?.title?.en}</h3>
        <p>{partners?.paragraph?.en}</p>
      </div>

      <div className="partners__logo-container">
        {partners?.logos?.length > 0 &&
          partners?.logos?.map((logo, index) => {
            const delay = index * 50;

            return (
              // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
              <div
                key={logo.image_path}
                data-sal="fade"
                data-sal-delay={250 + delay}
                style={{ textAlign: "center" }}
                onClick={() => navigate(logo.redirects_to)}
              >
                <img src={logo.image_path} alt="Goran Groups Partner" />
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default Partners;
