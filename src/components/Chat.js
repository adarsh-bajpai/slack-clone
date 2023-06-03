import React, { useRef, useState } from "react";
import styled from "styled-components";
import StarOutlineOutlinedIcon from "@material-ui/icons/StarOutlineOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { selectRoomId } from "../features/appSlice";
import { useSelector } from "react-redux";
import ChatInput from "./ChatInput";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { collection, doc, getFirestore } from "firebase/firestore";
import Message from "./Message";
import { useEffect } from "react/cjs/react.development";
import { query, where, orderBy } from "firebase/firestore";

// styles :
const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const Headerleft = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }
  > h4 > .MuiSvgIcon-root {
    margin-left: 20px;
    font-size: 18px;
  }
`;

const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 16px;
  }
  > p > .MuiSvgIcon-root {
    margin-right: 5px !important ;
    font-size: 18px;
  }
`;

const ChatMessages = styled.div``;

const ChatBottom = styled.div`
  padding-bottom: 200px;
`;

const Chat = () => {
  const roomId = useSelector((state) => state.app.roomId);

  const chatRef = useRef();

  const [roomDetails, loading, error] = useDocument(
    doc(getFirestore(), "rooms", `${roomId}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const [roomMessages, loading2, error2] = useCollection(
    collection(getFirestore(), `rooms/${roomId}/messages`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const roomsRef = collection(db, `rooms/${roomId}/messages`);
  const q = query(roomsRef, orderBy("timestamp"));
  // console.log("q__.", q?.data);
  // console.log("q__.", q?.docs[0]?.data());
  // console.log("q__.", q.data());

  // console.log("roomMessages", roomMessages?.docs[0]?.data());
  // console.log("roomMessages2", roomMessages);

  if (chatRef && chatRef.current) {
    chatRef.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <ChatContainer>
      {roomDetails && roomMessages && (
        <>
          <Header>
            <Headerleft>
              <h4>
                <strong>#{roomDetails?.data()?.name || "Annonymous"}</strong>
              </h4>
              <StarOutlineOutlinedIcon />
            </Headerleft>
            <HeaderRight>
              <p>
                <InfoOutlinedIcon />
                Details
              </p>
            </HeaderRight>
          </Header>
          <ChatMessages>
            {roomMessages?.docs.map((doc) => {
              const { message, timestamp, user, userImage } = doc.data();
              return (
                <Message
                  key={doc.id}
                  message={message}
                  timestamp={timestamp}
                  user={user}
                  userImage={userImage}
                />
              );
            })}
            <ChatBottom ref={chatRef} />
          </ChatMessages>
          {/* chat input ! */}
          <ChatInput
            chatRef={chatRef}
            channelId={roomId}
            channelName={roomDetails?.data()?.name}
          />
        </>
      )}
    </ChatContainer>
  );
};

export default Chat;
