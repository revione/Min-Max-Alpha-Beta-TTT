// Loader.js
import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen gap-2">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-8 h-8 bg-gray-700 rounded-full"
          initial={{ y: -10 }}
          animate={{ y: 10 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            repeatType: "mirror",
            delay: index * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default Loader;
