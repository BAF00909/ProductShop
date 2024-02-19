import { AppstoreAddOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { TableColumnsType, Modal, Table } from "antd";
import { format } from "date-fns";
import { useState, useMemo } from "react";
import { useAddSupplyMutation, useGetAllSuppliesQuery, useRemoveSupplyMutation, useUpdateSupplyMutation } from "../../api/supplies.api";
import { IEmployee, IProvider, ISupply, ISupplyUpdate } from "../../store/slices/types";
import { Addfrom } from "./AddForm";
import { Editefrom } from "./EditeForm";
import styles from './Supplies.module.css';

export const SuppliesPage = () => {
    const [modalIsOpen, setOpen] = useState<boolean>(false);
    const [modalEditIsOpen, setModalEdite] = useState<boolean>(false);
    const { data: supplies, refetch } = useGetAllSuppliesQuery('');
    const [addSupply] = useAddSupplyMutation();
    const [removeSupply] = useRemoveSupplyMutation();
    const [updateSupply] = useUpdateSupplyMutation();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const columns: TableColumnsType<ISupply> = useMemo(() => ([
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Дата поставки',
            dataIndex: 'date',
            key: 'date',
            render: (date: string) => date !== '0001-01-01' ? format(date, "yyyy-MM-dd HH:MM:ss") : ''
        },
        {
            title: 'Поставщик',
            dataIndex: 'provider',
            key: 'provider',
            render: (provider: IProvider) => provider.providerName
        },
        {
            title: 'Сотрудник принявший поставку',
            dataIndex: 'employeeAccepted',
            key: 'employeeAccepted',
            render: (employeeAccepted: IEmployee) => `${employeeAccepted.lastName} ${employeeAccepted.firstName} ${employeeAccepted.secondName}`
        },
    ]), []);
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: ISupply[]) => {
            setSelectedRowKeys(selectedRowKeys);
        }
    };
    const addNewEmployee = (data: ISupply) => {
        addSupply(data).then(res => {
            refetch();
            setOpen(false);
        }).catch(error => { console.log(error) });
    }
    const removeEmployeeById = (id: number | string | bigint) => {
        removeSupply(id).then(res => {
            refetch();
        }).catch(error => {
            console.log(error);
        })
    }
    const updateSelectedEmployee = (data: ISupplyUpdate) => {
        updateSupply(data).then(res => {
            refetch();
            setModalEdite(false);
        }).catch(error => { console.log(error) });
    }
    return (
        <>
            <h1>Поставки</h1>
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
                dataSource={supplies?.map((item) => ({ ...item, key: item.id }))}
                pagination={{ pageSize: 50 }}
                rowSelection={{
                    type: 'radio',
                    selectedRowKeys,
                    getCheckboxProps: (record: ISupply) => ({ name: 'selector' }),
                    ...rowSelection,
                }}
            />
        </>
    );
}