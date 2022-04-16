import React, { useState } from "react";
import AppNavbar from "../components/AppNavbar";
import AppSidebar from "../components/AppSidebar";
import TodayTask from "../components/TodayTask";
import { motion } from "framer-motion";

const Today = () => {
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
      <AppNavbar setIsOpen={setIsOpen} isOpen={isOpen} />
      <div className="mt-[80px] w-full flex overflow-hidden">
        {isOpen ? <AppSidebar /> : null}
        <TodayTask isOpen={isOpen} />
      </div>
    </motion.div>
  );
};

export default Today;
