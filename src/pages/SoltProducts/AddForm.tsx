import { Form, Button, Select, Input } from "antd";
import { IEmployeeData, IProductData, ISoltProductData } from "../../store/slices/types";
import { useState } from "react";
import { format } from "date-fns";
import { useGetAllProductsQuery } from "../../api/product.api";
import { useGetAllEmployeesQuery } from "../../api/employee.api";

interface IAddFormProps {
    sendForm: (formData: ISoltProductData) => void
}

export const Addfrom = ({ sendForm }: IAddFormProps) => {
    const [fields, setField] = useState<ISoltProductData>({ date: format(new Date(), "yyyy-MM-dd'T'HH:MM:ss'Z'") } as ISoltProductData);
    const { data: products } = useGetAllProductsQuery('');
    const { data: employees } = useGetAllEmployeesQuery('');

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
            <Form.Item name="productId" label="Товар">
                <Select
                    options={products && products.map((item: IProductData) => ({ value: item.id, label: item.productName }))}
                    onSelect={(item: any) => {
                        onChangeHandler({ productId: item })
                    }}
                />
            </Form.Item>
            <Form.Item name="employeeId" label="Продал">
                <Select
                    options={employees && employees.map((item: IEmployeeData) => ({ value: item.id, label: item.fullName }))}
                    onSelect={(item: any) => {
                        onChangeHandler({ employeeId: item })
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