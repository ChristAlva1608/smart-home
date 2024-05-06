import React, { useEffect } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import { BsFillMicFill } from "react-icons/bs";

export default function VoiceRecognition( {setCheckedLight, setCheckedFan} ) {
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
    speechRecognitionProperties: {
        lang: 'vi-VN',
        interimResults: true,
    }
  });
  useEffect(() => {
    {results.map((result) => {
      const transcript = result.transcript.toLowerCase(); 
      if (transcript.includes("bật đèn")) {
        setCheckedLight(true)
      } else if (transcript.includes("tắt đèn")) {
        setCheckedLight(false)
      } else if (transcript.includes("bật quạt")) {
        setCheckedFan(true)
      } else if (transcript.includes("tắt quạt")) {
        setCheckedFan(false)
      }
    })}
  }, [results])
  
  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;
  
  return (
    <div>
      <button
      className="rounded-full bg-white border border-red-500 p-1 hover:scale-90 transition"
      onClick={isRecording ? stopSpeechToText : startSpeechToText}
    >
      <BsFillMicFill
        className={`${isRecording ? " text-red-500" : "text-slate-900"} 
        rounded-full w-6 h-6
        `}
      />
    </button>
      <ul>
        {results.map((result) => (
          <li key={result.timestamp}>{result.transcript}</li>

        ))}
        {interimResult && <li>{interimResult}</li>}
      </ul>
    </div>
  );
}