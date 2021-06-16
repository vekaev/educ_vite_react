import React, { useEffect, useRef, useState } from "react";
import "./index.css";

export function CanvasGame() {
  const CanvasRef = useRef(null);

  const linkDownRef = useRef(null);
  const linkUpRef = useRef(null);
  const linkLeftRef = useRef(null);
  const linkRightRef = useRef(null);

  const [directionRef, setDirectionRef] = useState(linkDownRef);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    const context = CanvasRef.current.getContext("2d");
    context.canvas.height = window.innerHeight;
    context.canvas.width = window.innerWidth;

    context.fillRect(x, y, 100, 100);
  }, []);

  useEffect(() => {
    const handleKeyDown = ({ key }) => move(key);

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const context = CanvasRef.current.getContext("2d");
    context.clearRect(0, 0, window.innerHeight, window.innerWidth);

    context.drawImage(directionRef.current, x, y);
  }, [x, y]);

  const move = (direction) => {
    switch (direction) {
      case "ArrowUp":
        setDirectionRef(linkUpRef);
        setY((y) => y > 0 && y - 20);
        break;
      case "ArrowDown":
        setDirectionRef(linkDownRef);
        setY((y) => y + 20);
        break;
      case "ArrowRight":
        setDirectionRef(linkRightRef);
        setX((x) => x + 20);
        break;
      case "ArrowLeft":
        setDirectionRef(linkLeftRef);
        setX((x) => x > 0 && x - 20);
        break;
    }
  };

  return (
    <div className="canvas-game">
      <canvas ref={CanvasRef} />

      <div className="arrows">
        <button onClick={() => move("ArrowUp")}>Up</button>
        <button onClick={() => move("ArrowLeft")}>Left</button>
        <button onClick={() => move("ArrowDown")}>Down</button>
        <button onClick={() => move("ArrowRight")}>Right</button>
      </div>

      <div className="images">
        <img
          ref={linkDownRef}
          src="https://i.imgur.com/JYUB0m3.png"
          alt="Down"
        />
        <img
          ref={linkRightRef}
          src="https://i.imgur.com/GEXD7bk.gif"
          alt="Right"
        />
        <img ref={linkUpRef} src="https://i.imgur.com/XSA2Oom.gif" alt="Up" />
        <img
          ref={linkLeftRef}
          src="https://i.imgur.com/4LGAZ8t.gif"
          alt="Left"
        />
      </div>
    </div>
  );
}
