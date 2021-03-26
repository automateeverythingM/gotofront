import { useCallback, useEffect, useReducer } from "react";

const initialState = {
    autoStart: true,
    intervalID: null,
    time: 0,
    onStop: () => {},
    onStart: () => {
        console.log("START");
    },
    onEnd: () => {
        console.log("STOP");
    },
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_TIME":
            if (state.intervalID) clearInterval(state.intervalID);
            return { ...state, time: action.payload };
        case "DECREASE_TIME":
            if (state.time === 1) {
                state.onEnd();
                clearInterval(state.intervalID);
            }
            return { ...state, time: state.time - 1 };
        case "INTERVAL_ID":
            return { ...state, intervalID: action.payload };
        case "CLEAR_STATE":
            return { ...initialState };
        case "STOP_TIMER":
            if (state.intervalID) clearInterval(state.intervalID);
            return { ...state, time: 0, intervalID: null };
        case "PAUSE_TIMER":
            if (state.intervalID) clearInterval(state.intervalID);
            return { ...state, intervalID: null };
        default:
            return state;
    }
};

const useTimer = (time, init) => {
    const [state, dispatch] = useReducer(reducer, initialState, () => ({
        ...initialState,
        ...init,
    }));

    const startCountdown = useCallback((time) => {
        state.onStart();
        const intervalID = setInterval(() => {
            dispatch({ type: "DECREASE_TIME" });
        }, 1000);
        dispatch({ type: "INTERVAL_ID", payload: intervalID });
    }, []);

    useEffect(() => {
        if (time) {
            dispatch({ type: "SET_TIME", payload: time });
        }
        if (state.autoStart === true) {
            startCountdown();
        }
        return () => {
            if (state.intervalID) {
                clearInterval(state.intervalID);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const stop = () => {
        dispatch({ type: "STOP_TIMER" });
    };
    const start = () => {
        startCountdown();
    };
    const pause = () => {
        dispatch({ type: "PAUSE_TIMER" });
    };

    const setTime = (time) => {
        dispatch({ type: "SET_TIME", payload: time });
        if (state.autoStart) startCountdown();
    };

    return { time: state.time, stop, start, pause, setTime };
};

export default useTimer;
