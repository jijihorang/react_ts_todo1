import {PageResponseI, TodoI} from "../../types/todo.ts";
import {useEffect, useState} from "react";
import {getToList} from "../../api/todoAPI.ts";
import LoadingComponent from "../common/LoadingComponent.tsx";
import PageComponent from "../common/PageComponent.tsx";

// 초기 상태 객체를 정의
const initialState : PageResponseI = {
    content: [], // 할 일 목록의 데이터를 담는 배열, 초기값은 빈 배열
    first: false, // 첫 번째 페이지인지 여부
    last: false,  // 마지막 페이지인지 여부
    number: 0,    // 현재 페이지 번호
    size: 0,      // 페이지 당 항목 개수
    totalElements: 0, // 전체 항목 수
    totalPages: 0     // 전체 페이지 수
}

// TodoList 컴포넌트에 전달되는 props 타입을 정의
interface TodoListProps {
    pageNum: number, // 현재 페이지 번호
    refresh: boolean, // 새로 고침
    changePage: (p: number) => void
}

function TodoList({pageNum, refresh, changePage}: TodoListProps) {

    // pageData 상태를 관리
    // pageData -> 할 일 목록과 페이지 관련 정보
    // 초기값은 initialState 설정
    const [pageData, setPageData] = useState<PageResponseI>(initialState)

    // 로딩 상태 (초기값은 false)
    const [loading, setLoading] = useState(false);

    // 컴포넌트가 처음 렌더링될 때 또는 pageNum, refresh 값이 변경될 때마다 실행
    useEffect(() => {

        setLoading(true)

        // getToList 함수는 주어진 페이지 번호에 맞는 할 일 목록 가져옴
        getToList(pageNum).then(data => {
            // 결과 setPageDate 상태 저장
            setPageData(data)

            // 600ms 후에 로딩 종료
            setTimeout(() => {
                setLoading(false)
            }, 600)
        })
    }, [pageNum, refresh])

    // pageData의 content 배열을 순회(map)하여 각 할 일 항목(todo)을 렌더링
    const todoLi = pageData?.content?.map((todo:TodoI) => {
        return (
            <li key={todo.mno} className="flex justify-between items-center p-4 border-b border-gray-200">
                <span className="font-semibold text-blue-500">{todo.mno}</span>
                <span className="text-gray-700">{todo.title}</span>
                <span className="text-gray-500">{todo.writer}</span>
                <span className="text-gray-400">{todo.dueDate}</span>
            </li>
        )
    })

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="text-2xl font-bold text-gray-800 mb-4">Todo List</div>

            {loading && <LoadingComponent />}

            <ul className="bg-white shadow rounded-lg">
                {todoLi}
            </ul>

            <div>
                <PageComponent pageResponse={pageData} changePage={changePage} />
            </div>
        </div>
    );
}

export default TodoList;