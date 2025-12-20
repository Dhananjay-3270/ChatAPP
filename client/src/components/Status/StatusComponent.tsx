import type React from "react";
import StatusDot from "./StatusDot";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import CardContent from "../Card/CardContent";
import DropDown from "../DropDown/DropDown";
import type { Status } from "../../pages/Home";
import EditableField from "../EditableField/EditableField";
interface StatusComponentProps {
  status: {
    state: "online" | "offline" | "away" | "busy";
    description: string;
  };
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
}
const StatusComponent: React.FC<StatusComponentProps> = (props) => {
  const { status, setStatus } = props;

  return (
    <>
      <Card key={1} hoverable={false} clickable={false}>
        <CardHeader title={"Your status"}>
          <div className="flex flex-row gap-14">
            <div>
              {status?.state} <StatusDot state={status?.state} />
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
                setStatus({
                  ...status,
                  state: value as "online" | "offline" | "away" | "busy",
                })
              }
              size="sm"
              width="sm"
            />
          </div>
        </CardHeader>

        <CardContent description={"custom status"} alignment="left">
          <EditableField
            value={status?.description}
            onSave={(newValue) => {
              setStatus({
                ...status,
                description: newValue as string,
              });
            }}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default StatusComponent;
