import TodoList from "./TodoList.tsx";
import {useState} from "react";
import TodoInput from "./TodoInput.tsx";

function TodoIndex() {

    // 현재 페이지 번호 관리하는 상태 (초기값 2)
    const [page, setPage] = useState<number>(2);

    // 데이터 새로고침 여부
    const [refresh, setRefresh] = useState(false)

    // 페이지 번호를 변경하고 새로 고침 상태를 토글
    const changePage = (pageNum: number) => {
        // pageNum 매개변수로 전달된 값을 사용하여 현재 페이지 번호 상태를 업데이트
        setPage(pageNum)

        // 리렌더링
        setRefresh(!refresh)
    }

    return (
        <div className="max-w-4xl mx-auto p-4">

            <div className="mb-6">
                <TodoInput changePage={changePage} />
            </div>

            <hr className="border-gray-300 mb-4"/>

            {/* TodoList 하위 컴포넌트를 렌더링하는 역할 */}
            <div>
                <TodoList pageNum={page} refresh={refresh} changePage={changePage} />
            </div>
        </div>
    );
}

export default TodoIndex;