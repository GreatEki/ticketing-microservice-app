import React, { useState } from "react";
import styles from "./Signup.module.css";
import { Input, Button } from "@/components";
import Router from "next/router";
import useRequest from "@/hooks/useRequest";

const Signup = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { execute } = useRequest({
    url: "http://ticketing.dev/api/users/signup",
    method: "post",
    options: {
      onSuccess: (data) => {
        console.log(data);
        Router.push("/");
      },
      onError: (err) => {
        console.log(err?.response?.data || err?.message);
      },
    },
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    await execute(user);
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
