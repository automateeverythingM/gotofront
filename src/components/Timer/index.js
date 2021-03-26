import { useState } from "react";
import DigitInputs from "../UI/Inputs/digitInputs/DigitInputs";
import useTimer from "./useTimer";

function Timer() {
    const { time, stop, start, pause, setTime } = useTimer(800, {
        autoStart: false,
    });
    return (
        <>
            <DigitInputs
                numberOfInputs={2}
                getNumberFromInputs={(number) => setTime(number)}
            />
            <h1>{time}</h1>
            <button onClick={start}>START</button>
            <button onClick={stop}>STOP</button>
            <button onClick={pause}>PAUSE</button>
        </>
    );
}

export default Timer;
