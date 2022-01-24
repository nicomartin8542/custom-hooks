import { useEffect, useRef, useState } from "react";

const useFetch = (url) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  const isMonted = useRef(true);

  useEffect(() => {
    return () => {
      isMonted.current = false;
    };
  }, []);

  useEffect(() => {
    //Reinicio valor del state
    setState({
      data: null,
      loading: true,
      error: null,
    });

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        if (isMonted.current) {
          setState({
            error: null,
            loading: false,
            data,
          });
        }
      })
      .catch((err) => {
        setState({
          error: err,
          loading: false,
          data: null,
        });
      });
  }, [url]);

  return state;
};

export default useFetch;
