import { useState } from 'react'
import './App.css'

function App() {
  const [history, setHistory] = useState([""]); // stores all text states
  const [currentStep, setCurrentStep] = useState(0); // index in history

  const handleChange = (e) => {
    const newText = e.target.value;

    // If typing after undo, remove all "future" states
    const updatedHistory = history.slice(0, currentStep + 1);

    // Add the new text state to history
    updatedHistory.push(newText);

    setHistory(updatedHistory);
    setCurrentStep(updatedHistory.length - 1);
  };

  const handleUndo = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRedo = () => {
    if (currentStep < history.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div>
      <textarea
        data-testid="textarea"
        value={history[currentStep]}
        onChange={handleChange}
        rows="5"
        cols="40"
      />
      <br />
      <button
        data-testid="undo-button"
        onClick={handleUndo}
        disabled={currentStep === 0}
      >
        Undo
      </button>
      <button
        data-testid="redo-button"
        onClick={handleRedo}
        disabled={currentStep === history.length - 1}
      >
        Redo
      </button>
    </div>
  );
}

export default App
