export default function Loading() {
    return (
        <div className="space-y-4 w-full container mx-auto animate-pulse">
            {Array.from({length: 5}).map((_, index) => (
                <div
                    key={index}
                    className="bg-gray-300 dark:bg-gray-900 h-8 rounded-md w-full max-w-lg"
                ></div>
            ))}
        </div>
    );
}