import React from "react";
import { NextPage } from "next";
import axios from "axios";

type CurrentUser = {
  email: string;
  password: string;
  [key: string]: any;
} | null;

interface Props {
  currentUser: CurrentUser;
}

const Dashboard: NextPage<Props> = ({ currentUser }) => {
  console.log(currentUser);
  return <div>Dashboard Page</div>;
};

Dashboard.getInitialProps = async ({ req }) => {
  if (typeof window === "undefined") {
    // we are on the server
    const { data } = await axios.get(
      `http://ingess-nginx.ingress.nginx.svc.cluster.local/api/users/currentuser`,
      {
        headers: req?.headers,
      }
    );

    return data;
  } else {
    // we are in the browser
    const { data } = await axios.get("/api/users/currentuser");

    return data;
  }
};

export default Dashboard;
