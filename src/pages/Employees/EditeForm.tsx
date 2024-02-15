import { Form, DatePicker, Button, Input, Select } from "antd";
import { useGetAllPositionsQuery } from "../../api/positions.api";
import { IEmployee, IPosition } from "../../store/slices/types";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import dayjs from 'dayjs';
import { useGetEmployeeByIdQuery } from "../../api/employee.api";
interface IEditeFormProps {
    id: number;
    sendEditeForm: (formData: IEmployee) => void
}
export const Editefrom = ({ id, sendEditeForm }: IEditeFormProps) => {
    const [form] = Form.useForm<any>();
    const { data: positions } = useGetAllPositionsQuery('');
    const [fields, setField] = useState<IEmployee>({ finishDate: '' } as IEmployee);
    const { data: employee } = useGetEmployeeByIdQuery(id);

    const submitForm = () => {
        sendEditeForm(fields);
    }
    const onChangeHandler = (data: Record<string, any>) => {
        setField(satte => ({ ...satte, ...data }));
    }
    useEffect(() => {
        if (employee) {
            form.setFieldsValue({
                lastName: employee?.lastName ?? '',
                firstName: employee?.firstName ?? '',
                secondName: employee?.secondName ?? '',
                birthday: dayjs(employee?.birthday) ?? '',
                positionId: employee?.position?.id ?? '',
                startDate: dayjs(employee?.startDate) ?? '',
                finishDate: dayjs(employee?.finishDate) ?? '',
            });
        }
    }, [employee, form])
    useEffect(() => {
        if (employee) {
            setField({
                id: employee?.id,
                lastName: employee?.lastName ?? '',
                firstName: employee?.firstName ?? '',
                secondName: employee?.secondName ?? '',
                birthday: employee?.birthday ?? '',
                positionId: employee?.position?.id ?? '',
                startDate: employee?.startDate ?? '',
                finishDate: employee?.finishDate ?? '',
            })
        }
    }, [employee])
    return (
        <Form
            form={form}
            style={{ width: '300px' }}
            layout="vertical"
            initialValues={{
                lastName: employee?.lastName ?? ''
            }}
        >
            <Form.Item name="lastName" label="Фамилия">
                <Input
                    onChange={(e: any) => {
                        onChangeHandler({ lastName: e.target.value })
                    }}
                />
            </Form.Item>
            <Form.Item name="firstName" label="Имя" initialValue={employee?.firstName ?? ''}>
                <Input
                    onChange={(e: any) => {
                        onChangeHandler({ firstName: e.target.value })
                    }}
                />
            </Form.Item>
            <Form.Item name="secondName" label="Отчество" initialValue={employee?.secondName ?? ''}>
                <Input
                    onChange={(e: any) => {
                        onChangeHandler({ secondName: e.target.value })
                    }}
                />
            </Form.Item>
            <Form.Item name="birthday" label="Дата рождения">
                <DatePicker
                    format="YYYY-MM-DD"
                    onChange={(e: any) => {
                        onChangeHandler({ birthday: format(new Date(e), 'yyyy-MM-dd') })
                    }} />
            </Form.Item>
            <Form.Item name="positionId" label="Должность">
                <Select
                    options={positions && positions.map((item: IPosition) => ({ value: item.id, label: item.positionName }))}
                    onSelect={(item: any) => {
                        onChangeHandler({ positionId: item })
                    }}
                />
            </Form.Item>
            <Form.Item name="startDate" label="Дата трудоустройства" >
                <DatePicker
                    format="YYYY-MM-DD"
                    onChange={(e: any) => {
                        onChangeHandler({ startDate: format(new Date(e), 'yyyy-MM-dd') })
                    }} />
            </Form.Item>
            <Form.Item name="finishDate" label="Дата увольнения" >
                <DatePicker
                    format="YYYY-MM-DD"
                    onChange={(e: any) => {
                        onChangeHandler({ finishDate: format(new Date(e), 'yyyy-MM-dd') })
                    }} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" onClick={submitForm}>
                    Отправить
                </Button>
            </Form.Item>
        </Form>
    );
}