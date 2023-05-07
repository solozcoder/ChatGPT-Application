import { Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";

import { getTimeStamp, UID } from "../function/RandGen";
import { IoSend } from "react-icons/io5";

import {
  Box,
  Container,
  Flex,
  Textarea,
  Grid,
  GridItem,
  Stack,
  HStack,
} from "@chakra-ui/react";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import ScrollableFeed from "react-scrollable-feed";

import bot1 from "./../assets/image/bot1.png";
import bot2 from "./../assets/image/bot2.png";
import { usePostMessageMutation } from "../redux/services/messageSlice";
import { useDispatch } from "react-redux";

const Chat = () => {
  const [getChats, setChats] = useState([]);
  const [postMessage, { data: getAssistMessage }] = usePostMessageMutation();

  useEffect(() => {
    if (getAssistMessage) {
      setDB("chats", getAssistMessage);
    }
  }, [getAssistMessage]);

  const getDB = (dbName) => {
    var getLocalDb = localStorage.getItem(dbName);
    getLocalDb = JSON.parse(getLocalDb);

    return getLocalDb;
  };

  const setDB = (dbName, dbValue) => {
    var getLocalDb = getDB(dbName);

    if (!getLocalDb || typeof getLocalDb === "undefined") {
      localStorage.setItem(dbName, dbValue);
      return true;
    }

    getLocalDb.push(dbValue);

    localStorage.setItem(dbName, JSON.stringify(getLocalDb));
    setChats(getLocalDb);
    return true;
  };

  useEffect(() => {
    return () => {
      var getLocalChat = getDB("chats");

      if (!getLocalChat) {
        setDB("chats", "[]");
      } else {
        setChats(getLocalChat);
      }
    };
  }, []);

  const sendChat = () => {
    var getInp = document.getElementById("chat-input");
    if (!getInp || typeof getInp == "undefined")
      return console.log("Input tidak boleh kosong");

    var objUser = {
      role: "user",
      content: getInp.value,
    };

    setDB("chats", objUser);
    getInp.value = "";
    chatScroller();

    postMessage(objUser);
  };

  const chatScroller = () => {
    var getInp = document.getElementById("chat-input");
    getInp.style.height = 0;
    getInp.style.height = getInp.scrollHeight + "px";
  };

  return (
    <div className="container-chat">
      <Stack maxHeight={"90vh"} color={"white"}>
        <ScrollableFeed>
          {getChats.length > 0 &&
            getChats.map((obj, index) => (
              <Flex
                key={obj.id}
                className={obj.role}
                alignItems={"center"}
                justifyContent={"flex-start"}
                bgColor={obj.role === "user" ? "#272727" : ""}
                p={3}
              >
                <Box mr={5}>
                  {obj.role === "user" ? (
                    <Avatar>
                      <AvatarBadge boxSize="1.25em" bg="green.500" />
                    </Avatar>
                  ) : (
                    <Avatar src={bot2}>
                      <AvatarBadge boxSize="1.25em" bg="green.500" />
                    </Avatar>
                  )}
                </Box>
                <Box whiteSpace={"pre-wrap"}>
                  <p>{obj.content}</p>
                </Box>
              </Flex>
            ))}
        </ScrollableFeed>
      </Stack>

      <HStack
        position={"absolute"}
        bottom={"0"}
        width={"100%"}
        pr={5}
        borderTop={"1px solid rgb(107, 107, 107)"}
      >
        <Box width={"100%"} m={3}>
          <Textarea
            placeholder="Type something..."
            color="white"
            resize="none"
            id="chat-input"
            onInput={chatScroller}
          />
        </Box>
        <Box mr={3}>
          <IoSend
            size={"28px"}
            color={"white"}
            cursor={"pointer"}
            onClick={sendChat}
          />
        </Box>
      </HStack>
    </div>
  );
};

export default Chat;
