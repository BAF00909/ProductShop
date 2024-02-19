import { useMemo, useState } from "react";
import { useAddPositionMutation, useDeletePositionMutation, useGetAllPositionsQuery, useUpdatePositionMutation } from "../../api/positions.api";
import { Modal, Table } from "antd";
import { IPosition } from "../../store/slices/types";
import { AppstoreAddOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Addfrom } from "./AddForm";
import { Editefrom } from "./EditeForm";
import styles from './Position.module.css';

export const PositionsPage = () => {
    const [modalIsOpen, setOpen] = useState<boolean>(false);
    const [modalEditIsOpen, setModalEdite] = useState<boolean>(false);
    const { data: positions, refetch } = useGetAllPositionsQuery('');
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [addPosition] = useAddPositionMutation();
    const [updatePosition] = useUpdatePositionMutation();
    const [deletePosition] = useDeletePositionMutation();
    const columns = useMemo(() => ([
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Наименование',
            dataIndex: 'positionName',
            key: 'positionName'
        }
    ]), [])
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: IPosition[]) => {
            setSelectedRowKeys(selectedRowKeys);
        }
    };

    const addNewEmployee = (data: IPosition) => {
        addPosition(data).then(res => {
          refetch();
          setOpen(false);
        }).catch(error => { console.log(error) });
      }
      const removeEmployeeById = (id: number | string | bigint) => {
        deletePosition(id).then(res => {
          refetch();
        }).catch(error => {
          console.log(error);
        })
      }
      const updateSelectedEmployee = (data: IPosition) => {
        updatePosition(data).then(res => {
          refetch();
          setModalEdite(false);
        }).catch(error => { console.log(error) });
      }
    return (
        <>
            <h1>Должности</h1>
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
                dataSource={positions?.map((item: IPosition) => ({ ...item, key: item.id }))}
                pagination={{ pageSize: 50 }}
                rowSelection={{
                    type: 'radio',
                    selectedRowKeys,
                    getCheckboxProps: (record: IPosition) => ({ name: 'selector' }),
                    ...rowSelection,
                }}
            />
        </>
    );
}