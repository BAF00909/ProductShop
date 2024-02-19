import { Form, Button, Input } from "antd";
import { IReason } from "../../store/slices/types";
import { useEffect, useState } from "react";
import { useGetReasonQuery } from "../../api/reqsonReturn.api";
interface IEditeFormProps {
    id: number;
    sendEditeForm: (formData: IReason) => void
}
export const Editefrom = ({ id, sendEditeForm }: IEditeFormProps) => {
    const [form] = Form.useForm<any>();
    const [fields, setField] = useState<IReason>({} as IReason);
    const { data: reason } = useGetReasonQuery(id);

    const submitForm = () => {
        sendEditeForm(fields);
    }
    const onChangeHandler = (data: Record<string, any>) => {
        setField(satte => ({ ...satte, ...data }));
    }
    useEffect(() => {
        if (reason) {
            form.setFieldsValue({
                groupName: reason?.groupName ?? ''
            });
        }
    }, [reason, form])
    useEffect(() => {
        if (reason) {
            setField({
                id: reason?.id,
                groupName: reason?.groupName ?? ''
            })
        }
    }, [reason])
    return (
        <Form
            form={form}
            style={{ width: '300px' }}
            layout="vertical"
            initialValues={{
                groupName: reason?.groupName ?? ''
            }}
        >
            <Form.Item name="groupName" label="Описание">
                <Input
                    onChange={(e: any) => {
                        onChangeHandler({ groupName: e.target.value })
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