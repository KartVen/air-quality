"use client";
import {useEffect, useState} from "react";
import Card from "@/components/content/dashboard/Card";
import {formatDate, formatTime} from "@/components/content/dashboard/utils/helpers";

export default function DateTimeCard() {
    const [currentTime, setCurrentTime] = useState<Date | undefined>();

    useEffect(() => {
        setCurrentTime(new Date());

        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Card>
            <div className="h-full flex flex-col gap-2 justify-center items-center font-semibold">
                {currentTime && (
                    <>
                        <h2 className="text-4xl">{formatTime(currentTime)}</h2>
                        <span>{formatDate(currentTime)}</span>
                    </>
                )}
            </div>
        </Card>
    );
};