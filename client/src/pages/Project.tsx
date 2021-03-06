import React, { useEffect, useState } from "react";
import AppNavbar from "../components/AppNavbar";
import AppSidebar from "../components/AppSidebar";
import { motion } from "framer-motion";
import ProjectTask from "../components/ProjectTask";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProject } from "../actions/singleproject";
import { getProjectTasks } from "../actions/projecttask";

const Project = () => {
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage?.getItem("token") as string);
  const { projectId } = useParams();
  useEffect(() => {
    dispatch(getProject(token, projectId as string));
    dispatch(getProjectTasks(token, projectId as string));
  }, [projectId, dispatch, token]);
  const [isOpen, setIsOpen] = useState(true);
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
    >
      <AppNavbar
        isProject={true}
        projectId={projectId}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
      <div className="mt-[80px] w-full flex overflow-hidden">
        {isOpen ? <AppSidebar /> : null}
        <ProjectTask isOpen={isOpen} />
      </div>
    </motion.div>
  );
};

export default Project;
