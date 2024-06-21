import Card from "@/components/content/utils/Card";
import {formatDate, formatTime} from "@/components/content/dashboard/utils/helpers";
import useDateTime from "@/utils/hooks/useDateTime";

export default function DateTimeCard() {
    const dateTime = useDateTime();

    return (
        <Card>
            <div className="h-full flex flex-col gap-2 justify-center items-center font-semibold">
                {dateTime && (
                    <>
                        <h2 className="text-4xl">{formatTime(dateTime)}</h2>
                        <span>{formatDate(dateTime)}</span>
                    </>
                )}
            </div>
        </Card>
    );
};