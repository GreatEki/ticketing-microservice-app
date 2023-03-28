import { useState } from "react";
import axios from "axios";

type Methods = "post" | "put" | "patch" | "delete" | "get" | "options" | "head";

interface Error {
  [key: string]: any;
}

interface Options {
  onSuccess?: (resp: any) => void;
  onError?: (err: Error) => void;
}

interface ReqParams {
  url: string;
  method: Methods;
  options?: Options;
}

interface ExecArgs {
  [key: string]: string;
}

const useRequest = ({ url, method, options }: ReqParams) => {
  const [data, setData] = useState({});
  const [error, setError] = useState<string | null>("");

  async function execute(args: ExecArgs) {
    setError(null);
    try {
      const response = await axios[method](url, args.body);
      setData(response.data);

      if (options?.onSuccess) {
        options.onSuccess(response.data);
      }
    } catch (err) {
      setError(err?.response?.data?.message || err?.message);

      if (options?.onError) {
        options?.onError(err);
      }
    }
  }

  return { execute, data, error };
};

export default useRequest;
