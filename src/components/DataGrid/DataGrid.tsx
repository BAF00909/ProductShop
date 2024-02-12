import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { DataType } from '../../types/dataGridTypes';
import { useState } from 'react';

interface IPropsDataGrid {
    columns: TableColumnsType<any>;
    dataSource: any[] | undefined
}

export const DataGrid = ({ columns, dataSource }: IPropsDataGrid) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const rowSelection = {
        // onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
        //     console.log(selectedRowKeys);
        //     setSelectedRowKeys(selectedRowKeys);
        //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        // },
        getCheckboxProps: (record: any) => {
            return {
                name: record.id,
            }
        },
    };

    return (
        <Table
            columns={columns}
            dataSource={dataSource}
            pagination={{ pageSize: 50 }}
            rowSelection={{
                type: 'radio',
                selectedRowKeys,
                onChange: setSelectedRowKeys,
                ...rowSelection,
            }}
        />
    )
}