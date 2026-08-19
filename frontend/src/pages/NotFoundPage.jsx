import lostDog from "../assets/errors/lost-dog.jpg";


function NotFound() {
  return (
    <section>
      <h1>404 - Lost K9</h1>

      <img
        className="not-found-image"
        src={lostDog}
        alt="Lost K9 holding a leash"
      />
    </section>
  );
}


export default NotFound;