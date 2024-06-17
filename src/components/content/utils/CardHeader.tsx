import React from "react";

export default function CardHeader({value}: {value: string}) {
    return <div className="font-semibold text-center">
        <span>{value}</span>
    </div>;
}