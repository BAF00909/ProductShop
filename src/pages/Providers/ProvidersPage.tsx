import { AppstoreAddOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Modal, Table } from "antd";
import { useState, useMemo } from "react";
import { useAddProviderMutation, useDeleteProviderMutation, useGetAllProvidersQuery, useUpdateProviderMutation } from "../../api/providers.api";
import { IProvider } from "../../store/slices/types";
import { Addfrom } from "./AddForm";
import { Editefrom } from "./EditeForm";
import styles from './Provider.module.css';

export const ProvidersPage = () => {
    const [modalIsOpen, setOpen] = useState<boolean>(false);
    const [modalEditIsOpen, setModalEdite] = useState<boolean>(false);
    const { data: providers, refetch } = useGetAllProvidersQuery('');
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [addProvider] = useAddProviderMutation();
    const [updateProvider] = useUpdateProviderMutation();
    const [deleteProvider] = useDeleteProviderMutation();
    const columns = useMemo(() => ([
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Наименование',
            dataIndex: 'providerName',
            key: 'providerName'
        }
    ]), [])
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: IProvider[]) => {
            setSelectedRowKeys(selectedRowKeys);
        }
    };

    const addNewProvider = (data: IProvider) => {
        addProvider(data).then(res => {
          refetch();
          setOpen(false);
        }).catch(error => { console.log(error) });
      }
      const removeEmployeeById = (id: number | string | bigint) => {
        deleteProvider(id).then(res => {
          refetch();
        }).catch(error => {
          console.log(error);
        })
      }
      const updateSelectedEmployee = (data: IProvider) => {
        updateProvider(data).then(res => {
          refetch();
          setModalEdite(false);
        }).catch(error => { console.log(error) });
      }
    return (
        <>
            <h1>Поставщики</h1>
            <Modal
                title='Добавить запись'
                open={modalIsOpen}
                onCancel={() => setOpen(false)}
                footer={null}
            >
                <Addfrom sendForm={addNewProvider} />
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
                dataSource={providers?.map((item: IProvider) => ({ ...item, key: item.id }))}
                pagination={{ pageSize: 50 }}
                rowSelection={{
                    type: 'radio',
                    selectedRowKeys,
                    getCheckboxProps: (record: IProvider) => ({ name: 'selector' }),
                    ...rowSelection,
                }}
            />
        </>
    );
}