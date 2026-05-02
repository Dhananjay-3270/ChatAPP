export const MessageLoader = () => {
  const skeletonMessages = [
    { side: "start", width: "w-1/4", height: "h-10" },
    { side: "end", width: "w-1/3", height: "h-12" },
    { side: "start", width: "w-1/2", height: "h-14" },
    { side: "end", width: "w-1/4", height: "h-10" },
    { side: "start", width: "w-1/3", height: "h-12" },
    { side: "end", width: "w-1/2", height: "h-14" },
    { side: "start", width: "w-1/4", height: "h-10" },
    { side: "end", width: "w-1/3", height: "h-12" },
    { side: "start", width: "w-1/4", height: "h-10" },
    { side: "end", width: "w-1/3", height: "h-12" },
    { side: "start", width: "w-1/4", height: "h-10" },
  ];

  return (
    <div className="flex-1 min-h-0 w-full overflow-y-auto p-4 flex flex-col gap-4 animate-pulse">
      {skeletonMessages.map((msg, index) => (
        <div
          key={index}
          className={`
            ${msg.side === "start" ? "self-start rounded-tl-sm" : "self-end rounded-tr-sm"}
            ${msg.width}
            ${msg.height}
            bg-gray-200 dark:bg-gray-700
            rounded-2xl
          `}
        />
      ))}
    </div>
  );
};

export default MessageLoader;
