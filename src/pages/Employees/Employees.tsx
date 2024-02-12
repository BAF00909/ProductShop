import type { TableColumnsType } from 'antd';
import { useGetAllEmployeesQuery } from "../../api/employee.api";
import { format } from "date-fns";
import { Addfrom } from "./AddForm";
import { Modal, Table } from 'antd';
import { useMemo, useState } from "react";
import { IEmployeeData } from "../../store/slices/types";

export const EmployeesPage = () => {
  const [modalIsOpen, setOpen] = useState<boolean>(false);
  const { data: employees } = useGetAllEmployeesQuery('');
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
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
  };
  console.log(selectedRowKeys);
  return (
    <>
      <h1>Сотрудники</h1>
      <Modal
        open={modalIsOpen}
        onCancel={() => setOpen(false)}
      >
        <Addfrom />
      </Modal>
      <button onClick={() => setOpen(true)}>add</button>
      <Table
        columns={columns}
        dataSource={employees?.map((item) => ({...item, key: item.id}))}
        pagination={{ pageSize: 50 }}
        rowSelection={{
          type: 'radio',
          selectedRowKeys,
          getCheckboxProps: (record: IEmployeeData) => ({name: 'selector'}),
          ...rowSelection,
        }}
      />
    </>
  );
}