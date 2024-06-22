"use client";
import FormInputField, {FormFieldData} from "@/components/shared/form/FormInputField";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {FormError, USERNAME_VALIDATOR} from "@/components/shared/form/utils/validators";
import {isAnyFormFieldError} from "@/components/shared/form/utils/helpers";
import {useSession} from "next-auth/react";
import profileService from "@/utils/api/profile/profileService";
import {BadRequestApiError} from "@/utils/api/apiError";

const NEW_USERNAME_ERROR = "Błąd zmiany nazwy użytkownika";
const NEW_USERNAME_SUCCESS = "Zmieniono!";

interface FormFields {
    username: FormFieldData;
}

export default function UsernameChangeForm() {
    const {data: session, update: updateSession} = useSession();
    const [formFields, setFormFields] =
        useState<FormFields>({
            username: {value: session ? session.user.username : ''}
        });
    const [isProcessSuccess, setIsProcessSuccess] = useState<boolean>(false);

    useEffect(() => {
        session && setFormFields({username: {value: session.user.username, error: undefined}});
    }, [session]);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        const formFieldsValidated = {
            username: USERNAME_VALIDATOR.validate(formFields.username),
        } satisfies FormFields;
        setFormFields(formFieldsValidated);

        if (isAnyFormFieldError(formFieldsValidated)) return;

        session && profileService.changeUsername(session, formFieldsValidated.username.value)
            .then(() => updateSession({
                ...session, user: {...session.user, username: formFieldsValidated.username.value}
            })
                .then(() => setIsProcessSuccess(true))
                .catch(err => console.debug(err)))
            .catch(err => {
                console.info(err);
                if (err instanceof BadRequestApiError) {
                    const errors: { pointer: string, reason: string }[] = (err as BadRequestApiError).getData().errors;
                    errors.forEach(({pointer}) => {
                        (pointer === 'newUsername' && !formFields.username.error) && setFormFields({
                            username: {...formFields.username, error: 'Nazwa użytkownika już istnieje'}
                        });
                    })
                    return;
                }
                (!formFields.username.error) && setFormFields({
                    username: {...formFields.username, error: NEW_USERNAME_ERROR}
                });
            });
    };

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) =>
        setFormFields({username: {value: e.target.value, error: undefined}});

    const handleOnBlur = () => (USERNAME_VALIDATOR.isEmpty(formFields.username)) &&
        setFormFields(prevState => ({
            username: {...prevState.username, error: FormError.USERNAME_REQUIRED},
        }));

    return <div>
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <FormInputField
                id="username"
                label="Nazwa użytkownika"
                placeholder="Nowa nazwa użytkownika"
                fieldData={formFields.username}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
            />
            <div className="flex justify-center items-center pt-2">
                <button className="w-1/2 p-3 rounded-2xl bg-blue-900 hover:bg-blue-800 font-semibold" type="submit">
                    Zmień
                </button>
            </div>
        </form>
        {isProcessSuccess && <div className="w-full pt-2 text-green-500 text-center">{NEW_USERNAME_SUCCESS}</div>}
    </div>;
}