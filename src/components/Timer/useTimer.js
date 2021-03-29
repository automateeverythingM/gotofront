/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer, useState } from "react";

const SET_START_STATE = "SET_START_STATE";
const INPROGRESS = "INPROGRESS";
const END_TIME = "DECREMENT_TIME";
const STOP_TIME = "STOP_TIME";
const PAUSE_TIME = "PAUSE_TIME";
const START_TIME = "START_TIME";

const STOPPED = "STOPPED";
const PAUSED = "PAUSED";
const ENDED = "ENDED";
const IDLE = "IDLE";
const RESET = "RESET";

const reducer = (state, action) => {
    switch (action.type) {
        case SET_START_STATE:
            return { ...state, ...action.payload };
        case END_TIME:
            clearInterval(state.intervalId);
            state.onEnd();
            return { ...state, status: ENDED };
        case STOP_TIME:
            state.onStop();
            return { ...state, intervalId: null, status: STOPPED, time: 0 };
        case PAUSE_TIME:
            state.onPause();
            return { ...state, intervalId: null, status: PAUSED };
        case START_TIME:
            return { ...state, startTime: action.payload };
        default:
            break;
    }
};

const initialState = {
    status: IDLE,
    startTime: null,
    autoStart: true,
    time: 0,
    intervalId: null,
    onStart: () => {
        console.log("START");
    },
    onEnd: () => {
        console.log("END");
    },
    onStop: () => {
        console.log("STOP");
    },
    onPause: () => {
        console.log("PAUSE");
    },
};

function useTimer(initTime, init) {
    const [time, setTime] = useState(0);
    const [state, dispatch] = useReducer(reducer, initialState, () => ({
        ...initialState,
        ...init,
    }));

    const { intervalId, autoStart, status } = state;

    const clearStateInterval = () => {
        if (intervalId) clearInterval(intervalId);
    };

    function startTimer() {
        setTime((prev) => {
            if (prev === 0) {
                dispatch({ type: END_TIME });
                return prev;
            }
            return prev - 1;
        });
    }

    const startCountdown = () => {
        clearStateInterval();
        const intervalId = setInterval(startTimer, 1000);
        state.onStart();
        dispatch({
            type: SET_START_STATE,
            payload: { status: INPROGRESS, intervalId: intervalId },
        });
    };

    useEffect(() => {
        if (initTime) setInitTime(initTime);
        return clearStateInterval;
    }, []);

    const setInitTime = (time) => {
        clearStateInterval();
        dispatch({ type: START_TIME, payload: time });
        setTime(time);
        if (autoStart) startCountdown();
    };

    const start = () => {
        if (status === INPROGRESS || time === 0) return;
        startCountdown();
    };
    const stop = () => {
        if (status === STOPPED) return;
        clearStateInterval();
        setTime(0);
        dispatch({ type: STOP_TIME });
    };
    const reset = () => {
        if (status === RESET || !state.startTime) return;
        clearStateInterval();
        setTime(state.startTime);
        if (autoStart) startCountdown();
    };
    const pause = () => {
        if (status === PAUSED) return;
        clearStateInterval();
        dispatch({ type: PAUSE_TIME });
    };

    return { time, setInitTime, start, reset, pause, stop };
}
export default useTimer;
