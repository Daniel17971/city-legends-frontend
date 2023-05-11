import { useState, createContext } from "react";

type DiscoveryContextProviderProps = {
  children: React.ReactNode;
};

export const DiscoveryContext = createContext(null);

export const DiscoveryContextProvider = ({
  children,
}: DiscoveryContextProviderProps) => {
  const [discoveryModeStatus, setDiscoveryModeStatus] = useState(false);
  return (
    <DiscoveryContext.Provider
      value={{ discoveryModeStatus, setDiscoveryModeStatus }}
    >
      {children}
    </DiscoveryContext.Provider>
  );
};
