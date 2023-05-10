import { createGradient } from "../../../tools";
import { useState, useEffect } from "react";
import "./style.css";

interface Props {
  primColor: string;
  secColor: string;
}

const BG = ({ primColor, secColor }: Props) => {
  const [gradient, setGradient] = useState("");

  useEffect(() => {
    setGradient(createGradient(primColor, secColor));
  }, [primColor, secColor]);

  return <div id="bg-holder" style={{ background: gradient }}></div>;
};

export default BG;
