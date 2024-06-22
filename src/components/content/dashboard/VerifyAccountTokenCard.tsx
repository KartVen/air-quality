"use client";
import FormInputField, {FormFieldData} from "@/components/shared/form/FormInputField";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {
    USERNAME_VALIDATOR,
    VALIDATOR
} from "@/components/shared/form/utils/validators";
import {isAnyFormFieldError} from "@/components/shared/form/utils/helpers";
import {useSession} from "next-auth/react";
import {BadRequestApiError} from "@/utils/api/apiError";
import CardHeader from "@/components/content/utils/CardHeader";
import Card from "@/components/content/utils/Card";
import CardBody from "@/components/content/utils/CardBody";
import authService from "@/utils/api/auth/authService";

const VERIFIED_ERROR = "Błąd weryfikowanie konta";
const CODE_REQUIRED = 'Kod jest wymagany'

interface FormFields {
    code: FormFieldData;
}

export default function VerifyAccountTokenCard() {
    const {data: session, update: updateSession} = useSession();
    const [formFields, setFormFields] =
        useState<FormFields>({
            code: {value: ''}
        });

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        const formFieldsValidated = {
            code: VALIDATOR.validate(formFields.code),
        } satisfies FormFields;
        setFormFields(formFieldsValidated);

        if (isAnyFormFieldError(formFieldsValidated)) return;

        session && authService.verify(session, formFieldsValidated.code.value)
            .then(() => updateSession({
                ...session, user: {...session.user, isVerified: true}
            })
                .catch(err => err))
            .catch(err => {
                console.debug(err);
                if (err instanceof BadRequestApiError) {
                    const errors: { pointer: string, reason: string }[] = (err as BadRequestApiError).getData().errors;
                    errors.forEach(({pointer}) => {
                        (pointer === 'newUsername' && !formFields.code.error) && setFormFields({
                            code: {...formFields.code, error: 'Nazwa użytkownika już istnieje'}
                        });
                    })
                    return;
                }
                (!formFields.code.error) && setFormFields({
                    code: {...formFields.code, error: VERIFIED_ERROR}
                });
            });
    };

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) =>
        setFormFields({code: {value: e.target.value, error: undefined}});

    const handleOnBlur = () => (USERNAME_VALIDATOR.isEmpty(formFields.code)) &&
        setFormFields(prevState => ({
            code: {...prevState.code, error: CODE_REQUIRED},
        }));

    return <Card>
        <CardHeader value="Weryfikacja konta"/>
        <CardBody>
            <div className="w-full flex justify-center">
                <form className="w-full max-w-1/2 flex flex-col gap-5" onSubmit={onSubmit}>
                    <FormInputField
                        id="code"
                        placeholder="Wpisz code autoryzacyjny"
                        fieldData={formFields.code}
                        onChange={handleOnChange}
                        onBlur={handleOnBlur}
                    />
                    <div className="flex justify-center items-center pt-0.5">
                        <button className="w-1/2 p-3 rounded-2xl bg-blue-900 hover:bg-blue-800 font-semibold"
                                type="submit">
                            Weryfikuj
                        </button>
                    </div>
                </form>
            </div>
        </CardBody>
    </Card>
}