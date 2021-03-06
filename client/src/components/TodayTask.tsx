import { Heading, Text, useColorMode } from "@chakra-ui/react";
import React from "react";
import { MdSort, MdOutlineTitle } from "react-icons/md";
import AddTaskComponent from "./AddTaskComponent";
import TaskComponent from "./TaskComponent";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { BsFillFlagFill } from "react-icons/bs";
import { BiTime } from "react-icons/bi";
import { useSelector } from "react-redux";
import {
  filerTodayTaskTime,
  filerTodayTaskTitle,
  getTodayTasks,
} from "../actions/todaytask";
import { useDispatch } from "react-redux";

type Props = {
  isOpen?: boolean;
};

const TodayTask = (props: Props) => {
  const todaytask = useSelector((data: any) => data?.todaytask?.todayTaskData);
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage?.getItem("token") as string);
  return (
    <div
      className={
        !props.isOpen
          ? "pl-[10%] w-full min-h-[calc(100vh-80px)] h-full p-11 mr-9"
          : "pl-[30%] w-full min-h-[calc(100vh-80px)] h-full p-11 mr-9"
      }
    >
      <div className="flex sticky items-center w-full justify-between">
        <div className="flex items-center gap-2">
          <Heading as="h2" fontSize="2xl">
            Today
          </Heading>
          <Text fontSize="md" color="gray.500">
            Sun 10 Apr
          </Text>
        </div>
        {colorMode === "light" ? (
          <Menu>
            <MenuButton
              _hover={{
                backgroundColor: "#f0f0f0",
              }}
            >
              <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[#f0f0f0] rounded-md">
                <MdSort size="25" />
                <Text color="gray.500" fontSize="md">
                  View
                </Text>
              </div>
            </MenuButton>
            <MenuList>
              <MenuItem
                className="flex items-center gap-3"
                onClick={() => {
                  dispatch(getTodayTasks(token));
                }}
              >
                <MdSort size="25" />
                <Text fontSize="md">Custom</Text>
              </MenuItem>
              <MenuItem
                className="flex items-center gap-3"
                onClick={() => {
                  dispatch(filerTodayTaskTime(token));
                }}
              >
                <BiTime size="25" />
                <Text fontSize="md">By Time</Text>
              </MenuItem>
              <MenuItem
                className="flex items-center gap-3"
                onClick={() => {
                  dispatch(filerTodayTaskTitle(token));
                }}
              >
                <MdOutlineTitle size="25" />
                <Text fontSize="md">By Title</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Menu>
            <MenuButton
              _hover={{
                backgroundColor: "#21242a",
              }}
            >
              <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[#21242a] rounded-md">
                <MdSort size="25" />
                <Text color="gray.500" fontSize="md">
                  View
                </Text>
              </div>
            </MenuButton>
            <MenuList>
              <MenuItem
                className="flex items-center gap-3"
                onClick={() => {
                  dispatch(getTodayTasks(token));
                }}
              >
                <MdSort size="25" />
                <Text fontSize="md">Custom</Text>
              </MenuItem>
              <MenuItem
                className="flex items-center gap-3"
                onClick={() => {
                  dispatch(filerTodayTaskTime(token));
                }}
              >
                <BiTime size="25" />
                <Text fontSize="md">By Time</Text>
              </MenuItem>
              <MenuItem
                className="flex items-center gap-3"
                onClick={() => {
                  dispatch(filerTodayTaskTitle(token));
                }}
              >
                <MdOutlineTitle size="25" />
                <Text fontSize="md">By Title</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </div>
      <div className="flex flex-col w-full items-start mt-5 gap-4">
        {todaytask?.map((task: any, index: React.Key) => (
          <TaskComponent
            key={index}
            title={task?.title}
            description={task?.description}
            id={task?._id}
            isTodayTask={true}
          />
        ))}
        <AddTaskComponent isTodayTask={true} />
        {todaytask?.length === 0 ? (
          <div className=" flex w-full justify-center items-center">
            <div className="flex-col flex w-full items-center justify-center gap-3">
              <img src="/svgexport-27.svg" />
              <Heading fontSize="2xl">
                Be productive, Start creating tasks
              </Heading>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default TodayTask;
