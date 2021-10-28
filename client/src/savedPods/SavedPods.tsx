import { gql, useQuery, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import "./SavedPods.css";

export const GET_SAVED_PODS = gql`
  query GetSavedPods {
    userPods {
      title
      date
      url
    }
  }
`;

interface SavedPodsProps extends RouteComponentProps {}
const SavedPods: React.FC<SavedPodsProps> = () => {
  const { data, loading, error } = useQuery(GET_SAVED_PODS);
  useEffect(() => {
    console.log("savedPods: ", data);
  }, [data]);
  if (loading) return <p>Loading</p>;
  if (error) return <p>error</p>;

  return (
    <>
      {data.userPods.map((pod: any) => {
        return (
          <div key={pod.title}>
            <div>{pod.title}</div>
            <img src={pod.url}></img>
          </div>
        );
      })}
    </>
  );
};

export default SavedPods;
