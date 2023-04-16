import React, { useState, useEffect } from "react";
import RegisterForm from "./RegisterForm";

const Register = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const addUser = async (user, setError) => {
    const response = await fetch("http://localhost:5000/users");
    const existingUsers = await response.json();
    if (
      existingUsers.some(
        (existingUser) => existingUser.userName === user.userName
      )
    ) {
      setError("Username is already taken.");
      return false;
    }
    const newUsers = [...users, user];
    setUsers(newUsers);
    const res = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (res.ok) {
      return true;
    } else {
      setError("Error creating account. Please try again.");
      return false;
    }
  };

  return (
    <div className="regbackground">
      <div className="boxtwo">
        <h2 className="lTitle2">A New Community Awaits!</h2>
        <RegisterForm users={users} addUser={addUser} setError={setError} />
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default Register;
