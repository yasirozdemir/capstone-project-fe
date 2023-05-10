import { createGradient } from "../../../tools";
import { useState, useEffect } from "react";
import "./style.css";

const BG = ({ colors }: { colors: string[] }) => {
  const [gradient, setGradient] = useState("");

  useEffect(() => {
    setGradient(createGradient(colors));
  }, [colors]);

  return <div id="bg-holder" style={{ background: gradient }}></div>;
};

export default BG;
