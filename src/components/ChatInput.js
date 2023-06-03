import React, { useRef, useState } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { auth, db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectRoomId } from "../features/appSlice";
import { useAuthState } from "react-firebase-hooks/auth";

//  styles :
const ChatContainer = styled.div`
  border-radius: 20px;
  > form {
    position: relative;
    display: flex;
    justify-content: center;
    > input {
      position: fixed;
      outline: none;
      bottom: 30px;
      width: 60%;
      border-radius: 3px;
      padding: 20px;
      outline: none;
    }

    > button {
      display: none;
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const ChatInput = ({ channelName, channelId, chatRef }) => {
  // fx :
  //   const inputRef = useRef();

  const [user] = useAuthState(auth);
  const roomId = useSelector(selectRoomId);

  const [input, setInput] = useState("");

  console.log("rendering compo");
  const handleClick = async (e) => {
    e.preventDefault();
    //    if there is no channle id return
    console.log("sending data !");
    if (roomId === null || roomId === undefined) return;

    console.log("data dalne wala hu ! !");
    // db.collection("rooms").doc(channelId).collection("messages").add({});
    //   db
    const data = {
      message: input,
      timestamp: serverTimestamp(),
      user: user.displayName,
      userImage: user.photoURL,
    };

    // const messageRef = doc(db, "rooms", "roomA", "messages", "message1");
    const docRef = await addDoc(
      collection(db, `rooms/${roomId}/messages`),
      data
    );
    chatRef?.current?.scrollIntoView({ behavior: "smooth" });
    console.log("docRef", docRef);
    setInput("");
    console.log("data dal diye !");
  };

  console.log("input _> ", input);
  console.log("roomId", roomId);

  return (
    <ChatContainer>
      <form onSubmit={handleClick}>
        <input
          type="text"
          //   ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message to ${channelName}`}
        />
        <Button
          //   hidden
          type="submit"
          onClick={handleClick}
          variant="contained"
          color="primary"
        >
          SEND
        </Button>
      </form>
    </ChatContainer>
  );
};

export default ChatInput;
