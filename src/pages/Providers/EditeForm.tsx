import { Form, Button, Input } from "antd";
import { IProvider } from "../../store/slices/types";
import { useEffect, useState } from "react";
import { useGetProviderQuery } from "../../api/providers.api";
interface IEditeFormProps {
    id: number;
    sendEditeForm: (formData: IProvider) => void
}
export const Editefrom = ({ id, sendEditeForm }: IEditeFormProps) => {
    const [form] = Form.useForm<any>();
    const [fields, setField] = useState<IProvider>({} as IProvider);
    const { data: provider } = useGetProviderQuery(id);

    const submitForm = () => {
        sendEditeForm(fields);
    }
    const onChangeHandler = (data: Record<string, any>) => {
        setField(satte => ({ ...satte, ...data }));
    }
    useEffect(() => {
        if (provider) {
            form.setFieldsValue({
                providerName: provider?.providerName ?? ''
            });
        }
    }, [provider, form])
    useEffect(() => {
        if (provider) {
            setField({
                id: provider?.id,
                providerName: provider?.providerName ?? ''
            })
        }
    }, [provider])
    return (
        <Form
            form={form}
            style={{ width: '300px' }}
            layout="vertical"
            initialValues={{
                providerName: provider?.providerName ?? ''
            }}
        >
            <Form.Item name="providerName" label="Наименование поставщика">
                <Input
                    onChange={(e: any) => {
                        onChangeHandler({ providerName: e.target.value })
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