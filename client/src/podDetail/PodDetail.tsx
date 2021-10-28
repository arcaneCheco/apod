import { exp } from "../cache";
import { useEffect, useRef } from "react";
import { Link } from "@reach/router";
import { gql, useMutation } from "@apollo/client";
import "./PodDetail.css";

export const ADD_POD = gql`
  mutation AddPod($POD: PODInput) {
    addPod(pod: $POD)
  }
`;

const PodDetail = ({ location }: any) => {
  const [addPod, { loading, error }] = useMutation(ADD_POD);

  const pod = location.state;
  const img = useRef<HTMLImageElement>(null);

  const clickHandler = () => {
    addPod({
      variables: {
        POD: { title: pod.title, date: pod.date, url: pod.url },
      },
    });
  };

  const initTransition = () => {
    exp.world.imagesHandler.currentView = "detail";
    exp.world.imagesHandler.doTransition(img.current);
  };
  return (
    <>
      <Link to="/">BACK</Link>
      <button onClick={clickHandler}>save pod</button>
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
      </div>
    </>
  );
};

export default PodDetail;
