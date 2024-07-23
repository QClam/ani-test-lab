import React, { useState, useEffect } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import "./App.css";

const Speech = () => {
  const [value, setValue] = useState("");
  const [voiceIndex, setVoiceIndex] = useState(null);
  const { speak, voices } = useSpeechSynthesis();
  const [selectedText, setSelectedText] = useState("")

  const voice = voices[voiceIndex] || null;

  useEffect(() => {
    if (voices.length > 0) {
      setVoiceIndex(0);
    }
  }, [voices]);

  const handleTextSelection = () => {
    const textarea = document.getElementById("text-to-speech-area");
    const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    setSelectedText(selectedText);
    if (!selectedText) {
      alert("Please select the text you want to speech")
    } else {
      speak({text: selectedText, voice: voice})
    }
  }

  return (
    <div className="speech">
      <div className="group">
        <h2>Text To Speech Converter Using React Js</h2>
      </div>
      <div className="group">
        <textarea
          id="text-to-speech-area"
          rows="10"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
      </div>
      <div className="group">
        <div>Chọn Voice đọc</div>
        <select
          onChange={(e) => setVoiceIndex(e.target.value)}
          value={voiceIndex || ""}
        >
        <option value="">Default</option>
          {voices.map((voice, index) => (
            <option key={index} value={index}>
              {`${voice.name} (${voice.lang})`}
            </option>
          ))}
        </select>
      </div>
      <div className="group">
        <button onClick={handleTextSelection} style={{marginBottom: 10}}>Speech Select Text</button>
        <button onClick={() => speak({text: value, voice: voice })}>
          Speech All Text
        </button>
      </div>
    </div>
  );
};

export default Speech;
