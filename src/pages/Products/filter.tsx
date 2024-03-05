import { Form, Input, Select, Button, DatePicker } from "antd";
import { useGetAllProductsGroupQuery } from "../../api/productGroups.api";
import { useGetAllSuppliesQuery } from "../../api/supplies.api";
import { IProductGroup, ISupply } from "../../store/slices/types";
import { useState } from "react";
import styles from './Products.module.css';
import { format } from "date-fns";
interface IFilterProps {
    setFilter: (prop: Record<string, any>) => void
}
export const Filter = ({ setFilter }: IFilterProps): JSX.Element => {
    const [form] = Form.useForm<any>();
    const [fields, setFields] = useState<Record<string, any>>({});
    const { data: groups } = useGetAllProductsGroupQuery('');
    const { data: supplies } = useGetAllSuppliesQuery('');

    const submitForm = () => {
        setFilter(fields);
    }
    const clearFilter = () => {
        setFields({});
        setFilter({});
        form.resetFields();
    }
    const onChangeHandler = (field: Record<string, any>) => {
        setFields(fields => ({ ...fields, ...field }));
    }
    return (
        <>
            <Form
                style={{ width: '300px' }}
                layout="vertical"
                form={form}
                className={styles.formFilter}
            >
                <Form.Item name="art" label="Артикул" >
                    <Input
                        onChange={(e: any) => {
                            onChangeHandler({ art: e.target.value })
                        }}
                    />
                </Form.Item>
                <Form.Item name="productName" label="Наименование продукта" >
                    <Input
                        onChange={(e: any) => {
                            onChangeHandler({ productName: e.target.value })
                        }}
                    />
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
                <Form.Item name="dateInStart" label="Дата поступления с">
                    <DatePicker
                        format="YYYY-MM-DD"
                        showTime
                        onChange={(e: any) => {
                            onChangeHandler({ dateInStart: format(new Date(e), "yyyy-MM-dd'T'HH:MM:ss'Z'") })
                        }} />
                </Form.Item>
                <Form.Item name="dateInFinish" label="Дата поступления по">
                    <DatePicker
                        format="YYYY-MM-DD"
                        showTime
                        onChange={(e: any) => {
                            onChangeHandler({ dateInFinish: format(new Date(e), "yyyy-MM-dd'T'HH:MM:ss'Z'") })
                        }} />
                </Form.Item>
            </Form>
            <div className={styles.formFilterFooter}>
                <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={submitForm}>
                        Применить
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={clearFilter}>
                        Очистить
                    </Button>
                </Form.Item>
            </div>
        </>
    );
}