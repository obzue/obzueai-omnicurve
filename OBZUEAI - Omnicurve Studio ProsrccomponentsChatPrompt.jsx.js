import React, { useState } from 'react';
import { Mic, MicOff, Send, Sparkles } from 'lucide-react';

export default function ChatPrompt({ onSendMessage }) {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  const toggleMic = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser tab.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    if (!isListening) {
      recognition.start();
      setIsListening(true);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
    } else {
      setIsListening(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center bg-slate-900 border border-slate-700/80 rounded-xl p-2 shadow-xl focus-within:border-cyan-500 transition-all">
      <button
        type="button"
        onClick={toggleMic}
        className={`p-2.5 rounded-lg transition-all ${
          isListening ? 'bg-red-500/20 text-red-400 animate-pulse' : 'hover:bg-slate-800 text-slate-400 hover:text-cyan-400'
        }`}
        title="Voice Vibe Coding Prompt Bar"
      >
        {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
      </button>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type or speak a vibe coding prompt (e.g., 'Build a 3D city plaza with neon lights')..."
        className="w-full bg-transparent px-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
      />

      <button
        type="submit"
        className="p-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-all flex items-center justify-center shrink-0 shadow-md shadow-cyan-600/30"
      >
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
}