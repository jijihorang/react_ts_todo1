// Todo 항목이 가져야 할 속성들
export interface TodoI {
    mno? : number,
    title: string,
    writer: string,
    dueDate: string
}

// Todo 항목이 포함된 페이지 속성들
export interface PageResponseI {
    content: TodoI[],
    totalElements: number,
    number: number,
    first: boolean,
    last: boolean,
    size: number,
    totalPages: number
}