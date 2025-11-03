import type React from "react";
import StatusDot from "./StatusDot";
interface StatusComponentProps {
  status: {
    state: "online" | "offline" | "away" | "busy";
    description: string;
  };
}
const StatusComponent: React.FC<StatusComponentProps> = (props) => {
  const { status } = props;

  return (
    <div className="flex flex-col content-center justify-center">
      <div className="flex flex-row content-center justify-center gap-2.5">
        {status?.state}
        <div>
          <StatusDot state={status?.state} />
        </div>
      </div>
      <div> {status?.description}</div>
    </div>
  );
};

export default StatusComponent;
