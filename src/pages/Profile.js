import AppBarHome from "../components/Shared/AppBarHome";
import { useHistory } from "react-router-dom";
const Profile = () => {
  let history = useHistory();
  const logOut = () => {
    window.localStorage.removeItem("userInfo");
    history.push({
      pathname: "/",
    });
  };

  return (
    <div>
      <AppBarHome title="Profile" />
      <h1 className="mt-3">Profile Page</h1>
      <button type="button" className="btn btn-primary btn-lg" onClick={logOut}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
