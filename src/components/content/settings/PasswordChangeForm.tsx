"use client";
import FormInputField, {FormFieldData, InputType} from "@/components/shared/form/FormInputField";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {FormErrors, PASSWORD_VALIDATOR} from "@/components/shared/form/utils/validators";
import {isAnyFormFieldError} from "@/components/shared/form/utils/helpers";
import {useSession} from "next-auth/react";
import profileService from "@/utils/api/profile/profileService";
import {BadRequestApiError} from "@/utils/api/apiError";

const NEW_PASSWORD_ERROR = "Błąd zmiany hasła";
const NEW_PASSWORD_SUCCESS = "Zmieniono!";

export default function UsernameChangeForm() {
    const {data: session, update: updateSession} = useSession();
    const [formFields, setFormFields] =
        useState<{ password: FormFieldData; }>({
            password: {value: ''}
        });
    const [isProcessSuccess, setIsProcessSuccess] = useState<boolean>(false)

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        const formFieldsValidated = {
            password: PASSWORD_VALIDATOR.validate(formFields.password),
        };
        setFormFields(formFieldsValidated);

        if (isAnyFormFieldError(formFieldsValidated)) return;

        session && profileService.changeUsername(session, formFieldsValidated.password.value)
            .then(() => {
                console.log('session', session);
                const x = updateSession({
                    ...session, user: {...session.user, password: formFieldsValidated.password.value}
                })
                    .then(() => setIsProcessSuccess(true))
                    .catch(err => console.log(err));
                console.log('sessionUpdate', session);
                return x;
            })
            .catch(err => {
                console.debug(err);
                if (err instanceof BadRequestApiError) {
                    const errors: { pointer: string, reason: string }[] = (err as BadRequestApiError).getData().errors;
                    errors.forEach(({pointer}) => {
                        (pointer === 'password' && !formFields.password.error) && setFormFields({
                            password: {...formFields.password, error: 'Nazwa użytkownika już istnieje'}
                        });
                    })
                    return;
                }
                (!formFields.password.error) && setFormFields({
                    password: {...formFields.password, error: NEW_PASSWORD_ERROR}
                });
            });
    };

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) =>
        setFormFields({password: {value: e.target.value, error: undefined}});

    const handleOnBlur = () => (PASSWORD_VALIDATOR.isEmpty(formFields.password)) && setFormFields({
        ...formFields, password: {...formFields.password, error: FormErrors.PASSWORD_REQUIRED},
    });

    return <div>
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <FormInputField
                id="password"
                label="Nazwa użytkownika"
                placeholder="Nowa nazwa użytkownika"
                fieldData={formFields.password}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
            />
            <div className="flex justify-center items-center pt-2">
                <button className="w-1/2 p-3 rounded-2xl bg-blue-900 hover:bg-blue-800 font-semibold" type="submit">
                    Zmień
                </button>
            </div>
        </form>
        {isProcessSuccess && <div className="w-full pt-2 text-green-500 text-center">{NEW_PASSWORD_SUCCESS}</div>}
    </div>;
}