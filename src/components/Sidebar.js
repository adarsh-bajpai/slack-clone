import React from "react";
import styled from "styled-components";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import SidebarOption from "./SidebarOption";
import InsertCommentOutlinedIcon from "@material-ui/icons/InsertCommentOutlined";
import InboxOutlinedIcon from "@material-ui/icons/InboxOutlined";
import DraftsOutlinedIcon from "@material-ui/icons/DraftsOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import AppsOutlinedIcon from "@material-ui/icons/AppsOutlined";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import ExpandLessOutlinedIcon from "@material-ui/icons/ExpandLessOutlined";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
//  styles :

const SidebarContainer = styled.div`
  background-color: var(--slack-color);
  color: white;
  flex: 0.3;
  margin-top: 40px;
  > hr {
    margin-top: 7px;
    margin-bottom: 8px;
    border: 1px solid #49274b;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 14px;
  > .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 50%;
  }
`;

const SidebarInfo = styled.div`
  flex: 1;
  > h2 {
    font-size: 16px;
    font-weight: 900;
    margin-bottom: 5px;
  }
  > h3 {
    display: flex;
    font-size: 14px;
    font-weight: 400;
    align-items: center;
  }
  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    color: green;
    margin-right: 2px;
    margin-top: 2px;
  }
`;

const Sidebar = () => {
  const [channels, loading, error] = useCollection(collection(db, "rooms"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const [user] = useAuthState(auth);

  // console.log("channels--> ", channels);
  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>Slack App</h2>
          <h3>
            <FiberManualRecordIcon />
            Member
          </h3>
        </SidebarInfo>
        <CreateOutlinedIcon />
      </SidebarHeader>
      <SidebarOption Icon={InsertCommentOutlinedIcon} title="Threads" />
      <SidebarOption Icon={InboxOutlinedIcon} title="Mentions & Reactions" />
      <SidebarOption Icon={DraftsOutlinedIcon} title="Saved Items" />
      <SidebarOption
        Icon={BookmarkBorderOutlinedIcon}
        title="Channel brwoser"
      />
      <SidebarOption
        Icon={PeopleAltOutlinedIcon}
        title="People &  User groups"
      />
      <SidebarOption Icon={AppsOutlinedIcon} title="Apps" />
      <SidebarOption Icon={FileCopyOutlinedIcon} title="File browser" />
      <SidebarOption Icon={ExpandLessOutlinedIcon} title="Show Less" />
      <hr />
      <SidebarOption Icon={ExpandMoreOutlinedIcon} title="Adds Channel" />
      <hr />
      <SidebarOption
        Icon={AddOutlinedIcon}
        addChannelOption
        title="Add Channels"
      />

      {channels?.docs.map((docc) => {
        return (
          <SidebarOption key={docc.id} id={docc.id} title={docc.data().name} />
        );
      })}
    </SidebarContainer>
  );
};

export default Sidebar;
