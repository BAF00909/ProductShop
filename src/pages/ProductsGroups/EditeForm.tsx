import { Form, Button, Input } from "antd";
import { IProductGroup } from "../../store/slices/types";
import { useEffect, useState } from "react";
import { useGetProductGroupQuery } from "../../api/productGroups.api";
interface IEditeFormProps {
    id: number;
    sendEditeForm: (formData: IProductGroup) => void
}
export const Editefrom = ({ id, sendEditeForm }: IEditeFormProps) => {
    const [form] = Form.useForm<any>();
    const [fields, setField] = useState<IProductGroup>({} as IProductGroup);
    const { data: group } = useGetProductGroupQuery(id);

    const submitForm = () => {
        sendEditeForm(fields);
    }
    const onChangeHandler = (data: Record<string, any>) => {
        setField(satte => ({ ...satte, ...data }));
    }
    useEffect(() => {
        if (group) {
            form.setFieldsValue({
                groupName: group?.groupName ?? ''
            });
        }
    }, [group, form])
    useEffect(() => {
        if (group) {
            setField({
                id: group?.id,
                groupName: group?.groupName ?? ''
            })
        }
    }, [group])
    return (
        <Form
            form={form}
            style={{ width: '300px' }}
            layout="vertical"
            initialValues={{
                groupName: group?.groupName ?? ''
            }}
        >
            <Form.Item name="groupName" label="Наименование должности">
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