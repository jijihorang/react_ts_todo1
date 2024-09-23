import axios from "axios";
import {PageResponseI, TodoI} from "../types/todo.ts";

const host = 'http://localhost:8088/api/v1/todos'

// getToList 함수는 페이지 번호(page)와 페이지 크기(size)를 인수
// 데이터를 받아온 뒤, PageResponseI 타입의 데이터를 반환
export const getToList = async (page?: number, size?: number) : Promise<PageResponseI> => {

    // page undefined -> 1을 사용
    const pageValue = page || 1

    // size undefined -> 10을 사용
    const sizeValue = size || 10

    // host /list를 추가하고, page와 size를 쿼리 파라미터
    const res = await axios.get(`${host}/list?page=${pageValue}&size=${sizeValue}`)

    return res.data
}

// 새로운 할 일을 추가하는 비동기 함수
// TodoI 타입의 todo 객체를 매개변수 받음
// 성공적으로 완료되었을 때 숫자 타입의 값을 반환
export const postTodo = async (todo: TodoI) : Promise<number> => {
    const res = await axios.post(`${host}`, todo)

    return res.data.mno
}