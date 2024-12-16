export default function Loading() {
    return (
        <div className="space-y-4 w-full container animate-pulse">
            {Array.from({length: 5}).map((_, index) => (
                <div
                    key={index}
                    className="bg-gray-300 h-8 rounded-md w-full max-w-lg mx-auto"
                ></div>
            ))}
        </div>
    );
}