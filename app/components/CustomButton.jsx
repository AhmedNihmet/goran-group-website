import classNames from "classnames";
import { Link } from "@remix-run/react";

const CustomButton = ({
  text = "",
  onClick = () => {},
  icon = undefined,
  className = "",
  linkTo = undefined,
  secondary = false,
  downloadable = false,
  target = "_self"
}) => {
  if (linkTo)
    return (
      <Link
        to={linkTo}
        rel="noreferrer"
        target={target}
        download={downloadable}
        className={classNames(className, "custom-link", {
          "custom-link--with-icon": icon,
          "custom-link--secondary": secondary,
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
        "custom-button--secondary": secondary,
      })}
      onClick={onClick}
    >
      <span className="custom-button__text">{text}</span>
      {icon}
    </button>
  );
};

export default CustomButton;
