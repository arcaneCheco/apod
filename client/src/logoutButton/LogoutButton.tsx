import { useApolloClient } from "@apollo/client";
import { isLoggedInVar } from "../cache";

const LogoutButton = () => {
  const client = useApolloClient();
  return (
    <button
      onClick={() => {
        // Evict and garbage-collect the cached user object
        client.cache.evict({ fieldName: "me" });
        client.cache.gc();
        // Remove user details from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        // Set the logged-in status to false
        isLoggedInVar(false);
      }}
    >
      Log-out
    </button>
  );
};

export default LogoutButton;
