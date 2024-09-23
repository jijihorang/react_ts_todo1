import { ReactElement } from "react";
import { PageResponseI } from "../../types/todo.ts";

interface Props {
    pageResponse: PageResponseI, // 페이지 정보를 담고 있는 객체
    changePage: (p: number) => void; // 페이지 변경
}

// 페이지 번호 배열 생성
const makeArr = (from: number, to: number): number[] => {
    const arr: number[] = [];
    for (let i = from; i <= to; i++) {
        arr.push(i);
    }
    return arr;
}

function PageComponent({ pageResponse, changePage }: Props): ReactElement {
    // 현재 페이지 (0부터 시작하기 때문에 + 1)
    const current: number = pageResponse.number + 1;

    // 마지막 페이지
    const tempLast: number = Math.ceil(current / 10.0) * 10;

    // 시작 페이지
    const startPage: number = tempLast - 9;

    // 끝 페이지
    const endPage: number = Math.min(pageResponse.totalPages, tempLast);

    // 이전
    const prev: boolean = startPage > 1;

    // 다음
    const next: boolean = endPage < pageResponse.totalPages;

    // 페이지 번호 리스트
    const pageNums: number[] = makeArr(startPage, endPage);
    const lis = pageNums.map(num => (
        <li
            className='px-4 py-2 text-white bg-blue-500 border border-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300'
            key={num}
            onClick={() => changePage(num)}
        >
            {num}
        </li>
    ));

    return (
        <div>
            <ul className='flex justify-center items-center space-x-2 mt-6'>
                {prev && (
                    <li
                        className='px-4 py-2 text-white bg-blue-500 border border-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300'
                        key={startPage - 1}
                        onClick={() => changePage(startPage - 1)}
                        aria-label="Previous Page"
                    >
                        Prev
                    </li>
                )}

                {lis}

                {next && (
                    <li
                        className='px-4 py-2 text-white bg-blue-500 border border-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300'
                        key={endPage + 1}
                        onClick={() => changePage(endPage + 1)}
                        aria-label="Next Page"
                    >
                        Next
                    </li>
                )}
            </ul>
        </div>
    );
}

export default PageComponent;
