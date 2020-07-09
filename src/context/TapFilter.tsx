import React, { useState } from "react";

export type TapFilterContextType = {
  namespaces: { get: string[]; set: React.Dispatch<React.SetStateAction<string[]>> };
  resource: { get: string | undefined; set: React.Dispatch<React.SetStateAction<string | undefined>> };
  destination: { get: string | undefined; set: React.Dispatch<React.SetStateAction<string | undefined>> };
  method: { get: string | undefined; set: React.Dispatch<React.SetStateAction<string | undefined>> };
  statusCodeMin: { get: number | undefined; set: React.Dispatch<React.SetStateAction<number | undefined>> };
  statusCodeMax: { get: number | undefined; set: React.Dispatch<React.SetStateAction<number | undefined>> };
  pathPrefix: { get: string | undefined; set: React.Dispatch<React.SetStateAction<string | undefined>> };
};

export const DEFAULT_NAMESPACE_OPTION = { label: "default", value: "default" };

export const TapFilterContext = React.createContext<TapFilterContextType>({} as TapFilterContextType);

export const TapFilterContextProvider = (props: ContextProviderProps) => {
  const [namespaces, setNamespaces] = useState<string[]>([DEFAULT_NAMESPACE_OPTION.value]);
  const [resource, setResource] = useState<string>();
  const [destination, setDestination] = useState<string>();
  const [method, setMethod] = useState<string>();
  const [statusCodeMin, setStatusCodeMin] = useState<number>();
  const [statusCodeMax, setStatusCodeMax] = useState<number>();
  const [pathPrefix, setPathPrefix] = useState<string>();

  return (
    <TapFilterContext.Provider
      value={{
        namespaces: { get: namespaces, set: setNamespaces },
        resource: { get: resource, set: setResource },
        destination: { get: destination, set: setDestination },
        method: { get: method, set: setMethod },
        statusCodeMin: { get: statusCodeMin, set: setStatusCodeMin },
        statusCodeMax: { get: statusCodeMax, set: setStatusCodeMax },
        pathPrefix: { get: pathPrefix, set: setPathPrefix },
      }}
    >
      {props.children}
    </TapFilterContext.Provider>
  );
};
