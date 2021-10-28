import { Link } from "@reach/router";
import LogoutButton from "../logoutButton/LogoutButton";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <div className="footer-container-inner">
          <Link className="footer-item" to="/">
            {/* <HomeIcon /> */}
            Home
          </Link>
          <Link className="footer-item" to="/saved">
            {/* <CartIcon /> */}
            Saved
          </Link>
          <LogoutButton />
        </div>
      </div>
    </>
  );
};

export default Footer;

// const MenuItem = styled(Link)({
//   textDecoration: "none",
//   flexGrow: 1,
//   width: 0,
//   fontFamily: "inherit",
//   fontSize: 20,
//   color: "inherit",
//   letterSpacing: 1.5,
//   textTransform: "uppercase",
//   textAlign: "center",
//   svg: {
//     display: "block",
//     width: 60,
//     margin: "0 auto 8px",
//     fill: "#14cbc4",
//   },
// });
