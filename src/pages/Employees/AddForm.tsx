import { Form, DatePicker, Button, Input, Select } from "antd";
import { useGetAllPositionsQuery } from "../../api/positions.api";
import { IEmployee, IPosition } from "../../store/slices/types";
import { useState } from "react";
import { format } from "date-fns";

interface IAddFormProps {
    sendForm: (formData: IEmployee) => void
}

export const Addfrom = ({sendForm}: IAddFormProps) => {
    const { data: positions } = useGetAllPositionsQuery('');
    const [fields, setField] = useState<IEmployee>({ finishDate: '' } as IEmployee);
    
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
            <Form.Item name="lastName" label="Фамилия" >
                <Input onChange={(e: any) => {
                    onChangeHandler({ lastName: e.target.value })
                }} />
            </Form.Item>
            <Form.Item name="firstName" label="Имя" >
                <Input onChange={(e: any) => {
                    onChangeHandler({ firstName: e.target.value })
                }} />
            </Form.Item>
            <Form.Item name="secondName" label="Отчество" >
                <Input onChange={(e: any) => {
                    onChangeHandler({ secondName: e.target.value })
                }} />
            </Form.Item>
            <Form.Item name="birthday" label="Дата рождения" >
                <DatePicker
                    format="YYYY-MM-DD"
                    onChange={(e: any) => {
                        onChangeHandler({ birthday: format(new Date(e), 'yyyy-MM-dd') })
                    }} />
            </Form.Item>
            <Form.Item name="positionId">
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
            <Form.Item>
                <Button type="primary" htmlType="submit" onClick={submitForm}>
                    Отправить
                </Button>
            </Form.Item>
        </Form>
    );
}