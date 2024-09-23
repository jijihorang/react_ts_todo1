import {TodoI} from "../../types/todo.ts";
import {ChangeEvent, useState} from "react";
import {postTodo} from "../../api/todoAPI.ts";
import LoadingComponent from "../common/LoadingComponent.tsx";
import ResultComponent from "../common/ResultComponent.tsx";

// TodoI 타입을 가진 초기 상태 객체 (빈 문자열로 설정)
const initState : TodoI = {
    title: '',
    writer: '',
    dueDate: ''
}

interface TodoListProps {
    changePage: (p: number) => void
}

function TodoInput({changePage}: TodoListProps) {

    // 현재 입력된 할 일 정보를 저장
    const[todo, setTodo] = useState<TodoI>(initState);

    // 로딩 상태를 관리
    const [loading, setLoading] = useState(false)

    // 추가된 Todo ID를 저장
    const [resultData, setResultData] = useState<number | undefined>(0)


    // 입력 필드의 값이 변경될 때 호출
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        // 입력 필드의 값이 변경될 때 해당 속성만 정확하게 업데이트
        setTodo({...todo, [e.target.name] : e.target.value});
    }

    // Add 버튼 클릭 이벤트
    const handleClick = () => {

        setLoading(true)

        // postTodo 함수를 호출할 때, 현재 상태의 todo 객체를 인자로 전달
        // data : 새로 추가된 결과
        postTodo(todo).then(number => {
           setLoading(false)
           setResultData(number) // 새로 추가된 Todo ID를 resultData 저장
        })
    }

    // 결과 메시지를 초기화
    const clearResult = (): void => {
        // Todo 추가 작업이 완료된 후 표시된 결과 메시지를 초기화
        setResultData(0)

        // Todo 입력 필드의 값들을 초기화
        setTodo(initState)

        changePage(1)
    }

    return (
        <div>
            <div className="text-2xl font-bold text-gray-800 mb-4">Todo Input</div>

            {loading && <LoadingComponent />}

            {/* Todo 추가가 성공했을 경우, ResultComponent 통해 결과 메시지 표시 */}
            {resultData !== 0 && <ResultComponent msg={`${resultData}번 등록 완료`} callback={clearResult} /> }

            <div>
                <input
                    type="text"
                    name="title"
                    value={todo.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="border p-2 m-2 rounded-md"
                />
                <input
                    type="text"
                    name="writer"
                    value={todo.writer}
                    onChange={handleChange}
                    placeholder="Writer"
                    className="border p-2 m-2 rounded-md"
                />
                <input
                    type="date"
                    name="dueDate"
                    value={todo.dueDate}
                    onChange={handleChange}
                    className="border p-2 m-2 rounded-md"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-3 m-3 rounded"
                    onClick={handleClick}
                >
                    Add
                </button>
            </div>
        </div>
    );
}

export default TodoInput;