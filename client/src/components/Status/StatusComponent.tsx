import type React from "react";
import StatusDot from "./StatusDot";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import CardContent from "../Card/CardContent";
import DropDown from "../DropDown/DropDown";
import EditableField from "../EditableField/EditableField";
interface StatusComponentProps {
  status: {
    state: "online" | "offline" | "away" | "busy";
    description: string;
  } | null;
  handleStatusUpdate: (
    state: "online" | "offline" | "away" | "busy",
    description: string
  ) => void;
}
const StatusComponent: React.FC<StatusComponentProps> = (props) => {
  const { status, handleStatusUpdate } = props;

  return (
    <>
      <Card key={1} hoverable={false} clickable={false}>
        <CardHeader title={"Your status"}>
          <div className="flex flex-row gap-14">
            <div>
              {status?.state}{" "}
              {status?.state && <StatusDot state={status.state} />}
            </div>
            <DropDown
              value={status?.state}
              options={[
                { value: "online", label: "Online" },
                { value: "away", label: "Away" },
                { value: "busy", label: "Busy" },
                { value: "offline", label: "Offline" },
              ]}
              placeholder="change status"
              onChange={(value) =>
                handleStatusUpdate(
                  value as "online" | "offline" | "away" | "busy",
                  status?.description || ""
                )
              }
              size="sm"
              width="sm"
            />
          </div>
        </CardHeader>

        <CardContent description={"custom status"} alignment="left">
          <EditableField
            value={status?.description || ""}
            onSave={(newValue) => {
              handleStatusUpdate(status?.state || "offline", newValue);
            }}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default StatusComponent;
