import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const App = () => {
  const commands = [
    {
      command: "clear",
      callback: () => resetTranscript(),
    },
  ];
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
  } = useSpeechRecognition({ commands });
  const startListeningEn = () =>
    SpeechRecognition.startListening({
      continuous: true,
      language: ["en-US"],
    });
  const startListeningAr = () =>
    SpeechRecognition.startListening({
      continuous: true,
      language: ["ar-SA"],
    });
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? "on" : "off"}</p>
      <p>
        <span> *BONUS* </span>Commands: {commands.map((c) => c.command + " ")}
      </p>
      <button
        onTouchStart={startListeningEn}
        onMouseDown={startListeningEn}
        onTouchEnd={SpeechRecognition.stopListening}
        onMouseUp={SpeechRecognition.stopListening}
      >
        Hold to talk [English (en-US)]
      </button>
      <button
        onTouchStart={startListeningAr}
        onMouseDown={startListeningAr}
        onTouchEnd={SpeechRecognition.stopListening}
        onMouseUp={SpeechRecognition.stopListening}
      >
        Hold to talk [Arabic (ar-SA)]
      </button>

      <button
        onClick={() => {
          resetTranscript();
        }}
      >
        Click to remove transcript
      </button>
      <p>{transcript}</p>
    </div>
  );
};
export default App;
