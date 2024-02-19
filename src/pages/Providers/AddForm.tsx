import { Form, Button, Input } from "antd";
import { IProvider } from "../../store/slices/types";
import { useState } from "react";

interface IAddFormProps {
    sendForm: (formData: IProvider) => void
}

export const Addfrom = ({sendForm}: IAddFormProps) => {
    const [fields, setField] = useState<IProvider>({} as IProvider);
    
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
            <Form.Item name="providerName" label="Наименование поставщика" >
                <Input onChange={(e: any) => {
                    onChangeHandler({ providerName: e.target.value })
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