import { Form, Button, Input } from "antd";
import { IReason } from "../../store/slices/types";
import { useState } from "react";

interface IAddFormProps {
    sendForm: (formData: IReason) => void
}

export const Addfrom = ({sendForm}: IAddFormProps) => {
    const [fields, setField] = useState<IReason>({} as IReason);
    
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
            <Form.Item name="groupName" label="Описание" >
                <Input onChange={(e: any) => {
                    onChangeHandler({ groupName: e.target.value })
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