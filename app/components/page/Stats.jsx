import CountUp from "react-countup";
import { useRef, useEffect, useState } from "react";

const Stats = () => {
  const statsRef = useRef(null);
  
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, 200);
          observer.unobserve(statsRef.current);
        }
      },
      { threshold: 0.5 } // Adjust threshold as needed
    );

    observer.observe(statsRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="stats max-w" ref={statsRef}>
      <div className="stats__content">
        <span>Overview of our career</span>
        <h5>Quick Facts On Us</h5>
      </div>
      <ul className="stats__list">
        <li className="stats__list-item" data-sal="fade" data-sal-delay="200">
          <div className="stats__list-item-count-container">
            {isVisible && (
              <CountUp.default
                start={0}
                end={120}
                duration={3}
                className="stats__list-item-count"
              />
            )}
          </div>
          <span className="stats__list-item-count-title">Awards</span>
        </li>
        <li className="stats__list-item" data-sal="fade" data-sal-delay="300">
          <div className="stats__list-item-count-container">
            {isVisible && (
              <CountUp.default
                start={0}
                end={26000}
                duration={4}
                separator=","
                className="stats__list-item-count"
              />
            )}
            +
          </div>
          <span className="stats__list-item-count-title">
            Clients around the world
          </span>
        </li>
        <li className="stats__list-item" data-sal="fade" data-sal-delay="400">
          <div className="stats__list-item-count-container">
            {isVisible && (
              <CountUp.default
                start={0}
                end={400}
                duration={3}
                className="stats__list-item-count"
              />
            )}
          </div>
          <span className="stats__list-item-count-title">Employees</span>
        </li>
        <li className="stats__list-item" data-sal="fade" data-sal-delay="500">
          <div className="stats__list-item-count-container">
            {isVisible && (
              <CountUp.default
                start={0}
                end={6000}
                duration={3.5}
                className="stats__list-item-count"
              />
            )}
            +
          </div>
          <span className="stats__list-item-count-title">Projects</span>
        </li>
      </ul>
    </section>
  );
};

export default Stats;
