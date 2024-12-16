export default function Loading() {
    return (
        <div className="space-y-6 animate-pulse max-w-3xl mx-auto">
            <div className="bg-gray-300 h-10 rounded-md w-3/4 mx-auto"></div>
            <div className="bg-gray-300 h-6 rounded-md w-1/2 mx-auto"></div>
            <div className="space-y-3">
                {Array.from({length: 5}).map((_, index) => (
                    <div
                        key={index}
                        className="bg-gray-300 h-4 rounded-md w-full"
                    ></div>
                ))}
            </div>
        </div>
    );
}