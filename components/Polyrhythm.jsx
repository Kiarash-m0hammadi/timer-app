"use client";
import React, { useEffect, useRef, useState } from "react";

const Polyrhythm = ({ timer }) => {
  const canvasRef = useRef(null);
  const [isOn, setIsOn] = useState(false); // State variable to track the on/off state

  useEffect(() => {
    let numberOfLoops = 21 + Math.abs(Math.round((timer - 378) / 18));
    let startTime = new Date().getTime();

    const draw = () => {
      if (timer > 0) {
        setIsOn(true);
      }
      const currentTime = new Date().getTime(),
        elapsedTime = (currentTime - startTime) / 1000;

      if (elapsedTime >= timer) {
        return setIsOn(false);
      } // Stop drawing if the timer has expired
      if (!isOn) return; // Stop drawing if the state is "off"

      const canvas = canvasRef.current;
      const pen = canvas.getContext("2d");

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      pen.strokeStyle = "gray";
      pen.lineWidth = 6;

      const start = {
        x: canvas.width * 0.1,
        y: canvas.height * 0.9,
      };
      const end = {
        x: canvas.width * 0.9,
        y: canvas.height * 0.9,
      };

      //line
      pen.beginPath();
      pen.moveTo(start.x, start.y);
      pen.lineTo(end.x, end.y);
      pen.stroke();

      const length = end.x - start.x;

      // arc
      const initialArcRadius = length * 0.05;
      const spacing = (length / 2 - initialArcRadius) / 21;
      const center = { x: canvas.width / 2, y: canvas.height * 0.9 };

      for (let index = 0; index < 21; index++) {
        const arcRadius = initialArcRadius + index * spacing;
        pen.beginPath();
        pen.arc(center.x, center.y, arcRadius, Math.PI, Math.PI * 2);
        pen.stroke();
      }

      const velocity = (numberOfLoops * Math.PI * 2) / timer;
      for (let index = 0; index < 21; index++) {
        const newNumberOfLoops = numberOfLoops - index;
        const velocity = (newNumberOfLoops * Math.PI * 2) / timer;
        const arcRadius = initialArcRadius + index * spacing;
        const distance = Math.PI + elapsedTime * velocity;
        const maxAngle = Math.PI * 2;
        const modDistance = distance % maxAngle;
        const adjustedDistance =
          modDistance > Math.PI ? modDistance : maxAngle - modDistance;
        const x = center.x + arcRadius * Math.cos(adjustedDistance);
        const y = center.y + arcRadius * Math.sin(adjustedDistance);

        pen.fillStyle = "black";
        pen.beginPath();
        pen.arc(x, y, length * 0.0065, 0, Math.PI * 2);
        pen.fill();
      }

      requestAnimationFrame(draw);
    };

    draw();
  }, [isOn, timer]); // Include the state variable in the dependency array

  const handleToggle = () => {
    setIsOn(!isOn); // Toggle the state when the toggle button is clicked
  };

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
      <button onClick={handleToggle}>{isOn ? "Off" : "On"}</button>{" "}
      {/* Toggle button */}
    </div>
  );
};

export default Polyrhythm;
