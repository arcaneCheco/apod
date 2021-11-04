import { savedPodsVar } from "../cache";
import { RouteComponentProps } from "@reach/router";
import "./SavedPods.css";

interface SavedPodsProps extends RouteComponentProps {}

const SavedPods: React.FC<SavedPodsProps> = () => {
  return (
    <>
      {savedPodsVar().map((pod: any) => {
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
