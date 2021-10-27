import { useEffect, useRef } from "react";
import { Router } from "@reach/router";
import { gql, useQuery } from "@apollo/client";
import Main from "./Main";
import PodDetail from "./podDetail/PodDetail";
import Footer from "./footer/Footer";
import { useState } from "react";
import Login from "./login/Login";
import { exp } from "./cache";
import "./App.css";

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function App() {
  const dom = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (dom && dom.current) {
      exp.initExperience({ dom: dom.current });
      exp.initScroll();
    }
  }, [dom]);

  const { data } = useQuery(IS_LOGGED_IN);

  return (
    <>
      <div className="App">
        <main>
          <div className="scroll">
            {data.isLoggedIn ? (
              <Router>
                <Main path="/" />
                <PodDetail path="/pod/:podTitle" />
              </Router>
            ) : (
              <Login />
            )}
          </div>
          <Footer />
        </main>
      </div>
      <div id="sketch" ref={dom}></div>
    </>
  );
}

export default App;
