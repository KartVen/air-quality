"use client";
import FormInputField, {FormFieldData, InputType} from "@/components/shared/form/FormInputField";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {FormError, PASSWORD_VALIDATOR, VALIDATOR} from "@/components/shared/form/utils/validators";
import {isAnyFormFieldError, isSameValues} from "@/components/shared/form/utils/helpers";
import {useSession} from "next-auth/react";
import profileService from "@/utils/api/profile/profileService";
import Address from "@/utils/api/notification/types/address";
import CardHeader from "@/components/content/utils/CardHeader";
import {Status} from "@/utils/types";
import CardBody from "@/components/content/utils/CardBody";
import Card from "@/components/content/utils/Card";

const ADDRESS_SUCCESS = "Zmieniono!";

interface FormFields {
    street: FormFieldData;
    postal_code: FormFieldData;
}

const formFieldsInputs: { id: keyof FormFields, type: InputType, [key: string]: string }[] = [
    {
        id: "street",
        type: InputType.TEXT,
        label: "Ulica",
        placeholder: "Adres ulicy",
    },
    {
        id: "postal_code",
        type: InputType.TEXT,
        label: "Kod pocztowy",
        placeholder: "Kod pocztowy",
    },
];

interface DashboardAiqChangeFormProps {
    address?: Address,
    setAddress: (value: Address) => void
}

export default function DashboardAiqChangeForm({address, setAddress}: DashboardAiqChangeFormProps) {
    const {data: session, update: updateSession} = useSession();
    const [formFields, setFormFields] =
        useState<FormFields>({
            street: {value: address?.street ?? ''},
            postal_code: {value: address?.postalCode ?? ''},
        });
    const [isProcessSuccess, setIsProcessSuccess] = useState<boolean>(false)

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        const formFieldsValidated = {
            street: VALIDATOR.validate(formFields.street),
            postal_code: VALIDATOR.validate(formFields.postal_code),
        } satisfies FormFields;
        setFormFields(formFieldsValidated);

        if (isAnyFormFieldError(formFieldsValidated)) return;

        const newAddress: Address = {
            street: formFieldsValidated.street.value,
            postalCode: formFieldsValidated.postal_code.value,
        }

        session && updateSession({
            ...session, user: {
                ...session.user, address: newAddress
            }
        })
            .then(() => (setIsProcessSuccess(true)))
            .catch(err => {
                console.debug(err);
                setIsProcessSuccess(false);
            });
        setAddress(newAddress);
    };

    const handleOnChange = (field: keyof FormFields, e: ChangeEvent<HTMLInputElement>) => {
        setFormFields(prevFormFields => ({
            ...prevFormFields,
            [field]: {value: e.target.value, error: undefined}
        }));
    };

    const handleOnBlur = (field: keyof FormFields) => {
        if (PASSWORD_VALIDATOR.isEmpty(formFields[field]))
            setFormFields(prevState => ({
                ...prevState,
                [field]: {...formFields[field], error: FormError.PASSWORD_REQUIRED},
            }));
    };


    return <Card>
        <CardHeader value="Zmiana adresu podglądu"/>
        <CardBody>
            <form className="flex flex-col gap-5" onSubmit={onSubmit}>
                <div className="flex flex-row gap-5">
                    {formFieldsInputs.map(field => (
                        <FormInputField
                            key={field.id}
                            id={field.id}
                            type={field.type}
                            label={field.label}
                            placeholder={field.placeholder}
                            fieldData={formFields[field.id]}
                            onChange={e => handleOnChange(field.id, e)}
                            onBlur={() => handleOnBlur(field.id)}
                        />
                    ))}
                </div>
                <div className="flex justify-center items-center pt-2">
                    <button className="w-1/2 p-3 rounded-2xl bg-blue-900 hover:bg-blue-800 font-semibold" type="submit">
                        Zmień
                    </button>
                </div>
            </form>
            {isProcessSuccess && <div className="w-full pt-2 text-green-500 text-center">{ADDRESS_SUCCESS}</div>}
        </CardBody>
    </Card>;
}