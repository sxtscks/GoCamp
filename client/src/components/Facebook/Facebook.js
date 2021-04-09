import "./Facebook.css";

const Facebook = ({ facebookHandler }) => {
  return (
    <div className="login-button">
      <div className="login-facebook-icon">f</div>
      <button onClick={facebookHandler} className="login-facebook-text">With Facebook</button>
    </div>
  );
}

export default Facebook;
