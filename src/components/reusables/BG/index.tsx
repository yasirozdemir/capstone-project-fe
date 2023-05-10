import { createGradient } from "../../../tools";
import { useState, useEffect } from "react";
import "./style.css";

const BG = ({ colors, to }: { colors: string[]; to: string }) => {
  const [gradient, setGradient] = useState("");

  useEffect(() => {
    setGradient(createGradient(colors, to));
  }, [colors, to]);

  return <div id="bg-holder" style={{ background: gradient }}></div>;
};

export default BG;
