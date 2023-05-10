import { createGradient } from "../../../tools";
import { useState, useEffect } from "react";
import "./style.css";

const BG = ({ primColor, secColor }: props) => {
  const [gradient, setGradient] = useState("");

  useEffect(() => {
    setGradient(createGradient(primColor, secColor));
  }, [primColor, secColor]);

  return <div id="bg-holder" style={{ background: gradient }}></div>;
};

interface props {
  primColor: string;
  secColor: string;
}

export default BG;
