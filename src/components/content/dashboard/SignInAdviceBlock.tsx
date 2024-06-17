import Card from "@/components/content/utils/Card";

const SIGN_IN_ADVICE = 'Zaloguj się, aby zobaczyć szczegóły!';

export default function SignInAdviceBlock(){
    return (
        <Card>
            <div className="h-full flex flex-col justify-center font-semibold">
                <h3 className="text-2xl text-center">{SIGN_IN_ADVICE}</h3>
            </div>
        </Card>
    );
}