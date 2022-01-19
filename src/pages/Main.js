import Logo from "../components/Shared/Logo";
import LoginForm from "../components/login_signup_Components/LoginForm";
import themeStyle from "../theme/theme";

const Main = () => {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <div className="row" style={{ width: "100%", height: "100%" }}>
        <div className="shadow-lg col-4 d-flex flex-column justify-content-center align-items-center starter-bgImg">
          <Logo height="140px" />
          <h1 className="fw-bolder text-white fs-2 pb-5 pb-md-10 mt-3 text-center">
            Welcome to AirR&R <br />A Restaurants Reservation Service
          </h1>
          <p className="fw-bold fs-5 text-white text-center">
            Please sign up or login to proceed
            <br />
            Browese the list of restaurants and make a booking today!
          </p>
        </div>
        <div className="col-8 d-flex flex-column justify-content-center align-items-center ">
          <div className="row text-center">
            <h3
              className="fw-bold "
              style={{ color: `${themeStyle.color.secondary.dark}` }}
            >
              Already have an Account? <br />
              <small>Sign In to AirR&R</small>
            </h3>
            <span className="mb-5">
              Public user and Restaurant user, please use the same form to login
            </span>
          </div>
          {/* Login Form */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Main;
