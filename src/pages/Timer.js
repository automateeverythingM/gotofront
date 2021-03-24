import React, { useState, useEffect } from 'react'



function Timer() {
    //some styles
    const timers = {
        marginTop: "50px",
        display: "flex",
        width: "800px",
        flexWrap: "wrap",
        marginLeft: "auto",
        marginRight: "auto",
    };
    const timersElements = {
        flexBasis: "45%",
        border: '1px solid rgba(0, 0, 0, 1)',
        marginTop: "10px",
    }


    const [second, setSecond] = useState('00');
    const [minute, setMinute] = useState('00');
    const [isActive, setIsActive] = useState(false);
    const [newDate, setNewDate] = useState(0);
    const [timer, setTimer] = useState(0);
    const [choice, setChoice] = useState('');

    useEffect(() => {
        console.log(isActive);
        if (isActive) {
            setTimer(setInterval(() => {
                const diffTime = Math.abs(Date.now() - newDate);
                let secondsTotal = Math.floor(diffTime / 1000);
                let minutesLeft = Math.floor(secondsTotal / 60);
                let secondsLeft = secondsTotal % 60;

                const minuteString = String(minutesLeft).length === 1 ? `0${minutesLeft}` : minutesLeft;
                const secondString = String(secondsLeft).length === 1 ? `0${secondsLeft}` : secondsLeft;

                setSecond(secondString);
                setMinute(minuteString);
            }, 1000))
        }

    }, [isActive])

    // Function to return a new Date from now. E.g if we set timer on 5 minutes at 20:00
    // it would return 20:05 date
    //+1000 at the end because there is some delay timer when started goes to 4:58 not 4:59
    function addMinutes(minutes, seconds=0) {
        return new Date(Date.now() + minutes * 60000 + seconds * 1000 + 1000);
    }

    //Function to set time when one of the inputs clicked
    function handleTimers(e) {
        const minutes = e.target.value;
        const seconds = 0;
        if (minutes) {
            setChoice(minutes)
            setNewDate(addMinutes(parseInt(minutes), parseInt(seconds)));
            setMinute(minutes.length === 1 ? `0${minutes}` : minutes);
        }
    }

    function handleStop() {
        setIsActive(false);
        setTimer(clearInterval(timer));
    }

    function handleStart() {
        if (newDate){
            const minutes = parseInt(minute);
            const seconds = parseInt(second);
            setNewDate(addMinutes(minutes, seconds));
            console.log(minutes, seconds);
            setIsActive(true);
        }
    }
    
    function handleReset() {
        handleStop();
        setNewDate(addMinutes(parseInt(choice)));
        setMinute(choice.length === 1 ? `0${choice}` : choice);
        setSecond('00')
    }

    return (

        <div className="container">
            <div className="time" styles={{
                marginLeft: "auto",
                marginRight: "auto",
                display: "flex",
            }}>
                <span className="minute">{minute}</span>
                <span>:</span>
                <span className="second">{second}</span>
            </div>
            <div className="buttons">
                {isActive ? <button onClick={handleStop} className="stop">Stop</button> :
                    <button onClick={handleStart} className="start">Start</button>
                }
                <button onClick={handleReset} className="stop">Reset</button>
            </div>
            <div className="timers" style={timers} onClick={handleTimers}>
                <input type="button" value="5" style={timersElements}></input>
                <input type="button" value="10" style={timersElements}></input>
                <input type="button" value="25" style={timersElements}></input>
                <input type="button" value="40" style={timersElements}></input>
            </div>
        </div>
    )
}
export default Timer;
