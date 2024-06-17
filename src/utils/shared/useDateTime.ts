import {useEffect, useState} from "react";

export default function useDateTime() {
    const [currentTime, setCurrentTime] = useState<Date | undefined>();

    useEffect(() => {
        setCurrentTime(new Date());

        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return currentTime;
}