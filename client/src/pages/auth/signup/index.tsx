import React from "react";
import styles from "./Signup.module.css";
import { Input } from "@/components";

const Signup = () => {
  return (
    <div className={styles.signup}>
      <h1> Signup Screen</h1>
      <form className={styles.form}>
        <div>
          <Input
            type="text"
            name="email"
            label="Email Address"
            value={""}
            onChange={() => console.log("email")}
          />
        </div>

        <br />

        <div>
          <Input
            type="password"
            name="password"
            label="Password"
            value={""}
            onChange={() => console.log("email")}
          />
        </div>
      </form>
    </div>
  );
};

export default Signup;
