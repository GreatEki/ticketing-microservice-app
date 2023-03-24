import axios from "axios";
import { NextPageContext } from "next";

const AxiosClient = ({ req }: NextPageContext) => {
  if (typeof window === "undefined") {
    return axios.create({
      baseURL: `http://ingress-nginx.ingress.nginx.svc.cluster.local`,
      headers: req?.headers,
    });
  } else {
    return axios.create({ baseURL: "/" });
  }
};

export default AxiosClient;
