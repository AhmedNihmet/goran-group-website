import { useParallax } from "react-scroll-parallax";

const MissionAndVision = () => {
  const visionParallax = useParallax({
    speed: -5,
  });
  const missionParallax = useParallax({
    speed: 5,
  });

  return (
    <section className="mission-and-vision">
      <div
        className="mission-and-vision__card"
        data-sal="fade"
        data-sal-delay="200"
      >
        <div className="mission-and-vision__card-image" ref={visionParallax.ref}>
          <img
            alt="about us mission section img"
            src="/images/about-us/mission-and-vision/mission.jpg"
          />
        </div>
        <div className="mission-and-vision__content">
          <h3>OUR MISSION</h3>
          <p>
            United in Excellence, Goran Group thrives across diverse sectors,
            guided by visionary leadership. With a professional team and
            strategic decisions, we elevate benefits, fostering growth and
            innovation since 2005.United in Excellence, Goran Group thrives
            across diverse sectors, guided by visionary leadership. With a
            professional team and strategic decisions, we elevate benefits,
            fostering growth and innovation since 2005.
          </p>
        </div>
      </div>
      <div
        className="mission-and-vision__card"
        data-sal="fade"
        data-sal-delay="200"
      >
        <div className="mission-and-vision__card-image" ref={missionParallax.ref}>
          <img
            alt="about us vision section img"
            src="/images/about-us/mission-and-vision/vision.jpg"
          />
        </div>
        <div className="mission-and-vision__content">
          <h3>OUR VISION</h3>
          <p>
            United in Excellence, Goran Group thrives across diverse sectors,
            guided by visionary leadership. With a professional team and
            strategic decisions, we elevate benefits, fostering growth and
            innovation since 2005.United in Excellence, Goran Group thrives
            across diverse sectors, guided by visionary leadership. With a
            professional team and strategic decisions, we elevate benefits,
            fostering growth and innovation since 2005.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionAndVision;
