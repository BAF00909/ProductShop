import { AppstoreAddOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Modal, Table } from "antd";
import { useState, useMemo } from "react";
import { useAddProductGroupMutation, useDeleteProductGroupMutation, useGetAllProductsGroupQuery, useUpdateProductGroupMutation } from "../../api/productGroups.api";
import { IProductGroup } from "../../store/slices/types";
import { Addfrom } from "./AddForm";
import { Editefrom } from "./EditeForm";
import styles from './ProductGroup.module.css';

export const ProductsGroupsPage = () => {
    const [modalIsOpen, setOpen] = useState<boolean>(false);
    const [modalEditIsOpen, setModalEdite] = useState<boolean>(false);
    const { data: groups, refetch } = useGetAllProductsGroupQuery('');
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [addProductGroup] = useAddProductGroupMutation();
    const [updateProductGroup] = useUpdateProductGroupMutation();
    const [deleteProductGroup] = useDeleteProductGroupMutation();
    const columns = useMemo(() => ([
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Наименование',
            dataIndex: 'groupName',
            key: 'groupName'
        }
    ]), [])
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: IProductGroup[]) => {
            setSelectedRowKeys(selectedRowKeys);
        }
    };

    const addNewEmployee = (data: IProductGroup) => {
        addProductGroup(data).then(res => {
          refetch();
          setOpen(false);
        }).catch(error => { console.log(error) });
      }
      const removeEmployeeById = (id: number | string | bigint) => {
        deleteProductGroup(id).then(res => {
          refetch();
        }).catch(error => {
          console.log(error);
        })
      }
      const updateSelectedEmployee = (data: IProductGroup) => {
        updateProductGroup(data).then(res => {
          refetch();
          setModalEdite(false);
        }).catch(error => { console.log(error) });
      }
    return (
        <>
            <h1>Категории товаров</h1>
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
                dataSource={groups?.map((item: IProductGroup) => ({ ...item, key: item.id }))}
                pagination={{ pageSize: 50 }}
                rowSelection={{
                    type: 'radio',
                    selectedRowKeys,
                    getCheckboxProps: (record: IProductGroup) => ({ name: 'selector' }),
                    ...rowSelection,
                }}
            />
        </>
    );
}