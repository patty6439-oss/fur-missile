import { Link } from "react-router-dom";

import lostDog from "../assets/errors/lost-dog.jpg";


function NotFound() {
  return (
    <section>
      <h1>404 - Lost K9</h1>

      <p>
        Looks like this K9 wandered off the assigned route.
      </p>

      <img
        className="not-found-image"
        src={lostDog}
        alt="Lost K9 holding a leash"
      />

      <p>
        The page you were looking for could not be found.
      </p>

      <Link
        className="action-link"
        to="/"
      >
        Return Home
      </Link>
    </section>
  );
}


export default NotFound;