import {ReactElement} from "react";

// ResultModalProps 인터페이스 -> props 타입
interface ResultModalProps {
    msg: string,
    callback: () => void // 버튼 클릭 시 호출되는 함수
}

function ResultComponent({msg, callback}: ResultModalProps): ReactElement {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-96 transform transition-all duration-300 ease-in-out">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">결과</h2>
                <p className="mb-6 text-gray-600 text-center">{msg}</p>
                <button
                    className='bg-red-500 text-white rounded-lg p-2 transition duration-300 hover:bg-red-600'
                    onClick={() => callback()}
                >
                    닫기
                </button>
            </div>
        </div>

    );
}

export default ResultComponent;