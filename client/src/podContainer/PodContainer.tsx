import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Pod from "../podTile/PodTile";
import "./PodContainer.css";

const ALL_PODS = gql`
  query AllPods {
    pods {
      title
      url
      explanation
    }
  }
`;

const PodContainer = () => {
  const { data, loading, error } = useQuery(ALL_PODS);
  if (loading) return <p>Loading</p>;
  if (error) return <p>error</p>;

  return (
    <>
      <div className="pod-container">
        {data.pods.map((pod: any, index: number) => (
          <Pod key={pod.title} pod={pod} odd={index % 2 === 1} />
        ))}
      </div>
    </>
  );
};

export default PodContainer;
