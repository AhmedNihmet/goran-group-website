import CountUp from "react-countup";

import { useTranslation } from "react-i18next";
import { useRef, useEffect, useState } from "react";
import { useRouteLoaderData } from "@remix-run/react";

const Stats = () => {
  const statsRef = useRef(null);

  const { i18n } = useTranslation()
  const { statistics } = useRouteLoaderData("root");

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
        <span>{statistics.sub_title[i18n.language]}</span>
        <h5>{statistics.title[i18n.language]}</h5>
      </div>
      <ul className="stats__list">
        <li className="stats__list-item" data-sal="fade" data-sal-delay="200">
          <div className="stats__list-item-count-container">
            {isVisible && (
              <CountUp.default
                start={0}
                end={statistics.award.number}
                duration={3}
                className="stats__list-item-count"
              />
            )}
          </div>
          <span className="stats__list-item-count-title">
            {statistics.award.title[i18n.language]}
          </span>
        </li>
        <li className="stats__list-item" data-sal="fade" data-sal-delay="300">
          <div className="stats__list-item-count-container">
            {isVisible && (
              <CountUp.default
                start={0}
                end={statistics.clients.number}
                duration={4}
                separator=","
                className="stats__list-item-count"
              />
            )}
            {statistics.clients.prefix}
          </div>
          <span className="stats__list-item-count-title">
            {statistics.clients.title[i18n.language]}
          </span>
        </li>
        <li className="stats__list-item" data-sal="fade" data-sal-delay="400">
          <div className="stats__list-item-count-container">
            {isVisible && (
              <CountUp.default
                start={0}
                end={statistics.employees.number}
                duration={3}
                className="stats__list-item-count"
              />
            )}
          </div>
          <span className="stats__list-item-count-title">
            {statistics.employees.title[i18n.language]}
          </span>
        </li>
        <li className="stats__list-item" data-sal="fade" data-sal-delay="500">
          <div className="stats__list-item-count-container">
            {isVisible && (
              <CountUp.default
                start={0}
                end={statistics.projects.number}
                duration={3.5}
                className="stats__list-item-count"
              />
            )}
            {statistics.projects.prefix}
          </div>
          <span className="stats__list-item-count-title">
            {statistics.projects.title[i18n.language]}
          </span>
        </li>
      </ul>
    </section>
  );
};

export default Stats;
