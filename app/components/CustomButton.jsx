import classNames from "classnames";

const CustomButton = ({
  text = "",
  onClick = () => {},
  icon = undefined,
  className = "",
}) => {
  return (
    <button
      className={classNames(className, "button custom-button", {
        "custom-button--with-icon": icon,
      })}
      onClick={onClick}
    >
      <span className="custom-button__text">{text}</span>
      {icon}
    </button>
  );
};

export default CustomButton;
