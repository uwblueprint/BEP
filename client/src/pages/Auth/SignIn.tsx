import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import SelectUserBox from "./SelectUserBox";
import EducatorRegistration from "./EducatorRegistration";
import VolunteerRegistration from "./VolunteerRegistration";
import { TextButton } from "../../components/index";

const SignIn = (props: any) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("");

  const { classes, history, user } = props;

  if (user) {
    // whatever the redirect route is supposed to be
    history.push("/");
  }

  const setUserType = (newValue: string) => {
    setSelectedUser(newValue);
    console.log(newValue); //volunteer or educator
  };

  const goBack = () => {
    setSelectedUser("");
  };

  const handleSubmit = () => {};

  let loginContent = null;

  if (selectedUser === "volunteer") {
    loginContent = (
      <div>
        <TextButton onClick={goBack}>Back</TextButton>
        <VolunteerRegistration />
      </div>
    );
  } else if (selectedUser === "educator") {
    loginContent = (
      <div>
        <TextButton onClick={goBack}>Back</TextButton>

        <EducatorRegistration />
      </div>
    );
  } else {
    loginContent = (
      <form>
        <div>
          <h4>BEP</h4>
        </div>
        <div>
          Email
          <br />
          Password
          <br />
          <button type="submit" onClick={handleSubmit}>
            Log In
          </button>
          <SelectUserBox setUserType={setUserType} />
        </div>
      </form>
    );
  }

  return <div>{loginContent}</div>;
};

export default SignIn;
