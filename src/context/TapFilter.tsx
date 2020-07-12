import React, { useState } from "react";

export type TapFilterContextType = {
  namespacesFilter: { get: string[]; set: React.Dispatch<React.SetStateAction<string[]>> };
  resourceFilter: { get: string; set: React.Dispatch<React.SetStateAction<string>> };
  destinationFilter: { get: string; set: React.Dispatch<React.SetStateAction<string>> };
  methodFilter: { get: string; set: React.Dispatch<React.SetStateAction<string>> };
  statusCodeMinFilter: { get: string; set: React.Dispatch<React.SetStateAction<string>> };
  statusCodeMaxFilter: { get: string; set: React.Dispatch<React.SetStateAction<string>> };
  pathPrefixFilter: { get: string; set: React.Dispatch<React.SetStateAction<string>> };
};

export const DEFAULT_NAMESPACE_OPTION = { label: "default", value: "default" };
export const BACKYARDS_DEMO_NAMESPACE_OPTION = { label: "backyards-demo", value: "backyards-demo" };

export const TapFilterContext = React.createContext<TapFilterContextType>({} as TapFilterContextType);

export const TapFilterContextProvider = (props: ContextProviderProps) => {
  const [namespacesFilter, setNamespacesFilter] = useState<string[]>([
    DEFAULT_NAMESPACE_OPTION.value,
    BACKYARDS_DEMO_NAMESPACE_OPTION.value,
  ]);
  const [resourceFilter, setResourceFilter] = useState<string>("");
  const [destinationFilter, setDestinationFilter] = useState<string>("");
  const [methodFilter, setMethodFilter] = useState<string>("");
  const [statusCodeMinFilter, setStatusCodeMinFilter] = useState<string>("");
  const [statusCodeMaxFilter, setStatusCodeMaxFilter] = useState<string>("");
  const [pathPrefixFilter, setPathPrefixFilter] = useState<string>("");

  return (
    <TapFilterContext.Provider
      value={{
        namespacesFilter: { get: namespacesFilter, set: setNamespacesFilter },
        resourceFilter: { get: resourceFilter, set: setResourceFilter },
        destinationFilter: { get: destinationFilter, set: setDestinationFilter },
        methodFilter: { get: methodFilter, set: setMethodFilter },
        statusCodeMinFilter: { get: statusCodeMinFilter, set: setStatusCodeMinFilter },
        statusCodeMaxFilter: { get: statusCodeMaxFilter, set: setStatusCodeMaxFilter },
        pathPrefixFilter: { get: pathPrefixFilter, set: setPathPrefixFilter },
      }}
    >
      {props.children}
    </TapFilterContext.Provider>
  );
};
