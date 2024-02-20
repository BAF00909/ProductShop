import { Form, Button, Select } from "antd";
import { IEmployeeData, IReason, IReturnedProductData, ISoltProduct } from "../../store/slices/types";
import { useState } from "react";
import { format } from "date-fns";
import { useGetAllEmployeesQuery } from "../../api/employee.api";
import { useGetAllReasonQuery } from "../../api/reqsonReturn.api";
import { useGetAllSoltProductsQuery } from "../../api/soltProduct.api";

interface IAddFormProps {
    sendForm: (formData: IReturnedProductData) => void
}

export const Addfrom = ({ sendForm }: IAddFormProps) => {
    const [fields, setField] = useState<IReturnedProductData>({ date: format(new Date(), "yyyy-MM-dd'T'HH:MM:ss'Z'") } as IReturnedProductData);
    const { data: soltProducts } = useGetAllSoltProductsQuery('');
    const { data: employees } = useGetAllEmployeesQuery('');
    const {data: reasons} = useGetAllReasonQuery('');

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
            <Form.Item name="soltProductId" label="Товар">
                <Select
                    options={soltProducts && soltProducts.map((item: ISoltProduct) => ({ value: item.id, label: `${item.id} - ${item.product.productName} - ${item.date}` }))}
                    onSelect={(item: any) => {
                        onChangeHandler({ soltProductId: item })
                    }}
                />
            </Form.Item>
            <Form.Item name="reasonReturnId" label="Причина возврата">
                <Select
                    options={reasons && reasons.map((item: IReason) => ({ value: item.id, label: item.groupName }))}
                    onSelect={(item: any) => {
                        onChangeHandler({ reasonReturnId: item })
                    }}
                />
            </Form.Item>
            <Form.Item name="employeeGetterId" label="Принял">
                <Select
                    options={employees && employees.map((item: IEmployeeData) => ({ value: item.id, label: item.fullName }))}
                    onSelect={(item: any) => {
                        onChangeHandler({ employeeGetterId: item })
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