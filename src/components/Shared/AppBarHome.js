import Logo from "./Logo";
import themeStyle from "../../theme/theme";

const AppBarHome = ({ title }) => {
  return (
    <nav className="navbar py-0 border-bottom" style={{ height: "130px" }}>
      <div className="container">
        <Logo height="110px" width="auto" />
        <span className="fs-4">{title}</span>

        {/* <button
          type="button"
          class="btn btn-lg btn-primary"
          style={{
            backgroundColor: themeStyle.color.primary.normal,
            borderColor: themeStyle.color.primary.normal,
          }}
        >
          <div>
            <FaSignInAlt size={20} />
            <span className="ms-2">Signup</span>
          </div>
        </button> */}
      </div>
    </nav>
  );
};

export default AppBarHome;
// background: "transparent",
// , backgroundColor: "#894AF8"
