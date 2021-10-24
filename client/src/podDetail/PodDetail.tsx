import { exp } from "../cache";
import { useRef } from "react";
import "./PodDetail.css";

const PodDetail = ({ location }: any) => {
  const pod = location.state;
  const img = useRef<HTMLImageElement>(null);

  const initTransition = () => {};
  return (
    <>
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
            onLoad={initTransition}
          ></img>
        </div>
      </div>
    </>
  );
};

export default PodDetail;
