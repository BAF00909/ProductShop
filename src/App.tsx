import React from 'react';
import './App.css';
import { Tabs } from 'antd';
import { EmployeesPage } from './pages/Employees/Employees';
import { OverdueProductsPage } from './pages/OverdueProducts/OverdueProducts';
import { PositionsPage } from './pages/Positions/Positions';
import { ProductsPage } from './pages/Products/Products';
import { ProductsGroupsPage } from './pages/ProductsGroups/ProductsGroups';
import { ProvidersPage } from './pages/Providers/ProvidersPage';
import { ReasonReturnedPage } from './pages/ReasonsReturned/ReasonsReturned';
import { ReturnedProductsPage } from './pages/ReturnedProducts/ReturnedProducts';
import { SoltProductsPage } from './pages/SoltProducts/SoltProducts';
import { SuppliesPage } from './pages/Supplies/Supplies';

const onChange = (key: any) => {
  console.log(key);
};

const items = [
  {
    key: '1',
    label: 'Сотрудники',
    children: <EmployeesPage />,
  },
  {
    key: '2',
    label: 'Поставщики',
    children: <ProvidersPage />,
  },
  {
    key: '3',
    label: 'Причины возврата',
    children: <ReasonReturnedPage />,
  },
  {
    key: '4',
    label: 'Должности',
    children: <PositionsPage />,
  },
  {
    key: '5',
    label: 'Категории товаров',
    children: <ProductsGroupsPage />,
  },
  {
    key: '6',
    label: 'Поставки',
    children: <SuppliesPage />,
  },
  {
    key: '7',
    label: 'Товары',
    children: <ProductsPage />,
  },
  {
    key: '8',
    label: 'Продажи',
    children: <SoltProductsPage />,
  },
  {
    key: '9',
    label: 'Списанный товар',
    children: <OverdueProductsPage />,
  },
  {
    key: '10',
    label: 'Возврат',
    children: <ReturnedProductsPage />,
  },
];

function App() {
  return (
    <div className="app">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
}

export default App;
