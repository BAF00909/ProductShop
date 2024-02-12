export interface IEmployee {
    id: number,
    firstName: string,
    secondName: string,
    lastName: string,
    birthday: string,
    startDate: string,
    positionId: number,
    finishDate: string
}

export interface IEmployeeData {
    id: number,
    firstName: string,
    secondName: string,
    lastName: string,
    birthday: string,
    startDate: string,
    position: {id: number, positionName: string},
    finishDate: string
    fullName: string
    key: number
}

export interface IPosition {
    id: number,
    positionName: string
}