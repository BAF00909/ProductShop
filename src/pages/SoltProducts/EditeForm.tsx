import { Form, DatePicker, Button, Select } from "antd";
import { IEmployeeData, IProductData, ISoltProductUpdate } from "../../store/slices/types";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useGetAllProductsQuery } from "../../api/product.api";
import { useGetSoltProductByIdQuery } from "../../api/soltProduct.api";
import { format } from "date-fns";
import { useGetAllEmployeesQuery } from "../../api/employee.api";
interface IEditeFormProps {
    id: number;
    sendEditeForm: (formData: ISoltProductUpdate) => void
}
export const Editefrom = ({ id, sendEditeForm }: IEditeFormProps) => {
    const [form] = Form.useForm<any>();
    const [fields, setField] = useState<ISoltProductUpdate>({} as ISoltProductUpdate);
    const { data: soltProduct } = useGetSoltProductByIdQuery(id);
    const { data: products } = useGetAllProductsQuery('');
    const { data: employees } = useGetAllEmployeesQuery('');

    const submitForm = () => {
        sendEditeForm(fields);
    }
    const onChangeHandler = (data: Record<string, any>) => {
        setField(satte => ({ ...satte, ...data }));
    }
    useEffect(() => {
        if (soltProduct) {
            form.setFieldsValue({
                date: dayjs(soltProduct.date),
                productId: soltProduct.product.id,
                employeeId: soltProduct.employee.id
            });
        }
    }, [soltProduct, form])
    useEffect(() => {
        if (soltProduct) {
            setField({
                id: soltProduct.id,
                date: soltProduct.date,
                productId: soltProduct.product.id,
                employeeId: Number(soltProduct.employee.id)
            })
        }
    }, [soltProduct])
    return (
        <Form
            form={form}
            style={{ width: '300px' }}
            layout="vertical"
        >
            <Form.Item name="date" label="Дата продажи">
                <DatePicker
                    format="YYYY-MM-DD"
                    showTime
                    onChange={(e: any) => {
                        onChangeHandler({ date: format(new Date(e), "yyyy-MM-dd'T'HH:MM:ss'Z'") })
                    }} />
            </Form.Item>
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

