import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import ProgressBar from "progressbar.js";
import "./Form.css";

const Form = () => {
  const [data, setData] = useState<any>(null);
  const [prenom1, setPrenom1] = useState<string>("");
  const [prenom2, setPrenom2] = useState<string>("");
  const audioRef65 = useRef<HTMLAudioElement>(null);
  const audioRef35 = useRef<HTMLAudioElement>(null);
  const audioRef75 = useRef<HTMLAudioElement>(null);
  const audioRef85 = useRef<HTMLAudioElement>(null);

  // Fonction pour obtenir le pourcentage
  const handleSubmit = async () => {
    if (prenom1 === "ouioui" && prenom2 === "ouioui") {
      setData({
        percentage: 200,
        specialMessage: alert(
          "Bonne Vacance ! ⛱️ ( déso pas déso pour vos oreilles )"
        ),
      });
      document.body.style.backgroundImage = `url(/img/ouioui.jpg)`;
      document.body.classList.add("ouioui");

      if (audioRef65.current) audioRef65.current.pause();
      if (audioRef35.current) audioRef35.current.pause();
      if (audioRef75.current) audioRef75.current.pause();
      if (audioRef85.current) audioRef85.current.play();

      return;
    }

    try {
      const response = await fetch(
        `https://love-calculator.p.rapidapi.com/getPercentage?sname=${prenom1}&fname=${prenom2}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "218e3a2ed1msh7ab27ccd287c822p18298djsn00b708633176",
            "x-rapidapi-host": "love-calculator.p.rapidapi.com",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result || null);
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  };

  useEffect(() => {
    if (data && data.percentage !== undefined) {
      if (data.percentage > 65 && data.percentage < 100) {
        document.body.style.backgroundImage = `url(/img/oui.jpeg)`;
        if (audioRef65.current) audioRef65.current.play();
        if (audioRef35.current) audioRef35.current.pause();
        if (audioRef75.current) audioRef75.current.pause();
        if (audioRef85.current) audioRef85.current.pause();
      } else if (data.percentage < 35) {
        document.body.style.backgroundImage = `url(/img/non.jpeg)`;
        if (audioRef35.current) audioRef35.current.play();
        if (audioRef65.current) audioRef65.current.pause();
        if (audioRef75.current) audioRef75.current.pause();
        if (audioRef85.current) audioRef85.current.pause();
      } else if (data.percentage >= 35 && data.percentage <= 65) {
        document.body.style.backgroundImage = `url(/img/mouais.jpg)`;
        if (audioRef75.current) audioRef75.current.play();
        if (audioRef65.current) audioRef65.current.pause();
        if (audioRef35.current) audioRef35.current.pause();
        if (audioRef85.current) audioRef85.current.pause();
      }
    }
  }, [data]);

  useEffect(() => {
    if (data && data.percentage !== undefined) {
      const bar = new ProgressBar.Path("#heart-path", {
        easing: "easeInOut",
        duration: 1400,
      });

      bar.set(0);
      bar.animate(data.percentage / 100);
    }
  }, [data]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "prenom1") {
      setPrenom1(value);
    } else if (id === "prenom2") {
      setPrenom2(value);
    }
  };

  return (
    <div>
      <label htmlFor="prenom1">Name 1:</label>
      <input id="prenom1" type="text" value={prenom1} onChange={handleChange} />
      <label htmlFor="prenom2">Name 2:</label>
      <input id="prenom2" type="text" value={prenom2} onChange={handleChange} />
      <button type="button" onClick={handleSubmit}>
        Test l'amour
      </button>

      {data && (
        <div className="result-container">
          <div id="container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
              <path
                fillOpacity="0"
                strokeWidth="1"
                stroke="#bbb"
                d="M81.495,13.923c-11.368-5.261-26.234-0.311-31.489,11.032C44.74,13.612,29.879,8.657,18.511,13.923  C6.402,19.539,0.613,33.883,10.175,50.804c6.792,12.04,18.826,21.111,39.831,37.379c20.993-16.268,33.033-25.344,39.819-37.379  C99.387,33.883,93.598,19.539,81.495,13.923z"
              />
              <path
                id="heart-path"
                fillOpacity="0"
                strokeWidth="3"
                stroke="#ED6A5A"
                d="M81.495,13.923c-11.368-5.261-26.234-0.311-31.489,11.032C44.74,13.612,29.879,8.657,18.511,13.923  C6.402,19.539,0.613,33.883,10.175,50.804c6.792,12.04,18.826,21.111,39.831,37.379c20.993-16.268,33.033-25.344,39.819-37.379  C99.387,33.883,93.598,19.539,81.495,13.923z"
              />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dy=".3em"
                fill="#ED6A5A"
                fontSize="18"
                fontFamily="Arial"
              >
                {data.percentage}%
              </text>
            </svg>
          </div>
        </div>
      )}

      {data?.specialMessage && (
        <div className="special-message">{data.specialMessage}</div>
      )}

      <audio ref={audioRef65} src="/audio/rizz-sounds.mp3" />
      <audio ref={audioRef35} src="/audio/aaa-sounds.mp3" />
      <audio ref={audioRef75} src="/audio/oe-pas-mal-2.mp3" />
      <audio ref={audioRef85} src="/audio/ouioui.mp3" />
    </div>
  );
};

export default Form;
