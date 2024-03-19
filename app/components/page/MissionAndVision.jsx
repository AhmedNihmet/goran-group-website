import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { useParallax } from "react-scroll-parallax";
import { useRouteLoaderData } from "@remix-run/react";

const MissionAndVision = () => {
  const { i18n } = useTranslation()
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { vision_and_mission } = useRouteLoaderData("root");

  const visionParallax = useParallax({
    speed: isMobile ? 0 : -5,
  });
  const missionParallax = useParallax({
    speed: isMobile ? 0 : 5,
  });

  return (
    <section className="mission-and-vision">
      <div
        id="mission"
        className="mission-and-vision__card"
        data-sal="fade"
        data-sal-delay="200"
      >
        <div
          className="mission-and-vision__card-image"
          ref={visionParallax.ref}
        >
          <img
            alt="about us mission section img"
            src={vision_and_mission.mission.image_path}
          />
        </div>
        <div className="mission-and-vision__content">
          <h3>{vision_and_mission.mission.title[i18n.language]}</h3>
          <p>{vision_and_mission.mission.paragraph[i18n.language]}</p>
        </div>
      </div>
      <div
        id="vision"
        className="mission-and-vision__card"
        data-sal="fade"
        data-sal-delay="200"
      >
        <div
          className="mission-and-vision__card-image"
          ref={missionParallax.ref}
        >
          <img
            alt="about us vision section img"
            src={vision_and_mission.vision.image_path}
          />
        </div>
        <div className="mission-and-vision__content">
          <h3>{vision_and_mission.vision.title[i18n.language]}</h3>
          <p>{vision_and_mission.vision.paragraph[i18n.language]}</p>
        </div>
      </div>
    </section>
  );
};

export default MissionAndVision;
