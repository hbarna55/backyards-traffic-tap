import { QueryLazyOptions } from "@apollo/react-hooks";
import { useEffect, useRef } from "react";

const useWorkloads = (callback: (options?: QueryLazyOptions<Record<string, any>> | undefined) => void) => {
  const polling = useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    callback();
    polling.current = setInterval(() => {
      callback();
    }, 5000);

    return () => {
      clearInterval(polling.current!);
    };
  }, [callback]);
};
export default useWorkloads;
