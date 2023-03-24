import React from "react";
import { NextPage } from "next";
import AxiosClient from "@/config/axios/axios-client";

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

Dashboard.getInitialProps = async (context) => {
  const axiosClient = AxiosClient(context);

  const { data } = await axiosClient.get(`/api/users/currentuser`);

  return data;
};

export default Dashboard;
