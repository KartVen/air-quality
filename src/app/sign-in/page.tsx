import AuthPageContent from "@/components/auth/AuthPageContent";
import SignInForm from "@/components/auth/SignInForm";
import SignChanger from "@/components/auth/SignChanger";
import RightBlock from "@/components/auth/RightBlock";
import {SIGN_IN_INFO, SIGN_IN_LABEL} from "@/components/auth/utils/contants";

export default function SignInPage() {
    return <AuthPageContent>
        <RightBlock label={SIGN_IN_LABEL} info={SIGN_IN_INFO}>
            <SignInForm/>
            <SignChanger label="Nie masz konta?" newHref="/sign-up" linkLabel="Założ konto"/>
        </RightBlock>
    </AuthPageContent>;
}