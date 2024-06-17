import React from "react";

export default function CardBody({children}: {children?: React.ReactNode}) {
    return <div className="pt-2">{children}</div>;
}