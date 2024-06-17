import AuthPageContent from "@/components/auth/AuthPageContent";
import SignUpForm from "@/components/auth/SignUpForm";
import SignChanger from "@/components/auth/SignChanger";
import RightBlock from "@/components/auth/RightBlock";
import {SIGN_UP_INFO, SIGN_UP_LABEL} from "@/components/auth/utils/contants";

export default function SignUpPage() {
    return <AuthPageContent>
        <RightBlock label={SIGN_UP_LABEL} info={SIGN_UP_INFO}>
            <SignUpForm/>
            <SignChanger label="Masz konto?" newHref="/signin" linkLabel="Zaloguj się"/>
        </RightBlock>
    </AuthPageContent>;
}