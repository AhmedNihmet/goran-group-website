const Stats = () => {
  return (
    <section className="stats max-w">
      <div className="stats__content">
        <span>Over view on our career</span>
        <h5>Quick Facts On Us</h5>
      </div>
      <ul className="stats__list">
        <li className="stats__list-item">
          <div className="stats__list-item-count">120+</div>
          <span>Awards</span>
        </li>
        <li className="stats__list-item">
          <div className="stats__list-item-count">26,000+</div>
          <span>Clients around the world</span>
        </li>
        <li className="stats__list-item">
          <div className="stats__list-item-count">400</div>
          <span>Employees</span>
        </li>
        <li className="stats__list-item">
          <div className="stats__list-item-count">6,000+</div>
          <span>Projects</span>
        </li>
      </ul>
    </section>
  );
};

export default Stats;
