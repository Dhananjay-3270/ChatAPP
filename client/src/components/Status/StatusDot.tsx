interface StatusDotProps {
  state: "online" | "offline" | "busy" | "away";
}
const StatusDot: React.FC<StatusDotProps> = ({ state }) => {
  const STATUS_COLORS = {
    online: "bg-green-500",
    offline: "bg-red-500",
    busy: "bg-yellow-500",
    away: "bg-orange-400",
  };

  return (
    <span
      className={`inline-block w-2 h-2 rounded-full ${STATUS_COLORS[state]}`}
      aria-hidden="true"
    ></span>
  );
};

export default StatusDot;
