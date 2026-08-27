import { Link } from "react-router-dom";

import lostDog from "../assets/errors/lostdog.jpg";


function NotFound() {
  return (
    <section className="not-found-page">
      <div className="not-found-poster">
        <div className="not-found-heading">
          <p className="not-found-code">
            404
          </p>

          <h1>
            Lost K9!
          </h1>
        </div>

        <img
          className="not-found-image"
          src={lostDog}
          alt="Lost black Lab puppy holding a leash"
        />

        <div className="not-found-copy">
          <p className="not-found-message">
            We can't find the page you're looking for.
          </p>

          <p className="not-found-submessage">
            Looks like this trail went cold.
          </p>

          <Link
            className="action-link"
            to="/"
          >
            Take Me Home
          </Link>

          <p className="not-found-hint">
            Go back or check the URL.
          </p>
        </div>
      </div>
    </section>
  );
}


export default NotFound;