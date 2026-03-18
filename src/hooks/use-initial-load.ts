import { createContext, useCallback, useContext, useEffect, useState } from "react";

type InitialLoadContextType = {
    ready: boolean;
    setReady: () => void;
};

export const InitialLoadContext = createContext<InitialLoadContextType>({
    ready: false,
    setReady: () => {},
});

export const useInitialLoadProvider = () => {
    const [ready, setReadyState] = useState(false);
    const setReady = useCallback(() => setReadyState(true), []);
    return { ready, setReady };
};

export const useSignalReady = () => {
    const { setReady } = useContext(InitialLoadContext);
    return setReady;
};

export const useInitialLoad = () => {
    const { ready } = useContext(InitialLoadContext);
    return ready;
};

export const useSignalReadyOnMount = () => {
    const signalReady = useSignalReady();
    useEffect(() => {
        signalReady();
    }, [signalReady]);
};
