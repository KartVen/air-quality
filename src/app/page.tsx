"use client";
import React from "react";
import Layout from "@/components/layout/Layout";
import WelcomeCard from "@/components/content/dashboard/WelcomeCard";
import PlanCard from "@/components/content/dashboard/PlanCard";
import SignInRequestBlock from "@/components/content/dashboard/SignInAdviceBlock";
import DateTimeCard from "@/components/content/dashboard/DateTimeCard";
import {useSession} from "next-auth/react";
import AirQualityCards from "@/components/content/dashboard/AirQualityCards";

export default function Home() {
    const {data: session} = useSession();

    return <Layout pageTitle="Dashboard">
        <div className={`grid ${session ? "grid-cols-3" : "grid-cols-2"} gap-card-between`}>
            {session ? (
                <>
                    <WelcomeCard/>
                    <PlanCard/>
                </>
            ) : <SignInRequestBlock/>}
            <DateTimeCard/>
        </div>
        {session && <AirQualityCards session={session} />}
    </Layout>;
}
