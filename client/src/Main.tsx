import PodContainer from "./podContainer/PodContainer";
import { RouteComponentProps } from "@reach/router";

interface MaainProps extends RouteComponentProps {}
const Main: React.FC<MaainProps> = () => {
  return (
    // <main>
    //   <div className="scroll">
    <PodContainer />
    //   </div>
    // </main>
  );
};

export default Main;
