import React, { useEffect, useRef } from 'react';

export default function LobbyPreview() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext('2d');
    let frame = 0;
    let raf = 0;

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      context.clearRect(0, 0, width, height);
      context.fillStyle = '#020617';
      context.fillRect(0, 0, width, height);

      context.strokeStyle = 'rgba(34, 211, 238, 0.25)';
      context.lineWidth = 1;
      for (let i = 0; i < 8; i += 1) {
        const y = 70 + i * 14 + Math.sin(frame / 40 + i) * 2;
        context.beginPath();
        context.moveTo(16, y);
        context.lineTo(width - 16, height - 20 - i * 4);
        context.stroke();
      }

      const towers = [28, 52, 78, 110, 148, 176, 210, 246];
      towers.forEach((x, index) => {
        const h = 40 + ((index * 17) % 55);
        const bob = Math.sin(frame / 30 + index) * 2;
        context.fillStyle = index % 2 === 0 ? '#0e7490' : '#155e75';
        context.fillRect(x, height - 36 - h + bob, 18, h);
        context.fillStyle = '#67e8f9';
        context.fillRect(x + 4, height - 30 - h + bob, 4, 4);
      });

      context.fillStyle = '#22d3ee';
      context.font = '12px ui-monospace, monospace';
      context.fillText('local preview', 16, 22);
      frame += 1;
      raf = window.requestAnimationFrame(draw);
    };

    raf = window.requestAnimationFrame(draw);
    return () => window.cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={320}
      height={180}
      className="h-40 w-full rounded-xl border border-slate-800 bg-slate-950"
      aria-label="Local lobby preview. Not a shared 3D world."
    />
  );
}
