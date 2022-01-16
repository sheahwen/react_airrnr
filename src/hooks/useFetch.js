import { convertLength } from "@mui/material/styles/cssUtils";
import { useState, useEffect, useCallback } from "react";

const useFetch = (baseUrl) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [endPoint, setEndPoint] = useState("");
  const [options, setOptions] = useState({});

  const callFetch = useCallback(
    (routes, method = "GET", payload = {}) => {
      console.log("callFetchexec");
      console.log(payload);
      setEndPoint(baseUrl + routes);
      if (method !== "GET") {
        const requestOptions = {
          method: method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        };
        setOptions(requestOptions);
      } else {
        setOptions({});
      }
      setLoading(true);
    },
    [baseUrl]
  );

  useEffect(() => {
    const abortController = new AbortController();
    console.log("inside useEffect");
    if (!loading) {
      return;
    }
    const fetchRequest = async () => {
      try {
        const response = await fetch(endPoint, {
          ...options,
          signal: abortController.signal,
        });
        if (!response.ok) throw new Error("Error fetching data.");
        const json = await response.json();
        setData(json.data);
      } catch (err) {
        setError({ status: true, message: err.message });
      } finally {
        setLoading(false);
      }
    };
    fetchRequest();
    return () => {
      abortController.abort();
    };
  }, [loading, options, endPoint]);
  return [{ data, loading, error }, callFetch];
};

export default useFetch;
