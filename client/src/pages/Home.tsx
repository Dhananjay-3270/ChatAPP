import React from "react";
import { greeting } from "../utils/helper";
import { useUser } from "../Context/UserContext";
const Home: React.FC = () => {

const {user} = useUser()

  return (
    <div className="h-screen  dark:bg-gray-900">
      <div className="flex flex-row  h-full">
        <div className="flex-[0_0_70%]">
          <div className="flex flex-col items-start justify-start h-44 w-full mt-5 bg-gradient-to-r from-gray-200 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-2">{greeting()}  {user?.fullName}</h2>
            <p className="text-muted-foreground mb-4">
              You have 4 unread messages and 2 new group invitations.
            </p>
          </div>
        </div>
        <div className=""></div>
      </div>
    </div>
  );
};
export default Home;
