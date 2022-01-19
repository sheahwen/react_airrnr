import AppBarHome from "../components/Shared/AppBarHome";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

const ProfilePage = () => {
  let history = useHistory();
  const initialValue = {
    name: "",
    username: "",
    img: "",
    gender: "",
    email: "",
    phone: "",
    hasRestaurant: false,
  };
  const location = useLocation();
  const [userDetails, setUserDetails] = useState(initialValue);
  const [imageBlur, setImageBlur] = useState(true);
  const { userProps = {} } = location.state || {};

  const onChangeHandler = (evt) => {
    setUserDetails({ ...userDetails, [evt.target.name]: evt.target.value });
    if (evt.target.name === "img") {
      setImageBlur(false);
    }
  };

  const onBlurHandler = (evt) => {
    if ((evt.target.name = "img")) {
      setImageBlur(true);
    }
  };

  const onClickHandler = async () => {
    const response = await axios
      .put(process.env.REACT_APP_URL + "/users/profile", userDetails, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userProps.token}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
    if (response.status === 200) {
      console.log(response.data.msg);

      history.push({
        pathname: "/user/profile",
        state: { userProps },
      });
    }
  };

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${userProps.token}` },
    };

    const fetchRequest = async () => {
      const response = await axios
        .get(process.env.REACT_APP_URL + "/users/profile", config)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
      if (response.status === 200) {
        const data = response.data.data[0];
        setUserDetails({ ...userDetails, ...data });
      } else if (response.data.status === "failed") {
        console.log(response.data.msg);
      }
    };
    fetchRequest();
  }, []);

  return (
    <>
      <AppBarHome title="Profile Setting" />
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              {userDetails.img.trim().length > 0 && imageBlur ? (
                <img
                  className="rounded-circle mt-5"
                  width="150px"
                  src={userDetails.img}
                  alt="profile"
                />
              ) : (
                userDetails.img.trim().length === 0 && (
                  <img
                    className="rounded-circle mt-5"
                    width="150px"
                    src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                    alt="profile"
                  />
                )
              )}
              <span className="font-weight-bold">{userDetails.username}</span>
              <span className="text-black-50">{userDetails.email}</span>
            </div>
          </div>
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Name</label>
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="name"
                    value={userDetails.name}
                    onChange={onChangeHandler}
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">User Name</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    value={userDetails.username}
                    placeholder="username"
                    onChange={onChangeHandler}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Profile Image Url</label>
                  <input
                    name="img"
                    type="text"
                    className="form-control"
                    placeholder="profile image url"
                    value={userDetails.img}
                    onChange={onChangeHandler}
                    onBlur={onBlurHandler}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Email</label>
                  <input
                    name="email"
                    type="text"
                    className="form-control"
                    placeholder="email"
                    value={userDetails.email}
                    onChange={onChangeHandler}
                    disabled
                  />
                </div>
              </div>
              <div className="mt-5 text-center">
                <button
                  onClick={onClickHandler}
                  className="btn btn-primary profile-button"
                  type="button"
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 py-5" style={{ marginTop: "53px" }}>
              <div className="col-md-12">
                <label className="labels">Gender</label>
                <select
                  name="gender"
                  className="form-select form-select-md"
                  aria-label=".form-select-sm example"
                  value={userDetails.gender}
                  onChange={onChangeHandler}
                >
                  <option value="">Select gender</option>
                  <option value="m">Male</option>
                  <option value="f">Female</option>
                  <option value="o">Others</option>
                </select>
              </div>
              <br />
              <div className="col-md-12">
                <label className="labels">Phone No.</label>
                <input
                  name="phone"
                  type="text"
                  className="form-control"
                  placeholder="additional details"
                  value={userDetails.phone}
                  onChange={onChangeHandler}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
