const AuthVerify = () => {
  // const user = userInfo;
  const user = JSON.parse(localStorage.getItem("userInfo"));
  console.log(user);
  //to verify expiration
  if (user) {
    return true;
  } else {
    return false;
  }
};

export default AuthVerify;
