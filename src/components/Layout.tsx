import React from "react";
import AllPlayers from "./AllPlayers";
import PickedPups from "./PickedPups";

const Layout: React.FC = () => {
  return (
    <div className="flex">
      <div>
        <PickedPups />
      </div>
      <div className="flex-grow">
        <AllPlayers />
      </div>
    </div>
  );
};
export default Layout;
