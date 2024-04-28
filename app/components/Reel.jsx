/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import classNames from "classnames";
import ReactPlayer from "react-player";

import CloseIcon from "~/Icons/CloseIcon";

import useWindowAvailable from "~/utils/hooks/useWindows";

const Reel = ({ state = "idle", reelUrl, onCloseClicked }) => {
  const { isWindowAvailable } = useWindowAvailable();

  if (!isWindowAvailable || !reelUrl) return null;

  return (
    <section
      className={classNames("play-reel", {
        "play-reel--active": state === "active",
      })}
    >
      <section className="play-reel__mask" />
      <section
        className="play-reel__body side-padding"
      >
        <section
          className="play-reel__close-action-wrapper"
          onClick={() => onCloseClicked()}
        >
          <CloseIcon width={40} height={40} />
        </section>
        <section className="play-reel__video-wrapper">
          <ReactPlayer.default
            playsinline
            url={reelUrl}
            controls={true}
            width="100%"
            height="100%"
            playing={state === "active"}
          />
        </section>
      </section>
    </section>
  );
};

export default Reel;
