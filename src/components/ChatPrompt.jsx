import React, { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Send } from 'lucide-react';

export default function ChatPrompt({ onSendMessage }) {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => () => recognitionRef.current?.stop?.(), []);

  const toggleMic = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setNote('Speech recognition is not available in this browser.');
      return;
    }

    if (!recognitionRef.current) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
      };
      recognition.onerror = () => {
        setIsListening(false);
        setNote('Microphone stopped. Type the prompt instead.');
      };
      recognition.onend = () => setIsListening(false);
      recognitionRef.current = recognition;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    setNote('');
    recognitionRef.current.start();
    setIsListening(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;
    onSendMessage(text);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="relative flex items-center rounded-xl border border-slate-700/80 bg-slate-900 p-2 shadow-xl focus-within:border-cyan-500">
        <button
          type="button"
          onClick={toggleMic}
          className={`rounded-lg p-2.5 transition-all ${
            isListening
              ? 'animate-pulse bg-red-500/20 text-red-400'
              : 'text-slate-400 hover:bg-slate-800 hover:text-cyan-400'
          }`}
          aria-pressed={isListening}
          title="Speak a prompt in this tab"
        >
          {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </button>
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Type or speak a prompt for this tab"
          className="w-full bg-transparent px-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
        />
        <button
          type="submit"
          className="flex shrink-0 items-center justify-center rounded-lg bg-cyan-600 p-2.5 text-white shadow-md shadow-cyan-600/30 hover:bg-cyan-500"
          aria-label="Send prompt"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
      {note ? <p className="text-xs text-amber-300">{note}</p> : null}
    </form>
  );
}
