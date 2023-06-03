import React from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { enterRoom, selectRoomId } from "../features/appSlice";
import { useDispatch } from "react-redux";

const SidebarOptionContainer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
    background-color: #340e36;
  }

  > h3 {
    font-weight: 500;
  }
  > h3 > span {
    padding: 14px;
  }
`;

const SidebarOptionChannel = styled.h3`
  padding: 10px 0px;
  font-weight: 400;
`;

const SidebarOption = ({ Icon, title, addChannelOption, id }) => {
  const dispatch = useDispatch();
  const addchannel = async () => {
    const channelName = prompt("Please Enter thr channel name ");
    if (channelName) {
      //   db.collection("rooms");
      //   const data = {
      //     name: channelName,
      //   };
      //     await setDoc(doc(db, "cities"), data);
      const docRef = await addDoc(collection(db, "rooms"), {
        name: channelName,
      });
      console.log("docRef", docRef);
    }
  };

  const selectChannel = () => {
    // selectRoomId;
    console.log("selecting channel !", id);
    if (id) {
      dispatch(enterRoom({ roomId: id }));
    }
  };

  return (
    <SidebarOptionContainer
      onClick={addChannelOption ? addchannel : selectChannel}
    >
      {Icon && <Icon style={{ fontSize: "small", padding: "10px" }} />}
      {Icon ? (
        <h3> {title} </h3>
      ) : (
        <SidebarOptionChannel>
          <span>#</span>
          {title}
        </SidebarOptionChannel>
      )}
    </SidebarOptionContainer>
  );
};

export default SidebarOption;
