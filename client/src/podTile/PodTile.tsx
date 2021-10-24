import "./PodTile.css";
import { exp } from "../cache";
import { useRef } from "react";
import { Link } from "@reach/router";

const Pod = ({ pod, odd }: any) => {
  const img = useRef<HTMLImageElement>(null);

  return (
    <>
      <Link
        to={`/pod/${pod.title}`}
        // to={{
        //   pathname: `/pod/${pod.title}`,
        //   state: pod,
        // }}
        state={pod}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className={`pod ${odd ? "odd" : ""}`}>
          <p>{pod.title}</p>
          <img
            src={pod.url}
            alt={pod.title}
            ref={img}
            onLoad={() => exp.world.imagesHandler.addImage(img.current)}
            className="tile-img"
          />
        </div>
      </Link>
    </>
  );
};

export default Pod;
