import { AppstoreAddOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Modal, Table } from "antd";
import { useState, useMemo } from "react";
import { useAddReasonMutation, useDeleteReasonMutation, useGetAllReasonQuery, useUpdateReasonMutation } from "../../api/reqsonReturn.api";
import { IReason } from "../../store/slices/types";
import { Addfrom } from "./AddForm";
import { Editefrom } from "./EditeForm";
import styles from './ReasonsReturn.module.css';

export const ReasonReturnedPage = () => {
    const [modalIsOpen, setOpen] = useState<boolean>(false);
    const [modalEditIsOpen, setModalEdite] = useState<boolean>(false);
    const { data: providers, refetch } = useGetAllReasonQuery('');
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [addReason] = useAddReasonMutation();
    const [updateReason] = useUpdateReasonMutation();
    const [deleteReason] = useDeleteReasonMutation();
    const columns = useMemo(() => ([
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Описание',
            dataIndex: 'groupName',
            key: 'groupName'
        }
    ]), [])
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: IReason[]) => {
            setSelectedRowKeys(selectedRowKeys);
        }
    };

    const addNewProvider = (data: IReason) => {
        addReason(data).then(res => {
          refetch();
          setOpen(false);
        }).catch(error => { console.log(error) });
      }
      const removeEmployeeById = (id: number | string | bigint) => {
        deleteReason(id).then(res => {
          refetch();
        }).catch(error => {
          console.log(error);
        })
      }
      const updateSelectedEmployee = (data: IReason) => {
        updateReason(data).then(res => {
          refetch();
          setModalEdite(false);
        }).catch(error => { console.log(error) });
      }
    return (
        <>
            <h1>Причины возврата</h1>
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
                dataSource={providers?.map((item: IReason) => ({ ...item, key: item.id }))}
                pagination={{ pageSize: 50 }}
                rowSelection={{
                    type: 'radio',
                    selectedRowKeys,
                    getCheckboxProps: (record: IReason) => ({ name: 'selector' }),
                    ...rowSelection,
                }}
            />
        </>
    );
}