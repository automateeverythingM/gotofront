/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer } from "react";

const SET_START_STATE = "SET_START_STATE";
const SET_INIT_TIME = "SET_INIT_TIME";
const DECREMENT_TIME = "DECREMENT_TIME";
const STOP_TIME = "STOP_TIME";
const PAUSE_TIME = "PAUSE_TIME";

const INPROGRESS = "INPROGRESS";
const STOPPED = "STOPPED";
const PAUSED = "PAUSED";
const ENDED = "ENDED";
const IDLE = "IDLE";

const reducer = (state, action) => {
    switch (action.type) {
        case SET_INIT_TIME:
            return {
                ...state,
                time: action.payload,
                initTime: action.payload,
                status: IDLE,
            };
        case SET_START_STATE:
            return { ...state, ...action.payload };
        case DECREMENT_TIME:
            if (state.time === 1) {
                clearInterval(state.intervalId);
                return { ...state, status: ENDED, time: state.time - 1 };
            }
            return { ...state, time: state.time - 1 };
        case STOP_TIME:
            return { ...state, intervalId: null, status: STOPPED, time: 0 };
        case PAUSE_TIME:
            return { ...state, intervalId: null, status: PAUSED };
        default:
            break;
    }
};

const initialState = {
    status: IDLE,
    autoStart: true,
    time: 0,
    initTime: 0,
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
    const [state, dispatch] = useReducer(reducer, initialState, () => ({
        ...initialState,
        ...init,
    }));

    const { intervalId, autoStart, status, time } = state;

    const clearStateInterval = () => {
        if (intervalId) clearInterval(intervalId);
    };

    function startTimer() {
        dispatch({ type: DECREMENT_TIME });
    }

    const startCountdown = () => {
        clearStateInterval();

        const intervalId = setInterval(startTimer, 1000);

        dispatch({
            type: SET_START_STATE,
            payload: { status: INPROGRESS, intervalId: intervalId },
        });
    };

    useEffect(() => {
        if (initTime) setInitTime(initTime);
        return clearStateInterval;
    }, []);

    useEffect(() => {
        if (status === ENDED) state.onEnd();
        if (status === STOPPED) state.onStop();
        if (status === PAUSED) state.onPause();
    }, [status]);

    // useEffect(() => {
    //     if (autoStart) start();
    // }, [state.initTime]);

    const setInitTime = (time) => {
        if (time <= 0) return;
        clearStateInterval();
        dispatch({ type: SET_INIT_TIME, payload: time });
        if (autoStart) {
            startCountdown();
            state.onStart();
        }
    };

    const start = () => {
        if (status === INPROGRESS || time === 0) return;
        startCountdown();
        state.onStart();
    };
    const stop = () => {
        if (status === STOPPED) return;
        clearStateInterval();
        dispatch({ type: STOP_TIME });
    };
    const reset = () => {};
    const pause = () => {
        if (status === PAUSED) return;
        clearStateInterval();
        dispatch({ type: PAUSE_TIME });
    };

    return { time: state.time, setInitTime, start, reset, pause, stop };
}
export default useTimer;
