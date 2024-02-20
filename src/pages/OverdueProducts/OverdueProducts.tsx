import { AppstoreAddOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { TableColumnsType, Modal, Table } from "antd";
import { format } from "date-fns";
import { useState, useMemo } from "react";
import { useAddOverdueProductMutation, useGetAllOverdueProductsQuery, useRemoveOverdueProductMutation, useUpdateOverdueProductMutation } from "../../api/overdueProduct.api";
import { IOverdueProduct, IOverdueProductData, IOverdueProductUpdate } from "../../store/slices/types";
import { Addfrom } from "./AddForm";
import { Editefrom } from "./EditeForm";
import styles from './OverdueProducts.module.css';

export const OverdueProductsPage = () => {
    const [modalIsOpen, setOpen] = useState<boolean>(false);
    const [modalEditIsOpen, setModalEdite] = useState<boolean>(false);
    const { data: overdueProducts, refetch } = useGetAllOverdueProductsQuery('');
    const [addOverdueProduct] = useAddOverdueProductMutation();
    const [removeOverdueProduct] = useRemoveOverdueProductMutation();
    const [updateOverdueProduct] = useUpdateOverdueProductMutation();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const columns: TableColumnsType<IOverdueProduct> = useMemo(() => ([
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Дата списания',
            dataIndex: 'createDate',
            key: 'createDate',
            render: (createDate) => format(createDate, "yyyy-MM-dd hh:mm:ss")
        },
        {
            title: 'Наименование товара',
            dataIndex: 'product',
            key: 'roductName',
            render: (record) => record.productName
        },
        {
            title: 'Количество товара',
            dataIndex: 'product',
            key: 'count',
            render: (record) => record.count
        },
        {
            title: 'Цена товара (руб)',
            dataIndex: 'product',
            key: 'cost',
            render: (record) => record.cost
        },
        {
            title: 'Списавший сотрудник',
            dataIndex: 'employee',
            key: 'fullName',
            render: (employee) => `${employee.lastName} ${employee.firstName} ${employee.secondName}`
        },
    ]), []);
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: IOverdueProduct[]) => {
            setSelectedRowKeys(selectedRowKeys);
        }
    };
    const addNewEmployee = (data: IOverdueProductData) => {
        addOverdueProduct(data).then(res => {
            refetch();
            setOpen(false);
        }).catch(error => { console.log(error) });
    }
    const removeEmployeeById = (id: number | string | bigint) => {
        removeOverdueProduct(id).then(res => {
            refetch();
        }).catch(error => {
            console.log(error);
        })
    }
    const updateSelectedEmployee = (data: IOverdueProductUpdate) => {
        updateOverdueProduct(data).then(res => {
            refetch();
            setModalEdite(false);
        }).catch(error => { console.log(error) });
    }
    return (
        <>
            <h1>Списанный товар</h1>
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
                dataSource={overdueProducts?.map((item) => ({ ...item, key: item.id }))}
                pagination={{ pageSize: 50 }}
                rowSelection={{
                    type: 'radio',
                    selectedRowKeys,
                    getCheckboxProps: (record: IOverdueProduct) => ({ name: 'selector' }),
                    ...rowSelection,
                }}
            />
        </>
    );
}