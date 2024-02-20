import { AppstoreAddOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { TableColumnsType, Modal, Table } from "antd";
import { useState, useMemo } from "react";
import { useAddProductMutation, useGetAllProductsQuery, useRemoveProductMutation, useUpdateProductMutation } from "../../api/product.api";
import { IProduct, IProductData } from "../../store/slices/types";
import { Addfrom } from "./AddForm";
import { Editefrom } from "./EditeForm";
import styles from './Products.module.css';
import { format } from "date-fns";

export const ProductsPage = () => {
    const [modalIsOpen, setOpen] = useState<boolean>(false);
    const [modalEditIsOpen, setModalEdite] = useState<boolean>(false);
    const { data: products, refetch } = useGetAllProductsQuery('');
    const [addProduct] = useAddProductMutation();
    const [removeProduct] = useRemoveProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const columns: TableColumnsType<IProductData> = useMemo(() => ([
        {
            title: 'Артикул',
            dataIndex: 'art',
            key: 'art'
        },
        {
            title: 'Наименование',
            dataIndex: 'productName',
            key: 'productName'
        },
        {
            title: 'Дата поступление',
            dataIndex: 'dateIn',
            key: 'dateIn',
            render: (dateIn) => format(dateIn, "yyyy-MM-dd hh:mm:ss")
        },
        {
            title: 'Количество',
            dataIndex: 'count',
            key: 'count'
        },
        {
            title: 'Цена (руб)',
            dataIndex: 'cost',
            key: 'cost'
        },
        {
            title: 'Категория товара',
            dataIndex: 'productGroup',
            key: 'productGroup',
            render: (productGroup) => productGroup.groupName
        },
        {
            title: 'Номер поставки',
            dataIndex: 'supply',
            key: 'supplyId',
            render: (supply) => supply.id
        },
        {
            title: 'Дата поставки',
            dataIndex: 'supply',
            key: 'supplyDate',
            render: (supply) => format(supply.date, "yyyy-MM-dd hh:mm:ss")
        },
    ]), []);
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: IProductData[]) => {
            setSelectedRowKeys(selectedRowKeys);
        }
    };
    const addNewEmployee = (data: IProductData) => {
        addProduct(data).then(res => {
            refetch();
            setOpen(false);
        }).catch(error => { console.log(error) });
    }
    const removeEmployeeById = (id: number | string | bigint) => {
        removeProduct(id).then(res => {
            refetch();
        }).catch(error => {
            console.log(error);
        })
    }
    const updateSelectedEmployee = (data: IProductData) => {
        updateProduct(data).then(res => {
            refetch();
            setModalEdite(false);
        }).catch(error => { console.log(error) });
    }
    return (
        <>
            <h1>Товары</h1>
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
                dataSource={products?.map((item) => ({ ...item, key: item.id }))}
                pagination={{ pageSize: 50 }}
                rowSelection={{
                    type: 'radio',
                    selectedRowKeys,
                    getCheckboxProps: (record: IProductData) => ({ name: 'selector' }),
                    ...rowSelection,
                }}
            />
        </>
    );
}