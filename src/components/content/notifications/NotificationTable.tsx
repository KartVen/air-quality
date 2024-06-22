"use client";
import {FormEvent, useEffect, useState} from "react";
import Card from "@/components/content/utils/Card";
import CardHeader from "@/components/content/utils/CardHeader";
import CardBody from "@/components/content/utils/CardBody";
import {IoMdAdd, IoMdCheckmark, IoMdCreate} from "react-icons/io";
import {useSession} from "next-auth/react";
import notificationService from "@/utils/api/notification/notificationService";
import NotificationResponse from "@/utils/api/notification/types/notificationResponse";
import FormInput, {InputType} from "@/components/shared/form/FormInput";
import FormSelect, {FormSelectOption} from "@/components/shared/form/FormSelect";
import CompareStrategy from "@/utils/api/notification/types/compareStrategy";
import CreateNotificationRequest from "@/utils/api/notification/types/createNotificationRequest";

const rangeSigns: { value: CompareStrategy, label: string }[] = [
    {value: CompareStrategy.LESS_OR_EQUAL, label: '<='},
    {value: CompareStrategy.GREATER_OR_EQUAL, label: '>='}
] satisfies FormSelectOption[]

interface NotificationRequest extends CreateNotificationRequest {
    address_street: string,
    address_postalCode: string,
}


export default function NotificationTable() {
    const {data: session} = useSession();
    const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [newNotification, setNewNotification] = useState<Partial<NotificationRequest>>({
        compareStrategy: CompareStrategy.LESS_OR_EQUAL,
    });

    useEffect(() => {
        (async () => {
            if (!session) return;
            notificationService.get(session)
                .then(setNotifications)
                .catch(() => setNotifications([]));
        })();
    }, [session]);

    const handleOnChange = <T extends keyof Partial<NotificationRequest>>(key: T | string, value: NotificationRequest[T]) => {
        setNewNotification(prevState => ({
            ...prevState,
            [key]: value,
        }));
    };

    const handleApprove = async (notificationId: number) => {
        // TODO editing Approve
    };

    const handleEdit = (notificationId: number) => {
        // TODO editing
    };

    const handleSave = async (notificationId: number) => {
        // TODO editing Save
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        const formFieldsValidated: CreateNotificationRequest = {
            indexCode: newNotification.indexCode!,
            indexValue: newNotification.indexValue!,
            compareStrategy: newNotification.compareStrategy!,
            address: {
                street: newNotification.address_street!,
                postalCode: newNotification.address_postalCode!,
            }
        };

        session && notificationService.create(session, formFieldsValidated)
            .then(res => setNotifications(prevState => ({...prevState, res})))
            .catch(() => console.debug("Error adding notification"))
    };

    const mapRangeSignToLabel = (sign?: CompareStrategy) => {
        if (!sign) return ''
        const foundSign = Object.values(rangeSigns).find(s => s.value === sign);
        return foundSign?.label ?? '';
    }


    return (
        <Card>
            <CardHeader value="Ustawione powiadomienia"/>
            <CardBody>
                <form className="w-full" onSubmit={onSubmit}>
                    <table className="w-full divide-y divide-gray-200">
                        <thead className="border-b">
                        <tr className="text-gray-400 italic">
                            <th className="w-[18%]">Kod parametru</th>
                            <th className="w-[18%]">Znak</th>
                            <th className="w-[18%]">Wartość</th>
                            <th className="w-[18%]">Ulica</th>
                            <th className="w-[18%]">Kod pocztowy</th>
                            <th className="w-[10%] pb-1"></th>
                        </tr>
                        </thead>
                        <tbody className="text-center">
                        {notifications && notifications.map((notification) => (
                            editingId === notification.id ? (
                                <tr key={notification.id}>
                                    <td><input defaultValue={notification.indexCode}/></td>
                                    <td><input defaultValue={mapRangeSignToLabel(notification.compareStrategy)}/></td>
                                    <td><input defaultValue={notification.indexValue}/></td>
                                    <td><input defaultValue={`${notification.address.street}`}/></td>
                                    <td><input defaultValue={`${notification.address.postalCode}`}/></td>
                                    <td className="py-1.5">
                                        <button
                                            type="button"
                                            onClick={() => handleSave(notification.id)}
                                            className="bg-blue-700 hover:bg-blue-900 text-white px-3 py-1"
                                        >Save
                                        </button>
                                    </td>
                                </tr>
                            ) : (
                                <tr key={notification.id}>
                                    <td>{notification.indexCode}</td>
                                    <td>{mapRangeSignToLabel(notification.compareStrategy)}</td>
                                    <td>{notification.indexValue}</td>
                                    <td>{notification.address.street}</td>
                                    <td>{notification.address.postalCode}</td>
                                    <td className="py-1.5">
                                        <button
                                            type="button"
                                            onClick={() => handleEdit(notification.id)}
                                            className="bg-yellow-700 hover:bg-yellow-900 text-white px-3 py-1"
                                        >
                                            <IoMdCreate/>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleApprove(notification.id)}
                                            className="bg-green-700 hover:bg-green-900 text-white px-3 py-1 ml-2"
                                        >
                                            <IoMdCheckmark/>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                        <tr>
                            <td>
                                <FormInput id="index_code"
                                           className="px-3 py-2 bg-transparent text-center"
                                           placeholder="Kod parametru"
                                           value={newNotification.indexCode ?? ''}
                                           onChange={e => handleOnChange('indexCode', e.target.value)}/>
                            </td>
                            <td>
                                <FormSelect id="range_sign"
                                            className="px-3 py-2 bg-transparent text-center"
                                            options={rangeSigns}
                                            onChange={e =>
                                                setNewNotification(prevState => ({
                                                    ...prevState,
                                                    compareStrategy: CompareStrategy[e.target.value as keyof typeof CompareStrategy],
                                                }))
                                            }/>
                            </td>
                            <td>
                                <FormInput id="index_value"
                                           className="px-3 py-2 bg-transparent text-center"
                                           type={InputType.NUMBER}
                                           placeholder="Wartość"
                                           value={newNotification.indexValue ?? ''}
                                           onChange={e => handleOnChange('indexValue', Number(e.target.value))}/>
                            </td>
                            <td>
                                <FormInput id="address_street"
                                           className="px-3 py-2 bg-transparent text-center"
                                           placeholder="Ulica"
                                           value={newNotification.address_street ?? ''}
                                           onChange={e => handleOnChange('address_street', e.target.value)}/>
                            </td>
                            <td>
                                <FormInput id="address_postalCode"
                                           className="px-3 py-2 bg-transparent text-center"
                                           placeholder="Kod pocztowy"
                                           value={newNotification.address_postalCode ?? ''}
                                           onChange={e => handleOnChange('address_postalCode', e.target.value)}/>
                            </td>
                            <td className="py-1.5">
                                <button
                                    className="bg-green-700 hover:bg-green-900 text-white px-3 py-1"
                                    type="submit"
                                >
                                    <IoMdAdd/>
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </CardBody>
        </Card>
    );
}
