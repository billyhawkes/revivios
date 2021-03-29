import React from "react";
import * as FaIcons from "react-icons/fa";
import * as GiIcons from "react-icons/gi";

const SideBarData = [
    {
        title: "Home",
        path: "/",
        icon: <FaIcons.FaHome />,
    },
    {
        title: "Habits",
        path: "/habit",
        icon: <GiIcons.GiStairsGoal />,
    },
];

export default SideBarData;
