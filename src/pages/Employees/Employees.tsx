import type { TableColumnsType } from 'antd';
import { useAddEmployeeMutation, useGetAllEmployeesQuery, useRemoveEmployeeMutation, useUpdateEmployeeMutation } from "../../api/employee.api";
import { format } from "date-fns";
import { Addfrom } from "./AddForm";
import { Editefrom } from './EditeForm';
import { Modal, Table } from 'antd';
import { useMemo, useState } from "react";
import { IEmployee, IEmployeeData } from "../../store/slices/types";
import { AppstoreAddOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import styles from './Employee.module.css';

export const EmployeesPage = () => {
  const [modalIsOpen, setOpen] = useState<boolean>(false);
  const [modalEditIsOpen, setModalEdite] = useState<boolean>(false);
  const { data: employees, refetch } = useGetAllEmployeesQuery('');
  const [addEmployee] = useAddEmployeeMutation();
  const [removeEmployee] = useRemoveEmployeeMutation();
  const [updateEmployee] = useUpdateEmployeeMutation();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const columns: TableColumnsType<IEmployeeData> = useMemo(() => ([
    {
      title: 'ФИО',
      dataIndex: 'fullName',
      key: 'fullName'
    },
    {
      title: 'Дата рождения',
      dataIndex: 'birthday',
      key: 'birthday',
      render: (birthday) => format(birthday, "yyyy-MM-dd")
    },
    {
      title: 'Должность',
      dataIndex: 'position',
      key: 'position',
      render: (position) => position.positionName
    },
    {
      title: 'Дата трудоустройства',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (startDate) => format(startDate, "yyyy-MM-dd")
    },
    {
      title: 'Дата увольнения',
      dataIndex: 'finishDate',
      key: 'finishDate',
      render: (finishDate) => finishDate !== '0001-01-01' ? format(finishDate, "yyyy-MM-dd") : ''
    },
  ]), []);
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: IEmployeeData[]) => {
      setSelectedRowKeys(selectedRowKeys);
    }
  };
  const addNewEmployee = (data: IEmployee) => {
    addEmployee(data).then(res => {
      refetch();
      setOpen(false);
    }).catch(error => { console.log(error) });
  }
  const removeEmployeeById = (id: number | string | bigint) => {
    removeEmployee(id).then(res => {
      refetch();
    }).catch(error => {
      console.log(error);
    })
  }
  const updateSelectedEmployee = (data: IEmployee) => {
    updateEmployee(data).then(res => {
      refetch();
      setModalEdite(false);
    }).catch(error => { console.log(error) });
  }
  console.log(selectedRowKeys);
  return (
    <>
      <h1>Сотрудники</h1>
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
        dataSource={employees?.map((item) => ({ ...item, key: item.id }))}
        pagination={{ pageSize: 50 }}
        rowSelection={{
          type: 'radio',
          selectedRowKeys,
          getCheckboxProps: (record: IEmployeeData) => ({ name: 'selector' }),
          ...rowSelection,
        }}
      />
    </>
  );
}