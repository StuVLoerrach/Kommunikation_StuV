import React, { useState } from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion for animations
import Avatar from "./Avatar";

const podiumColors = ["#FFD700", "#C0C0C0", "#CD7F32"]; // Hexadecimal colors for the podium (Gold, Silver, Bronze)

const Podium = ({ sortedAttendees, index }) => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Avatar index={index}/>

      <motion.div
        initial={{ y: -30, opacity: 0 }} // Initial animation state
        animate={{ y: 0, opacity: 1 }} // Animation when component mounts
        transition={{ delay: 0.2 * (index === 0 ? 1 : index === 1 ? 0 : 2) }} // Add delay for stagger effect based on position
        style={{
          width: "100px",
          height: `${
            (sortedAttendees[index].score / sortedAttendees[0].score) * 100
          }%`, // Calculate percentage height relative to the highest score
          backgroundColor: podiumColors[index],
          borderRadius: "10px",
        }}
      >
        <motion.div
          initial={{ scale: 0 }} // Initial animation state
          animate={{ scale: 1 }} // Animation when component mounts
          transition={{
            delay: 0.2 * (index === 0 ? 1 : index === 1 ? 0 : 2) + 0.4,
          }} // Add delay for stagger effect based on position
        >
          MI
        </motion.div>
      </motion.div>
      <div>{sortedAttendees[index].name}</div>
    </div>
  );
};

const TrophyPodium = ({ topThreeAttendees }) => {
  // Ensure topThreeAttendees has at least three elements
  while (topThreeAttendees.length < 3) {
    topThreeAttendees.push({ name: "", score: 0 }); // Add empty placeholders
  }

  // Sort the attendees based on their scores (descending order)
  const sortedAttendees = [...topThreeAttendees].sort(
    (a, b) => b.score - a.score
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        height: "100%",
      }}
    >
      <div style={{ textAlign: "center", margin: "0 20px", height: "100%" }}>
        <Podium index={1} sortedAttendees={sortedAttendees}></Podium>
      </div>
      <div style={{ textAlign: "center", margin: "0 20px", height: "100%" }}>
        <Podium index={0} sortedAttendees={sortedAttendees}></Podium>
      </div>
      <div style={{ textAlign: "center", margin: "0 20px", height: "100%" }}>
        <Podium index={2} sortedAttendees={sortedAttendees}></Podium>
      </div>
    </div>
  );
};

export default TrophyPodium;
