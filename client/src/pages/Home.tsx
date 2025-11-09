import React, { useEffect, useState } from "react";
import { greeting } from "../utils/helper";
import { useUser } from "../Context/UserContext";
import { HomePageService } from "../services/HomePage";
import { StatusCode } from "../../core/utils/enum";
import Button from "../components/Button";
import { Plus } from "lucide-react";
import Card from "../components/Card/Card";
import { getIcons } from "../utils/getIcons";
import CardHeader from "../components/Card/CardHeader";
import CardContent from "../components/Card/CardContent";
import StatusComponent from "../components/Status/StatusComponent";
interface QuickAction {
  actionId: string;
  label: string;
  description: string;
}
interface Config {
  greeting: object;
  recentChats: object;
  status: object;
  quickActions: QuickAction[];
}

export interface Status {
  state: "online" | "offline" | "away" | "busy";
  description: string;
}
interface StatusResponse {
  status: Status;
}

const Home: React.FC = () => {
  const { user } = useUser();
  const [config, setConfig] = useState<Config | null>(null);
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const getConfig = async () => {
      try {
        const configResponse = await HomePageService.getConfigDetails();
        if (configResponse.status === StatusCode.OK) {
          setConfig(configResponse.data as Config);
        }
        const statusResponse = await HomePageService.getStatus();
        if (statusResponse.status === StatusCode.OK) {
          const statusData = statusResponse.data as StatusResponse;
          setStatus(statusData.status as Status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getConfig();
  }, []);

  useEffect(() => {
    const updateStatus = async () => {
      try {
        const response = await HomePageService.updateStatus(status as Status);
        if (response.status === StatusCode.OK) {
          console.log("first");
        }
      } catch (err) {
        console.error("Error updating Status:", err);
      }
    };
    if (status != null) {
      updateStatus();
    }
  }, [status]);

  return (
    <div className="h-screen  dark:bg-gray-900">
      <div className="flex flex-row  h-full">
        <div className="flex-[0_0_70%]">
          <div className="flex flex-col items-start justify-start h-44 w-full mt-5 bg-gradient-to-r from-gray-200 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-2">
              {greeting()} {user?.fullName}
            </h2>
            <p className="text-muted-foreground mb-4">
              You have 4 unread messages and 2 new group invitations.
            </p>
            <Button>Open Chat</Button>
          </div>
          <div className="mt-5">
            <h3 className="text-lg font-semibold mb-4 text-left pl-5">
              Quick Actions
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {config?.quickActions.map((action, index) => {
                const IconComponent = getIcons(index);
                return (
                  <Card key={index}>
                    <CardHeader
                      title={action.label}
                      icon={<IconComponent size={20} />}
                    ></CardHeader>
                    <CardContent
                      description={action.description}
                      alignment="left"
                    />{" "}
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-5 mr-5 w-dvw p-5">
          <div className=" border border-gray-300 rounded-lg h-1/2">
            <div className="flex flex-row justify-between">
              <h1>Recent Chats </h1>
              <Plus />
            </div>
            <div className="">Coming Soon</div>
          </div>
          <div className=" border border-gray-300 rounded-lg h-1/2 mt-5">
            <StatusComponent status={status} setStatus={setStatus} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
