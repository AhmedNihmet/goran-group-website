import { useRouteLoaderData } from "@remix-run/react";
import { useMediaQuery } from "react-responsive";
import { useParallax } from "react-scroll-parallax";

const MissionAndVision = () => {
  const { vision_and_mission } = useRouteLoaderData("root");
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const visionParallax = useParallax({
    speed: isMobile ? 0 : -5,
  });
  const missionParallax = useParallax({
    speed: isMobile ? 0 : 5,
  });

  return (
    <section className="mission-and-vision">
      <div
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
          <h3>{vision_and_mission.mission.title.en}</h3>
          <p>{vision_and_mission.mission.paragraph.en}</p>
        </div>
      </div>
      <div
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
          <h3>{vision_and_mission.vision.title.en}</h3>
          <p>{vision_and_mission.vision.paragraph.en}</p>
        </div>
      </div>
    </section>
  );
};

export default MissionAndVision;
