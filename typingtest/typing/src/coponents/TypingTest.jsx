



import React, { useState, useEffect } from 'react';
import '../App.css';

const testTexts = [
  "The quick brown fox jumps over the lazy dog.",
  "React makes it painless to create interactive UIs.",
  "Typing speed depends on practice and concentration.",
  "JavaScript is versatile and widely used in web development.",
];

const TypingTest = () => {
  const [selectedTime, setSelectedTime] = useState(1); // Test duration in minutes
  const [testText, setTestText] = useState("");
  const [inputText, setInputText] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [wordsTyped, setWordsTyped] = useState(0);
  const [mistakeIndex, setMistakeIndex] = useState(-1);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
    }
  }, [timeLeft, isActive]);

  const startTest = () => {
    setTestText(testTexts[Math.floor(Math.random() * testTexts.length)]);
    setInputText("");
    setWordsTyped(0);
    setTimeLeft(selectedTime * 60);
    setIsActive(true);
    setMistakeIndex(-1);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputText(value);

    const lastCharIndex = value.length - 1;
    if (value[lastCharIndex] !== testText[lastCharIndex]) {
      setMistakeIndex(lastCharIndex);
    } else {
      setMistakeIndex(-1);
    }

    if (value.endsWith(" ")) {
      const typedWords = value.trim().split(" ").length;
      setWordsTyped(typedWords);
    }
  };

  const calculateWPM = () => {
    return Math.round((wordsTyped / (selectedTime * 60 - timeLeft)) * 60) || 0;
  };

  return (
    <div className="container">
      <h1>Typing Speed Test</h1>

      <div className="settings">
        <label>Select Test Duration:</label>
        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(Number(e.target.value))}
          disabled={isActive}
        >
          <option value={1}>1 Minute</option>
          <option value={3}>3 Minutes</option>
          <option value={5}>5 Minutes</option>
        </select>
      </div>

      <div className="test-area">
        <p className="test-text">
          {testText.split('').map((char, index) => (
            <span
              key={index}
              className={
                mistakeIndex === index
                  ? 'mistake'
                  : index < inputText.length
                  ? inputText[index] === char
                    ? 'correct'
                    : 'incorrect'
                  : ''
              }
            >
              {char}
            </span>
          ))}
        </p>
        <textarea
          placeholder="Start typing here..."
          value={inputText}
          onChange={handleInputChange}
          disabled={!isActive}
        ></textarea>
      </div>

      <div className="controls">
        <button onClick={startTest} disabled={isActive}>Start Test</button>
        <p>Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}</p>
      </div>

      {!isActive && timeLeft === 0 && wordsTyped > 0 && (
        <div className="results">
          <h2>Test Results</h2>
          <p>Words Per Minute (WPM): {calculateWPM()}</p>
        </div>
      )}
    </div>
  );
};
export default TypingTest;