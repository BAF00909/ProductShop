import { Form, DatePicker, Button, Select } from "antd";
import { IEmployeeData, IProvider, ISupplyUpdate } from "../../store/slices/types";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useGetSupplyByIdQuery } from "../../api/supplies.api";
import { useGetAllEmployeesQuery } from "../../api/employee.api";
import { useGetAllProvidersQuery } from "../../api/providers.api";
import dayjs from "dayjs";
interface IEditeFormProps {
    id: number;
    sendEditeForm: (formData: ISupplyUpdate) => void
}
export const Editefrom = ({ id, sendEditeForm }: IEditeFormProps) => {
    const [form] = Form.useForm<any>();
    const [fields, setField] = useState<ISupplyUpdate>({} as ISupplyUpdate);
    const { data: supply } = useGetSupplyByIdQuery(id);
    const { data: employees } = useGetAllEmployeesQuery('');
    const { data: providers } = useGetAllProvidersQuery('');

    const submitForm = () => {
        sendEditeForm(fields);
    }
    const onChangeHandler = (data: Record<string, any>) => {
        setField(satte => ({ ...satte, ...data }));
    }
    useEffect(() => {
        if (supply) {
            form.setFieldsValue({
                date: dayjs(supply.date),
                employeeId: supply.employeeAccepted.id,
                providerId: supply.provider.id
            });
        }
    }, [supply, form])
    useEffect(() => {
        if (supply) {
            setField({
                id: supply.id,
                date: supply.date,
                employeeId: supply.employeeAccepted.id,
                providerId: supply.provider.id
            })
        }
    }, [supply])
    return (
        <Form
            form={form}
            style={{ width: '300px' }}
            layout="vertical"
            initialValues={{
                lastName: supply?.lastName ?? ''
            }}
        >
            <Form.Item name="date" label="Дата поставки">
                <DatePicker
                    format="YYYY-MM-DD"
                    showTime
                    onChange={(e: any) => {
                        onChangeHandler({ date: format(new Date(e), "yyyy-MM-dd'T'HH:MM:ss'Z'") })
                    }} />
            </Form.Item>
            <Form.Item name="employeeId" label="Сотрудник принявший поставку">
                <Select
                    options={employees && employees.map((item: IEmployeeData) => ({ value: item.id, label: item.fullName }))}
                    onSelect={(item: any) => {
                        onChangeHandler({ employeeId: item })
                    }}
                />
            </Form.Item>
            <Form.Item name="providerId" label="Поставщик">
                <Select
                    options={providers && providers.map((item: IProvider) => ({ value: item.id, label: item.providerName }))}
                    onSelect={(item: any) => {
                        onChangeHandler({ providerId: item })
                    }}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" onClick={submitForm}>
                    Отправить
                </Button>
            </Form.Item>
        </Form>
    );
}

