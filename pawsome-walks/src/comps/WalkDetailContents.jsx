import { Link } from "react-router-dom";
import { IoReturnDownBack } from "react-icons/io5";
import { CiStar } from "react-icons/ci";
import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
import OnWalkElements from "./OnWalkElements";
export default function WalkDetailContents({ walk, walkid }) {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);

  return (
    <div
      className={`walkDetailContentsContainer ${darkTheme ? "dark" : "light"}`}
    >
      <div className="walkDetailContents">
        <div className="walkDetailIconContainer">
          <Link className="noTextDecoration" to="/">
            <IoReturnDownBack
              className={`backIcon ThemeIcon icon fade ${
                darkTheme ? "dark" : "light"
              }`}
            />
          </Link>
          <h1 className="walkDetailWalkName">{walk.walkname}</h1>
          <CiStar className="starIcon icon walkDetailIcon" />
        </div>
        <div className="walkDetail">
          <h4 className="walkDetailLocation">{walk.location}</h4>
          <p className="walkDetailWalkType">{walk.walktype.map((type) => type).join(", ")}</p>
          <OnWalkElements walk={walk}></OnWalkElements>
        </div>
      </div>
      <img
        className="walkDetailImg"
        src={`/walk-photos/walk${walkid}.jpg`}
        alt={walk.walkname}
      />
    </div>
  );
}
