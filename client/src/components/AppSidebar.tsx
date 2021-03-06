import React, { useEffect, useState } from "react";
import { IoTodaySharp, IoCloudDoneSharp } from "react-icons/io5";
import { Divider, Text, useColorMode } from "@chakra-ui/react";
import {
  BsInboxFill,
  BsCalendarWeekFill,
  BsFillTrashFill,
} from "react-icons/bs";
import { Accordion } from "@chakra-ui/react";
import SidebarAccordian from "./SidebarAccordian";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { getTodayTasks } from "../actions/todaytask";
import { getInboxTasks } from "../actions/inboxtask";
import { getWeeklyTasks } from "../actions/weeklytask";
import { getProjects } from "../actions/project";
import { getTags } from "../actions/tag";
import { getCompletedTasks } from "../actions/completedtasks";
import { useSelector } from "react-redux";
import { getDeletedTasks } from "../actions/deletedtasks";
import Loader from "../pages/Loader";

const AppSidebar = () => {
  const [loading, setLoading] = useState(true);
  console.log(loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();
  const token = JSON.parse(localStorage?.getItem("token") as string);
  const todayTaskFetch = async () => {
    dispatch(getTodayTasks(token));
  };
  const inboxTaskFetch = async () => {
    dispatch(getInboxTasks(token));
  };
  const weeklyTaskFetch = async () => {
    dispatch(getWeeklyTasks(token));
  };
  const tagsFetch = async () => {
    dispatch(getTags(token));
  };
  const projectsFetch = async () => {
    dispatch(getProjects(token));
  };
  const completeTasksFetch = async () => {
    dispatch(getCompletedTasks(token));
  };
  const deletedTasksFetch = async () => {
    dispatch(getDeletedTasks(token));
  };
  useEffect(() => {
    todayTaskFetch();
    inboxTaskFetch();
    weeklyTaskFetch();
    projectsFetch();
    tagsFetch();
    completeTasksFetch();
    deletedTasksFetch();
    setLoading(false);
  }, [token, dispatch]);
  const inboxtask = useSelector((data: any) => data?.inboxtask?.inboxTaskData);
  const todaytask = useSelector((data: any) => data?.todaytask?.todayTaskData);
  const completedtasks = useSelector(
    (data: any) => data?.completedtasks?.completedTaskData
  );
  const weeklytask = useSelector(
    (data: any) => data?.weeklytask?.weeklyTaskData
  );
  const deletedtasks = useSelector(
    (data: any) => data?.deletedtasks?.deletedTasksData
  );
  return loading ? (
    <Loader />
  ) : (
    <div
      className="w-[23%] overflow-y-auto fixed h-[calc(100vh-80px)]"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
      }}
    >
      <div className="flex flex-col pt-4 pl-4 w-full h-full pr-7 gap-4">
        {colorMode === "dark" ? (
          <div className="flex flex-col w-full gap-1">
            <motion.div
              whileHover={{
                scale: window.location.pathname === "/app/today" ? 1.0 : 1.05,
              }}
              className="flex items-center justify-between cursor-pointer hover:bg-[#21242a] p-4 rounded-md"
              style={{
                backgroundColor:
                  window.location.pathname === "/app/today" ? "#21242a" : "",
              }}
              onClick={() => {
                navigate("/app/today");
              }}
            >
              <div className="flex items-center gap-4">
                <IoTodaySharp size="22" />
                <Text fontSize="md">Today</Text>
              </div>
              <Text fontSize="md" color="gray.500">
                {todaytask?.length}
              </Text>
            </motion.div>
            <motion.div
              whileHover={{
                scale: window.location.pathname === "/app/week" ? 1.0 : 1.05,
              }}
              className="flex items-center justify-between cursor-pointer hover:bg-[#21242a] p-4 rounded-md"
              style={{
                backgroundColor:
                  window.location.pathname === "/app/week" ? "#21242a" : "",
              }}
              onClick={() => {
                navigate("/app/week");
              }}
            >
              <div className="flex items-center gap-4">
                <BsCalendarWeekFill size="22" />
                <Text fontSize="md">Weekly</Text>
              </div>
              <Text fontSize="md" color="gray.500">
                {weeklytask?.length}
              </Text>
            </motion.div>
            <motion.div
              whileHover={{
                scale: window.location.pathname === "/app/inbox" ? 1.0 : 1.05,
              }}
              className="flex items-center justify-between cursor-pointer hover:bg-[#21242a] p-4 rounded-md"
              style={{
                backgroundColor:
                  window.location.pathname === "/app/inbox" ? "#21242a" : "",
              }}
              onClick={() => {
                navigate("/app/inbox");
              }}
            >
              <div className="flex items-center gap-4">
                <BsInboxFill size="22" />
                <Text fontSize="md">Inbox</Text>
              </div>
              <Text fontSize="md" color="gray.500">
                {inboxtask?.length}
              </Text>
            </motion.div>
          </div>
        ) : (
          <div className="flex flex-col w-full gap-1">
            <motion.div
              whileHover={{
                scale: window.location.pathname === "/app/today" ? 1.0 : 1.05,
              }}
              className="flex items-center justify-between cursor-pointer hover:bg-[#f0f0f0] p-4 rounded-md"
              style={{
                backgroundColor:
                  window.location.pathname === "/app/today" ? "#f0f0f0" : "",
              }}
              onClick={() => {
                navigate("/app/today");
              }}
            >
              <div className="flex items-center gap-4">
                <IoTodaySharp size="22" />
                <Text fontSize="md">Today</Text>
              </div>
              <Text fontSize="md" color="gray.500">
                {todaytask?.length}
              </Text>
            </motion.div>
            <motion.div
              whileHover={{
                scale: window.location.pathname === "/app/week" ? 1.0 : 1.05,
              }}
              className="flex items-center justify-between cursor-pointer hover:bg-[#f0f0f0] p-4 rounded-md"
              style={{
                backgroundColor:
                  window.location.pathname === "/app/week" ? "#f0f0f0" : "",
              }}
              onClick={() => {
                navigate("/app/week");
              }}
            >
              <div className="flex items-center gap-4">
                <BsCalendarWeekFill size="22" />
                <Text fontSize="md">Weekly</Text>
              </div>
              <Text fontSize="md" color="gray.500">
                {weeklytask?.length}
              </Text>
            </motion.div>
            <motion.div
              whileHover={{
                scale: window.location.pathname === "/app/inbox" ? 1.0 : 1.05,
              }}
              className="flex items-center justify-between cursor-pointer hover:bg-[#f0f0f0] p-4 rounded-md"
              style={{
                backgroundColor:
                  window.location.pathname === "/app/inbox" ? "#f0f0f0" : "",
              }}
              onClick={() => {
                navigate("/app/inbox");
              }}
            >
              <div className="flex items-center gap-4">
                <BsInboxFill size="22" />
                <Text fontSize="md">Inbox</Text>
              </div>
              <Text fontSize="md" color="gray.500">
                {inboxtask?.length}
              </Text>
            </motion.div>
          </div>
        )}
        <Divider />
        <div className="flex flex-col w-full gap-1">
          <Accordion allowMultiple className="gap-1">
            <SidebarAccordian title="Projects" isTag={false} />
            <SidebarAccordian title="Tags" isTag={true} />
          </Accordion>
        </div>
        <Divider />
        {colorMode === "dark" ? (
          <div className="flex flex-col w-full gap-1">
            <motion.div
              whileHover={{
                scale:
                  window.location.pathname === "/app/completed" ? 1.0 : 1.05,
              }}
              className="flex items-center justify-between cursor-pointer hover:bg-[#21242a] p-4 rounded-md"
              style={{
                backgroundColor:
                  window.location.pathname === "/app/completed"
                    ? "#21242a"
                    : "",
              }}
              onClick={() => {
                navigate("/app/completed");
              }}
            >
              <div className="flex items-center gap-4">
                <IoCloudDoneSharp size="22" />
                <Text fontSize="md">Completed</Text>
              </div>
              <Text fontSize="md" color="gray.500">
                {completedtasks?.length}
              </Text>
            </motion.div>
            <motion.div
              whileHover={{
                scale: window.location.pathname === "/app/trash" ? 1.0 : 1.05,
              }}
              className="flex items-center justify-between cursor-pointer hover:bg-[#21242a] p-4 rounded-md"
              style={{
                backgroundColor:
                  window.location.pathname === "/app/trash" ? "#21242a" : "",
              }}
              onClick={() => {
                navigate("/app/trash");
              }}
            >
              <div className="flex items-center gap-4">
                <BsFillTrashFill size="22" />
                <Text fontSize="md">Trash</Text>
              </div>
              <Text fontSize="md" color="gray.500">
                {deletedtasks?.length}
              </Text>
            </motion.div>
          </div>
        ) : (
          <div className="flex flex-col w-full gap-1">
            <motion.div
              whileHover={{
                scale:
                  window.location.pathname === "/app/completed" ? 1.0 : 1.05,
              }}
              className="flex items-center justify-between cursor-pointer hover:bg-[#f0f0f0] p-4 rounded-md"
              style={{
                backgroundColor:
                  window.location.pathname === "/app/completed"
                    ? "#f0f0f0"
                    : "",
              }}
              onClick={() => {
                navigate("/app/completed");
              }}
            >
              <div className="flex items-center gap-4">
                <IoCloudDoneSharp size="22" />
                <Text fontSize="md">Completed</Text>
              </div>
              <Text fontSize="md" color="gray.500">
                {completedtasks?.length}
              </Text>
            </motion.div>
            <motion.div
              whileHover={{
                scale: window.location.pathname === "/app/trash" ? 1.0 : 1.05,
              }}
              className="flex items-center justify-between cursor-pointer hover:bg-[#f0f0f0] p-4 rounded-md"
              style={{
                backgroundColor:
                  window.location.pathname === "/app/trash" ? "#f0f0f0" : "",
              }}
              onClick={() => {
                navigate("/app/trash");
              }}
            >
              <div className="flex items-center gap-4">
                <BsFillTrashFill size="22" />
                <Text fontSize="md">Trash</Text>
              </div>
              <Text fontSize="md" color="gray.500">
                {deletedtasks?.length}
              </Text>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppSidebar;
