import { useEffect, useRef } from "react";
import { Router } from "@reach/router";
import Main from "./Main";
import PodDetail from "./podDetail/PodDetail";
import { exp } from "./cache";
import "./App.css";

function App() {
  const dom = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (dom && dom.current) {
      exp.initExperience({ dom: dom.current });
      exp.initScroll();
    }
  }, [dom]);

  return (
    <>
      <div className="App">
        <main>
          <div className="scroll">
            <Router>
              <Main path="/" />
              <PodDetail path="/pod/:podTitle" />
            </Router>
          </div>
        </main>
      </div>
      <div id="sketch" ref={dom}></div>
    </>
  );
}

export default App;
