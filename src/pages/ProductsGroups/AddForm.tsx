import { Form, Button, Input } from "antd";
import { IProductGroup } from "../../store/slices/types";
import { useState } from "react";

interface IAddFormProps {
    sendForm: (formData: IProductGroup) => void
}

export const Addfrom = ({sendForm}: IAddFormProps) => {
    const [fields, setField] = useState<IProductGroup>({} as IProductGroup);
    
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
            <Form.Item name="groupName" label="Наименование категории товара" >
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