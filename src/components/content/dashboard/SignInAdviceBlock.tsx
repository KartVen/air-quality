import Card from "@/components/content/dashboard/Card";

const SIGN_IN_ADVICE = 'Zaloguj się, aby zobaczyć szczegóły!';

export default function SignInAdviceBlock(){
    return (
        <Card>
            <div className="h-full flex flex-col justify-center font-semibold">
                <h2 className="text-3xl text-center">{SIGN_IN_ADVICE}</h2>
            </div>
        </Card>
    );
}