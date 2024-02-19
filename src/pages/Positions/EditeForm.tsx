import { Form, Button, Input } from "antd";
import { useGetPositionQuery } from "../../api/positions.api";
import { IPosition } from "../../store/slices/types";
import { useEffect, useState } from "react";
interface IEditeFormProps {
    id: number;
    sendEditeForm: (formData: IPosition) => void
}
export const Editefrom = ({ id, sendEditeForm }: IEditeFormProps) => {
    const [form] = Form.useForm<any>();
    const [fields, setField] = useState<IPosition>({} as IPosition);
    const { data: position } = useGetPositionQuery(id);

    const submitForm = () => {
        sendEditeForm(fields);
    }
    const onChangeHandler = (data: Record<string, any>) => {
        setField(satte => ({ ...satte, ...data }));
    }
    useEffect(() => {
        if (position) {
            form.setFieldsValue({
                positionName: position?.positionName ?? ''
            });
        }
    }, [position, form])
    useEffect(() => {
        if (position) {
            setField({
                id: position?.id,
                positionName: position?.positionName ?? ''
            })
        }
    }, [position])
    return (
        <Form
            form={form}
            style={{ width: '300px' }}
            layout="vertical"
            initialValues={{
                positionName: position?.positionName ?? ''
            }}
        >
            <Form.Item name="positionName" label="Наименование должности">
                <Input
                    onChange={(e: any) => {
                        onChangeHandler({ positionName: e.target.value })
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