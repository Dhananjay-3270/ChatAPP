export const SearchListSkeleton = ({ length = 1 }) => {
  return (
    <div className=" flex flex-col">
      {Array.from({ length: length }).map((_, index) => (
        <div
          key={index}
          className="flex flex-row h-16 p-2.5 gap-2.5 rounded-lg animate-pulse"
        >
          {/* Avatar */}
          <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0" />

          {/* Content */}
          <div className="flex-1 flex flex-col justify-center gap-2">
            {/* Name */}
            <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700" />

            {/* Subtitle + Time */}
            <div className="flex justify-between items-center gap-2">
              <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700 flex-1 max-w-[180px]" />

              <div className="h-3 w-10 rounded bg-gray-200 dark:bg-gray-700 shrink-0" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
