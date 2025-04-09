import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@mui/icons-material";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Asani Admin</span>
        </div>
        {/* <div className="topRight">
          <div className="topbarIconcontainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconcontainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconcontainer">
            <Settings />
          </div>
          <img
            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
            alt=""
            className="topAvatar" */}
        {/* /> */}
        {/* </div> */}
      </div>
    </div>
  );
}
