import { Form, DatePicker, Button, Select, Input } from "antd";
import { IProductData, IProductGroup, ISupply, ISupplyUpdate } from "../../store/slices/types";
import { useEffect, useState } from "react";
import { useGetAllSuppliesQuery } from "../../api/supplies.api";
import dayjs from "dayjs";
import { useGetProductByIdQuery } from "../../api/product.api";
import { useGetAllProductsGroupQuery } from "../../api/productGroups.api";
interface IEditeFormProps {
    id: number;
    sendEditeForm: (formData: IProductData) => void
}
export const Editefrom = ({ id, sendEditeForm }: IEditeFormProps) => {
    const [form] = Form.useForm<any>();
    const [fields, setField] = useState<IProductData>({} as IProductData);
    const { data: product } = useGetProductByIdQuery(id);
    const { data: groups } = useGetAllProductsGroupQuery('');
    const { data: supplies } = useGetAllSuppliesQuery('');

    const submitForm = () => {
        sendEditeForm(fields);
    }
    const onChangeHandler = (data: Record<string, any>) => {
        setField(satte => ({ ...satte, ...data }));
    }
    useEffect(() => {
        if (product) {
            form.setFieldsValue({
                dateIn: product.dateIn,
                art: product.art,
                productName: product.productName,
                count: product.count,
                cost: product.cost,
                productGroupId: product.productGroup.id,
                supplyId: product.supply.id
            });
        }
    }, [product, form])
    useEffect(() => {
        if (product) {
            setField({
                id: product.id,
                dateIn: product.dateIn,
                art: product.art,
                productName: product.productName,
                count: product.count,
                cost: product.cost,
                productGroupId: product.productGroup.id,
                supplyId: product.supply.id
            })
        }
    }, [product])
    return (
        <Form
            form={form}
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

