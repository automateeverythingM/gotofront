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
                numberOfInputs={5}
                getNumberFromInputs={(number) => setInitTime(number)}
            />
            <div>
                <button className="btn" onClick={() => setInitTime(35)}>
                    35
                </button>
                <button className="btn" onClick={() => setInitTime(45)}>
                    45
                </button>
                <button className="btn" onClick={() => setInitTime(55)}>
                    55
                </button>
                <button className="btn" onClick={() => setInitTime(65)}>
                    65
                </button>
                <button className="btn" onClick={start}>
                    Start
                </button>
                <button className="btn" onClick={pause}>
                    Pause
                </button>
                <button className="btn" onClick={stop}>
                    STOP
                </button>
                <button className="btn" onClick={reset}>
                    RESET
                </button>
            </div>
            <p>Elapsed time: {time}</p>
        </>
    );
}

export default Timer;
