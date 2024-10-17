import { useState, useEffect } from 'react';
import { getTime } from "../lib/time";

const Time = () => {
    const [time, setTime] = useState(getTime());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(getTime());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <span className="text-2xl text-white">{time}</span>
    );
};

export default Time;
