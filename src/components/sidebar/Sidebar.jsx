import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import {
  LineStyle,
  Timeline,
  Message,
  ManageAccounts,
  Feedback,
  TrendingUp,
  AutoGraph,
  Report,
  PermIdentity,
  Inventory,
  ReceiptLong,
  BarChart,
  AlternateEmail,
} from "@mui/icons-material";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarwrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>

            {/* <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Sales
            </li> */}
          </ul>
          {/* </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3> */}
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/devices" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Devices
              </li>
            </Link>

            <Link to="/permissions" className="link">
              <li className="sidebarListItem">
                <ReceiptLong className="sidebarIcon" />
                Permissions
              </li>
            </Link>
            {/* <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Reports
            </li> */}
          </ul>
        </div>
        {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <AlternateEmail className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <Feedback className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <Message className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem ">
              <ManageAccounts className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <AutoGraph className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul> */}
      </div>
    </div>
    // </div>
  );
}
