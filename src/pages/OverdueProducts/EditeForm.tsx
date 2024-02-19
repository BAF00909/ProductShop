import { Form, DatePicker, Button, Select } from "antd";
import { IEmployeeData, IOverdueProductUpdate, IProductData } from "../../store/slices/types";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useGetAllProductsQuery } from "../../api/product.api";
import { format } from "date-fns";
import { useGetAllEmployeesQuery } from "../../api/employee.api";
import { useGetOverdueProductByIdQuery } from "../../api/overdueProduct.api";
interface IEditeFormProps {
    id: number;
    sendEditeForm: (formData: IOverdueProductUpdate) => void
}
export const Editefrom = ({ id, sendEditeForm }: IEditeFormProps) => {
    const [form] = Form.useForm<any>();
    const [fields, setField] = useState<IOverdueProductUpdate>({} as IOverdueProductUpdate);
    const { data: soltProduct } = useGetOverdueProductByIdQuery(id);
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
                createDate: dayjs(soltProduct.createDate),
                productOverdueId: soltProduct.product.id,
                employeeDecommisionId: soltProduct.employee.id
            });
        }
    }, [soltProduct, form])
    useEffect(() => {
        if (soltProduct) {
            setField({
                id: soltProduct.id,
                createDate: soltProduct.createDate,
                productOverdueId: soltProduct.product.id,
                employeeDecommisionId: Number(soltProduct.employee.id)
            })
        }
    }, [soltProduct])
    return (
        <Form
            form={form}
            style={{ width: '300px' }}
            layout="vertical"
        >
            <Form.Item name="createDate" label="Дата продажи">
                <DatePicker
                    format="YYYY-MM-DD"
                    showTime
                    onChange={(e: any) => {
                        onChangeHandler({ createDate: format(new Date(e), "yyyy-MM-dd'T'HH:MM:ss'Z'") })
                    }} />
            </Form.Item>
            <Form.Item name="productOverdueId" label="Товар">
                <Select
                    options={products && products.map((item: IProductData) => ({ value: item.id, label: item.productName }))}
                    onSelect={(item: any) => {
                        onChangeHandler({ productOverdueId: item })
                    }}
                />
            </Form.Item>
            <Form.Item name="employeeDecommisionId" label="Продал">
                <Select
                    options={employees && employees.map((item: IEmployeeData) => ({ value: item.id, label: item.fullName }))}
                    onSelect={(item: any) => {
                        onChangeHandler({ employeeDecommisionId: item })
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

