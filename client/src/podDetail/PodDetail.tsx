import { exp } from "../cache";
import { useRef } from "react";
import { Link } from "@reach/router";
import "./PodDetail.css";

const PodDetail = ({ location }: any) => {
  const pod = location.state;
  const img = useRef<HTMLImageElement>(null);

  const initTransition = () => {
    exp.world.imagesHandler.currentView = "detail";
    exp.world.imagesHandler.doTransition(img.current);
  };
  return (
    <>
      <Link to="/">BACK</Link>
      <div className="pod-detail">
        <div className="pod-description">
          <h2>{pod.title}</h2>
          <p>{pod.explanation}</p>
        </div>
        <div>
          <img
            src={pod.url}
            alt={pod.title}
            ref={img}
            // onLoad={initTransition}
          ></img>
        </div>
        {/* <Link to="/">BACK</Link> */}
      </div>
    </>
  );
};

export default PodDetail;
