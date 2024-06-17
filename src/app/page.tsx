"use client";
import React from "react";
import Layout from "@/components/layout/Layout";
import WelcomeCard from "@/components/content/dashboard/WelcomeCard";
import PlanCard from "@/components/content/dashboard/PlanCard";
import SignInRequestBlock from "@/components/content/dashboard/SignInAdviceBlock";
import DateTimeCard from "@/components/content/dashboard/DateTimeCard";
import AirQualityCard from "@/components/content/dashboard/AirQualityCard";
import {useSession} from "next-auth/react";

export default function Home() {
    const session = useSession();

    return (
        <Layout pageTitle="Dashboard">
            {
                session ? (
                    <>
                        <div className="h-40 grid grid-cols-3 gap-card-between">
                            <WelcomeCard/>
                            <PlanCard/>
                            <DateTimeCard/>
                        </div>
                        <div className="h-40 grid grid-cols-3 gap-card-between">
                            <AirQualityCard/>
                        </div>
                    </>
                ) : (
                    <div className="h-40 grid grid-cols-2 gap-card-between">
                        <SignInRequestBlock/>
                        <DateTimeCard/>
                    </div>
                )
            }
        </Layout>
    );
}
