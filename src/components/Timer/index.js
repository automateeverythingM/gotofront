import { pushNotification } from "../../utils/NotificationCreator/pushMessage";
import DigitInputs from "../UI/Inputs/digitInputs/DigitInputs";
import TimeEnds from "../UI/Notifications/TimeEnds";
import useTimer from "./useTimer";

function Timer() {
    const { time, stop, start, pause, reset, setInitTime } = useTimer(50, {
        onEnd: () => {
            console.log("ended");
            pushNotification({ content: <TimeEnds /> });
        },
        autoStart: true,
    });

    return (
        <>
            <DigitInputs
                numberOfInputs={2}
                getNumberFromInputs={(number) => setInitTime(number)}
            />

            <div>
                <button onClick={start}>Start</button>
                <button onClick={pause}>Pause</button>
                <button onClick={stop}>STOP</button>
                <button onClick={reset}>RESET</button>
            </div>
            <p>Elapsed time: {time}</p>
        </>
    );
}

export default Timer;
