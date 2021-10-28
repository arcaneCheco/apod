import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

import { isLoggedInVar } from "../cache";

import "./Login.css";

export const LOGIN_USER = gql`
  mutation Login($username: String!) {
    login(username: $username) {
      id
      token
    }
  }
`;

const Login = () => {
  const [username, setUsername] = useState("");

  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted({ login }) {
      if (login) {
        localStorage.setItem("token", login.token as string);
        localStorage.setItem("userId", login.id as string);
        isLoggedInVar(true);
      }
    },
  });

  if (loading) {
    return <p>...loggin in</p>;
  }
  if (error) {
    return <p>An error occurred</p>;
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const username = (event.target as HTMLInputElement).value;
    setUsername(username);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({ variables: { username } });
  };

  return (
    <>
      <div className="login">
        <form onSubmit={(e) => onSubmit(e)} className="login-form">
          <input
            required
            type="text"
            name="username"
            placeholder="Enter username"
            data-testid="login-input"
            onChange={(e) => onChange(e)}
          />
          <button type="submit">Log in</button>
        </form>
      </div>
    </>
  );
};

export default Login;

// const Login = () => {
//   const [login, { loading, error }] = useMutation(LOGIN_USER, {
//     onCompleted(test) {
//       setTimeout(() => {
//         console.log(test);
//       }, 2000);
//       //   console.log(login, "login function");
//       //   if (login) {
//       //     console.log("TOKEN", login.token);
//       //     localStorage.setItem("token", login.token as string);
//       //     localStorage.setItem("userId", login.id as string);
//       //     isLoggedInVar(true);
//       //   }
//     },
//   });

//   if (loading) return <p>...loggin in</p>;
//   if (error) return <p>An error occurred</p>;

//   return <LoginForm login={login} />;
// };
