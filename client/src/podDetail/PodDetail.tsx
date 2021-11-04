import { exp } from "../cache";
import { useEffect, useRef } from "react";
import { Link } from "@reach/router";
import { gql, useMutation } from "@apollo/client";
import { savedPodsVar } from "../cache";
import "./PodDetail.css";

// update cache stuff
// const GET_SAVED_PODS = gql`
//   query GetSavedPods {
//     userPods {
//       title
//       date
//       url
//     }
//   }
// `;

// client.query({ query: GET_SAVED_PODS }).then((res: any) => {
//   console.log(res);
//   savedPodsVar(res);
// });

// const GET_SAVED_PODS_FROM_CACHE = gql`
//   query GetSavedPodsFromCache {
//     savedPods @client
//   }
// `;

// client
//   .query({ query: GET_SAVED_PODS_FROM_CACHE })
//   .then((res) => console.log("from cahce: ", res));
//

export const ADD_POD = gql`
  mutation AddPod($POD: PODInput) {
    addPod(pod: $POD)
  }
`;

const PodDetail = ({ location }: any) => {
  const [addPod, { loading, error }] = useMutation(ADD_POD);

  const pod = location.state;
  const img = useRef<HTMLImageElement>(null);

  const clickHandler = async () => {
    await addPod({
      variables: {
        POD: { title: pod.title, date: pod.date, url: pod.url },
      },
    });

    const current = savedPodsVar();
    savedPodsVar([pod, ...current]);
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
