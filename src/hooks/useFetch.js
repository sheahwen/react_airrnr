import { useState, useEffect, useCallback } from "react";

const useFetch = (baseUrl) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [endPoint, setEndPoint] = useState("");
  const [options, setOptions] = useState({});

  // const callFetch = useCallback(
  //   (routes, method = "GET", payload = {}) => {
  //     setEndPoint(baseUrl + routes);
  //     if (method !== "GET") {
  //       const requestOptions = {
  //         method: method,
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(payload),
  //       };
  //       setOptions(requestOptions);
  //     } else {
  //       setOptions({});
  //     }
  //     setLoading(true);
  //   },
  //   [baseUrl]
  // );

  const callFetch = (routes, method = "GET", payload = {}) => {
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
  };

  useEffect(() => {
    const abortController = new AbortController();
    if (!loading) {
      return;
    }
    const fetchRequest = async () => {
      try {
        const response = await fetch(endPoint, {
          ...options,
          signal: abortController.signal,
        });
        const json = await response.json();
        if (json?.data === undefined) {
          setData(json);
        } else {
          setData(json.data);
        }
      } catch (err) {
        setError({ status: false, message: err.message });
      } finally {
        setData(null);
        setError(null);
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
