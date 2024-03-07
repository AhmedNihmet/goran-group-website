import classNames from "classnames";
import { Link } from "@remix-run/react";

const CustomButton = ({
  text = "",
  onClick = () => {},
  icon = undefined,
  className = "",
  linkTo = undefined,
}) => {
  if (linkTo)
    return (
      <Link
        to={linkTo}
        className={classNames(className, "custom-link", {
          "custom-link--with-icon": icon,
        })}
      >
        <span className="custom-link__text">{text}</span>
        {icon}
      </Link>
    );

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
