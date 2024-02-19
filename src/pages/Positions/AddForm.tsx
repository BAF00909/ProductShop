import { Form, Button, Input } from "antd";
import { IPosition } from "../../store/slices/types";
import { useState } from "react";

interface IAddFormProps {
    sendForm: (formData: IPosition) => void
}

export const Addfrom = ({sendForm}: IAddFormProps) => {
    const [fields, setField] = useState<IPosition>({} as IPosition);
    
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
            <Form.Item name="positionName" label="Наименование должности" >
                <Input onChange={(e: any) => {
                    onChangeHandler({ positionName: e.target.value })
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