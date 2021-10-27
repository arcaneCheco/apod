import PodContainer from "./podContainer/PodContainer";
import { RouteComponentProps } from "@reach/router";

interface MainProps extends RouteComponentProps {}
const Main: React.FC<MainProps> = () => {
  return (
    // <main>
    //   <div className="scroll">
    <PodContainer />
    //   </div>
    // </main>
  );
};

export default Main;
