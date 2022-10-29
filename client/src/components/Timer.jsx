import { useState, useEffect } from 'react';

export default function Timer() {
    const [seconds, setSeconds] = useEffect(0);
    const [isActive, setIsActive] = useState(false);

    function toggle() {
        setIsActive(!isActive);
    }
    function reset() {
        setSeconds(0);
        setIsActive(false);
    }
    useEffect(()=>{
        let interval = null;
        if (isActive) {
            interval = setInterval(()=>{
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
    }, [isActive, seconds]);
    return (<div className="Timer">
        <div className="time">
            {seconds}s
        </div>
        <div className="buttons">
            <button className="button-one" onClick={toggle}>
                {isActive? 'Pause' : 'Start'}
            </button>
            <button className="button-two" onClick={reset}>
                Reset
            </button>
        </div>
    </div>);
}
