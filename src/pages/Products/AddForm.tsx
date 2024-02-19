import { Form, Button, Select, Input, DatePicker } from "antd";
import { IProductData, IProductGroup, IProvider, ISupply } from "../../store/slices/types";
import { useState } from "react";
import { useGetAllProvidersQuery } from "../../api/providers.api";
import { format } from "date-fns";
import { useGetAllProductsGroupQuery } from "../../api/productGroups.api";
import { useGetAllSuppliesQuery } from "../../api/supplies.api";

interface IAddFormProps {
    sendForm: (formData: IProductData) => void
}

export const Addfrom = ({ sendForm }: IAddFormProps) => {
    const [fields, setField] = useState<IProductData>({ dateIn: format(new Date(), "yyyy-MM-dd'T'HH:MM:ss'Z'") } as IProductData);
    const { data: groups } = useGetAllProductsGroupQuery('');
    const { data: supplies } = useGetAllSuppliesQuery('');

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
            <Form.Item name="art" label="Артикул" >
                <Input onChange={(e: any) => {
                    onChangeHandler({ art: e.target.value })
                }} />
            </Form.Item>
            <Form.Item name="productName" label="Наименование продукта" >
                <Input onChange={(e: any) => {
                    onChangeHandler({ productName: e.target.value })
                }} />
            </Form.Item>
            <Form.Item name="count" label="Количество" >
                <Input onChange={(e: any) => {
                    onChangeHandler({ count: e.target.value })
                }} />
            </Form.Item>
            <Form.Item name="cost" label="Цена" >
                <Input onChange={(e: any) => {
                    onChangeHandler({ cost: e.target.value })
                }} />
            </Form.Item>
            <Form.Item name="productGroupId" label="Категория">
                <Select
                    options={groups && groups.map((item: IProductGroup) => ({ value: item.id, label: item.groupName }))}
                    onSelect={(item: any) => {
                        onChangeHandler({ productGroupId: item })
                    }}
                />
            </Form.Item>
            <Form.Item name="supplyId" label="Поставка">
                <Select
                    options={supplies && supplies.map((item: ISupply) => ({ value: item.id, label: `${item.date} ${item.provider.providerName}` }))}
                    onSelect={(item: any) => {
                        onChangeHandler({ supplyId: item })
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