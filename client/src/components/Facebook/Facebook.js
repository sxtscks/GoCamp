import "./Facebook.css";
import fbLogo from './f_logo_RGB-White_1024.png'


const Facebook = ({ facebookHandler }) => {
  return (
    <button onClick={facebookHandler} className="btn btn-primary login-facebook-text">
      <span className="google-button__icon">
        <img style={{ width: "30px" }} src={fbLogo} alt='Facebook'></img>
      </span>
      <span className="google-button__text">
        Facebook
      </span>
    </button>
  );
}

export default Facebook;
