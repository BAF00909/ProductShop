import { AppstoreAddOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { TableColumnsType, Modal, Table } from "antd";
import { useState, useMemo } from "react";
import { useAddReturnedProductMutation, useGetAllReturnedProductsQuery, useRemoveReturnedProductMutation, useUpdateReturnedProductMutation } from "../../api/returnedProducts.api";
import { IReturnedProduct, IReturnedProductData, IReturnedProductUpdate } from "../../store/slices/types";
import { Addfrom } from "./AddForm";
import { Editefrom } from "./EditeForm";
import styles from './ReturnedProducts.module.css';
import { format } from "date-fns";

export const ReturnedProductsPage = () => {
    const [modalIsOpen, setOpen] = useState<boolean>(false);
    const [modalEditIsOpen, setModalEdite] = useState<boolean>(false);
    const { data: returnedProducts, refetch } = useGetAllReturnedProductsQuery('');
    const [addReturnedProduct] = useAddReturnedProductMutation();
    const [removeReturnedProduct] = useRemoveReturnedProductMutation();
    const [updateReturnedProduct] = useUpdateReturnedProductMutation();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const columns: TableColumnsType<IReturnedProduct> = useMemo(() => ([
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Дата возврата',
            dataIndex: 'date',
            key: 'date',
            render: (date) => format(date, "yyyy-MM-dd hh:mm:ss")
        },
        {
            title: 'Дата продажи',
            dataIndex: 'soltProduct',
            key: 'soltProduct',
            render: (soltProduct) => format(soltProduct.date, "yyyy-MM-dd hh:mm:ss")
        },
        {
            title: 'Наименование товара',
            dataIndex: 'soltProduct',
            key: 'soltProduct.product',
            render: (soltProduct) => soltProduct.product.productName
        },
        {
            title: 'Продал',
            dataIndex: 'soltProduct',
            key: 'soltProduct.employee',
            render: (soltProduct) => `${soltProduct.employee.lastName} ${soltProduct.employee.firstName} ${soltProduct.employee.secondName}`
        },
        {
            title: 'Принял возврат',
            dataIndex: 'employee',
            key: 'employee',
            render: (employee) => `${employee.lastName} ${employee.firstName} ${employee.secondName}`
        },
    ]), []);
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: IReturnedProduct[]) => {
            setSelectedRowKeys(selectedRowKeys);
        }
    };
    const addNewEmployee = (data: IReturnedProductData) => {
        addReturnedProduct(data).then(res => {
            refetch();
            setOpen(false);
        }).catch(error => { console.log(error) });
    }
    const removeEmployeeById = (id: number | string | bigint) => {
        removeReturnedProduct(id).then(res => {
            refetch();
        }).catch(error => {
            console.log(error);
        })
    }
    const updateSelectedEmployee = (data: IReturnedProductUpdate) => {
        updateReturnedProduct(data).then(res => {
            refetch();
            setModalEdite(false);
        }).catch(error => { console.log(error) });
    }
    return (
        <>
            <h1>Возврат</h1>
            <Modal
                title='Добавить запись'
                open={modalIsOpen}
                onCancel={() => setOpen(false)}
                footer={null}
            >
                <Addfrom sendForm={addNewEmployee} />
            </Modal>
            <Modal
                title='Редактировать запись'
                open={modalEditIsOpen}
                onCancel={() => setModalEdite(false)}
                footer={null}
            >
                <Editefrom id={Number(selectedRowKeys[0])} sendEditeForm={updateSelectedEmployee} />
            </Modal>
            <div className={styles.tableTools}>
                <AppstoreAddOutlined onClick={() => setOpen(true)} title='Добавить запись' />
                <EditOutlined onClick={() => selectedRowKeys.length > 0 && setModalEdite(true)} title='Редактировать запись' />
                <DeleteOutlined onClick={() => { selectedRowKeys.length > 0 && removeEmployeeById(selectedRowKeys[0]) }} title='Удалить запись' />
            </div>
            <Table
                columns={columns}
                dataSource={returnedProducts?.map((item) => ({ ...item, key: item.id }))}
                pagination={{ pageSize: 50 }}
                rowSelection={{
                    type: 'radio',
                    selectedRowKeys,
                    getCheckboxProps: (record: IReturnedProduct) => ({ name: 'selector' }),
                    ...rowSelection,
                }}
            />
        </>
    );
}