import React from "react";
import styled from "styled-components";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const HeaderContainer = styled.div`
  /* color: red; */
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  background-color: var(--slack-color);
  color: white;
  padding: 10px 0;
`;

const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  /* margin-left: 20px; */
  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
  }
`;

const HeaderSearch = styled.div`
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  text-align: center;
  background-color: #421f44;
  display: flex;
  padding: 0px 50px;
  color: gray;
  border: 1px solid gray;
  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw;
    outline: none;
    color: white;
  }
`;

const HeaderAvatar = styled.img`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
  margin-left: 15px;
  border-radius: 50%;
  object-fit: conver;
  height: 30px;
  src: ${(props) => props.img};
`;

const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: flex-end;
  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 20px;
  }
`;
const Header = () => {
  const [user] = useAuthState(auth);
  console.log("user", user);

  return (
    <>
      <HeaderContainer>
        <HeaderLeft>
          <HeaderAvatar onClick={() => auth.signOut()} src={user?.photoURL} />
          <WatchLaterIcon />
        </HeaderLeft>

        <HeaderSearch>
          <SearchIcon />
          <input type="text" placeholder="Search" />
        </HeaderSearch>
        <HeaderRight>
          <HelpOutlineIcon />
        </HeaderRight>
      </HeaderContainer>
    </>
  );
};

export default Header;
