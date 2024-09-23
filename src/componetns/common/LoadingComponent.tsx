
function LoadingComponent() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-96 transform transition-all duration-300 ease-in-out">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">로딩 중</h2>
                <p className="mb-6 text-gray-600 text-center">잠시만 기다려주세요...</p>
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
                </div>
            </div>
        </div>
    );
}

export default LoadingComponent;