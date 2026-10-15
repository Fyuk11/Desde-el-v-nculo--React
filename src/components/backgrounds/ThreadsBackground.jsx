import { useEffect, useRef } from 'react';

export default function ThreadsBackground({
  color = '#6B8E7B',
  amplitude = 1,
  distance = 0,
  enableMouseInteraction = true,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      if (!enableMouseInteraction) return;
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Cantidad de líneas/hilos sinusoidales
    const count = 28;
    let step = 0;

    const render = () => {
      step += 0.008;

      // Suavizado del puntero del mouse
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = color;
      ctx.globalAlpha = 0.12; // Opacidad baja elegida para Dark Premium

      for (let i = 0; i < count; i++) {
        ctx.beginPath();
        const factor = i / count;
        const offsetX = (mouse.x - width / 2) * 0.1 * factor;
        const offsetY = (mouse.y - height / 2) * 0.1 * factor;

        for (let x = 0; x <= width; x += 20) {
          const y =
            height * 0.5 +
            Math.sin(x * 0.003 + step + i * 0.2) * 60 * amplitude +
            Math.cos(x * 0.001 + step * 0.5) * 40 +
            (i - count / 2) * (15 + distance) +
            offsetY;

          if (x === 0) {
            ctx.moveTo(x + offsetX, y);
          } else {
            ctx.lineTo(x + offsetX, y);
          }
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, amplitude, distance, enableMouseInteraction]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
    />
  );
}