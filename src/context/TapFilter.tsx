import React, { useState } from "react";

export type TapFilterContextType = {
  namespaces: {
    get: string[];
    set: React.Dispatch<React.SetStateAction<string[]>>;
  };
};

export const DEFAULT_NAMESPACE_OPTION = { label: "default", value: "default" };

export const TapFilterContext = React.createContext<TapFilterContextType>({} as TapFilterContextType);

export const TapFilterContextProvider = (props: ContextProviderProps) => {
  const [namespaces, setNamespaces] = useState<string[]>([DEFAULT_NAMESPACE_OPTION.value]);

  return (
    <TapFilterContext.Provider
      value={{
        namespaces: { get: namespaces, set: setNamespaces },
      }}
    >
      {props.children}
    </TapFilterContext.Provider>
  );
};
