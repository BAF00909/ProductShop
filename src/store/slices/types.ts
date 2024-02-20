export interface IEmployee {
    id?: number,
    firstName: string,
    secondName: string,
    lastName: string,
    birthday: string,
    startDate: string,
    positionId: number,
    finishDate?: string
}

export interface IEmployeeData {
    id: number,
    firstName: string,
    secondName: string,
    lastName: string,
    birthday: string,
    startDate: string,
    position: { id: number, positionName: string },
    finishDate: string
    fullName: string
    key: number
}

export interface IPosition {
    id: number,
    positionName: string
}

export interface IProvider {
    id: number,
    providerName: string
}

export interface IProductGroup {
    id: number,
    groupName: string
}

export interface IReason {
    id: number,
    groupName: string
}

export interface ISupply {
    id: 4,
    date: string,
    provider: IProvider,
    employeeAccepted: IEmployee
}

export interface ISupplyUpdate {
    id: number,
    date: string,
    providerId: number,
    employeeId: number
}

export interface IProduct {
    id: number,
    art: number,
    productName: string,
    dateIn: string,
    count: number,
    cost: number,
    productGroup: IProductGroup,
    supply: ISupplyUpdate
}

export interface IProductData {
    id?: number,
    art: number,
    productName: string,
    dateIn: string,
    count: number,
    cost: number,
    productGroupId: number,
    supplyId: number
}

export interface ISoltProduct {
    id: number,
    date: string,
    product: IProduct,
    employee: IEmployee
}

export interface ISoltProductData {
    date: string,
    productId: number,
    employeeId: number
}

export interface ISoltProductUpdate extends ISoltProductData {
    id: number
}

export interface IOverdueProduct {
    id: number,
    createDate: string,
    product: IProduct,
    employee: IEmployee
}

export interface IOverdueProductData {
    createDate: string,
    productOverdueId: number,
    employeeDecommisionId: number
}

export interface IOverdueProductUpdate extends IOverdueProductData {
    id: number
}

export interface IReturnedProduct {
    id: number,
    date: string,
    soltProduct: {
        id: number,
        date: string,
        product: IProduct | null,
        productId: number,
        employee: IEmployee & IEmployeeData
        employeeId: number
    },
    reasonReturn: IReason,
    employee: IEmployee & IEmployeeData,
    employeeGetterId: number
}

export interface IReturnedProductUpdate {
    id: number,
    date: string,
    soltProductId: number,
    reasonReturnId: number,
    employeeGetterId: number
}

export interface IReturnedProductData {
    date: string,
    soltProductId: number,
    reasonReturnId: number,
    employeeGetterId: number
}