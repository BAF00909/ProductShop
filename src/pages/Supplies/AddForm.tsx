import { Form, Button, Select } from "antd";
import { IEmployeeData, IProvider, ISupply } from "../../store/slices/types";
import { useState } from "react";
import { useGetAllEmployeesQuery } from "../../api/employee.api";
import { useGetAllProvidersQuery } from "../../api/providers.api";
import { format } from "date-fns";

interface IAddFormProps {
    sendForm: (formData: ISupply) => void
}

export const Addfrom = ({ sendForm }: IAddFormProps) => {
    const [fields, setField] = useState<ISupply>({date: format(new Date(), "yyyy-MM-dd'T'HH:MM:ss'Z'")} as ISupply);
    const {data: employees} = useGetAllEmployeesQuery('');
    const {data: providers} = useGetAllProvidersQuery('');

    const submitForm = () => {
        sendForm(fields);
    }
    const onChangeHandler = (data: Record<string, any>) => {
        setField(satte => ({ ...satte, ...data }));
    }
    return (
        <Form
            style={{ width: '300px' }}
            layout="vertical"
        >
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