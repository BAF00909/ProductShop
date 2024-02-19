import { AppstoreAddOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { TableColumnsType, Modal, Table } from "antd";
import { useState, useMemo } from "react";
import { useAddSoltProductMutation, useGetAllSoltProductsQuery, useRemoveSoltProductMutation, useUpdateSoltProductMutation } from "../../api/soltProduct.api";
import { ISoltProduct, ISoltProductData, ISoltProductUpdate } from "../../store/slices/types";
import { Addfrom } from "./AddForm";
import { Editefrom } from "./EditeForm";
import styles from './SoltProducts.module.css';
import { format } from "date-fns";

export const SoltProductsPage = () => {
    const [modalIsOpen, setOpen] = useState<boolean>(false);
    const [modalEditIsOpen, setModalEdite] = useState<boolean>(false);
    const { data: soltProducts, refetch } = useGetAllSoltProductsQuery('');
    const [addSoltProduct] = useAddSoltProductMutation();
    const [removeSoltProduct] = useRemoveSoltProductMutation();
    const [updateSoltProduct] = useUpdateSoltProductMutation();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const columns: TableColumnsType<ISoltProduct> = useMemo(() => ([
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Дата продажи',
            dataIndex: 'date',
            key: 'date',
            render: (date) => format(date, "yyyy-MM-dd hh:mm:ss")
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
            title: 'Продавец',
            dataIndex: 'employee',
            key: 'fullName',
            render: (employee) => `${employee.lastName} ${employee.firstName} ${employee.secondName}`
        },
    ]), []);
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: ISoltProduct[]) => {
            setSelectedRowKeys(selectedRowKeys);
        }
    };
    const addNewEmployee = (data: ISoltProductData) => {
        addSoltProduct(data).then(res => {
            refetch();
            setOpen(false);
        }).catch(error => { console.log(error) });
    }
    const removeEmployeeById = (id: number | string | bigint) => {
        removeSoltProduct(id).then(res => {
            refetch();
        }).catch(error => {
            console.log(error);
        })
    }
    const updateSelectedEmployee = (data: ISoltProductUpdate) => {
        updateSoltProduct(data).then(res => {
            refetch();
            setModalEdite(false);
        }).catch(error => { console.log(error) });
    }
    return (
        <>
            <h1>Продажи</h1>
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
                dataSource={soltProducts?.map((item) => ({ ...item, key: item.id }))}
                pagination={{ pageSize: 50 }}
                rowSelection={{
                    type: 'radio',
                    selectedRowKeys,
                    getCheckboxProps: (record: ISoltProduct) => ({ name: 'selector' }),
                    ...rowSelection,
                }}
            />
        </>
    );
}