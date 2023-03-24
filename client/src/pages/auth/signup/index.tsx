import React, { useState } from "react";
import styles from "./Signup.module.css";
import { Input, Button } from "@/components";
import axios from "axios";

const Signup = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await axios.post("/api/users/signup", user);

      console.log(response);
    } catch (err) {
      console.log(err?.response?.data || err?.message);
    }
  }

  return (
    <div className={styles.signup}>
      <h1 className={styles.h1}> Signup Screen</h1>
      <br />
      <form className={styles.form} onSubmit={onSubmit}>
        <div>
          <Input
            type="text"
            name="email"
            label="Email Address"
            value={user.email}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <Input
            type="password"
            name="password"
            label="Password"
            value={user.password}
            onChange={handleChange}
          />
        </div>

        <br />

        <div className={styles.btn}>
          <Button btnText="Submit" btnType="submit" />
        </div>
      </form>
    </div>
  );
};

export default Signup;
