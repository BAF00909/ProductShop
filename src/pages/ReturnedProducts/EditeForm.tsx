import { Form, DatePicker, Button, Select } from "antd";
import { IEmployeeData, IReason, IReturnedProductUpdate, ISoltProduct, ISoltProductUpdate } from "../../store/slices/types";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { format } from "date-fns";
import { useGetAllEmployeesQuery } from "../../api/employee.api";
import { useGetReturnedProductByIdQuery } from "../../api/returnedProducts.api";
import { useGetAllSoltProductsQuery } from "../../api/soltProduct.api";
import { useGetAllReasonQuery } from "../../api/reqsonReturn.api";
interface IEditeFormProps {
    id: number;
    sendEditeForm: (formData: IReturnedProductUpdate) => void
}
export const Editefrom = ({ id, sendEditeForm }: IEditeFormProps) => {
    const [form] = Form.useForm<any>();
    const [fields, setField] = useState<IReturnedProductUpdate>({} as IReturnedProductUpdate);
    const {data: returnedProduct} = useGetReturnedProductByIdQuery(id)
    const { data: soltProducts } = useGetAllSoltProductsQuery('');
    const { data: employees } = useGetAllEmployeesQuery('');
    const {data: reasons} = useGetAllReasonQuery('');

    const submitForm = () => {
        sendEditeForm(fields);
    }
    const onChangeHandler = (data: Record<string, any>) => {
        setField(satte => ({ ...satte, ...data }));
    }
    useEffect(() => {
        if (returnedProduct) {
            form.setFieldsValue({
                date: dayjs(returnedProduct.date),
                soltProductId: returnedProduct.soltProduct.id,
                reasonReturnId: returnedProduct.reasonReturn.id,
                employeeGetterId: returnedProduct.employeeGetterId
            });
        }
    }, [returnedProduct, form])
    useEffect(() => {
        if (returnedProduct) {
            setField({
                id: returnedProduct.id,
                date: returnedProduct.date,
                soltProductId: returnedProduct.id,
                reasonReturnId: returnedProduct.reasonReturn.id,
                employeeGetterId: Number(returnedProduct.employeeGetterId)
            })
        }
    }, [returnedProduct])
    return (
        <Form
            form={form}
            style={{ width: '300px' }}
            layout="vertical"
        >
            <Form.Item name="createDate" label="Дата возврата">
                <DatePicker
                    format="YYYY-MM-DD"
                    showTime
                    onChange={(e: any) => {
                        onChangeHandler({ createDate: format(new Date(e), "yyyy-MM-dd'T'HH:MM:ss'Z'") })
                    }} />
            </Form.Item>
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

