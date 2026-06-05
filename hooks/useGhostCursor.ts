import { useEffect, useRef } from 'react';

export function useGhostCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    const container = containerRef.current;
    const cursor = cursorRef.current;
    if (!container || !cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Add to trail
      trailRef.current.push({ x: mouseX, y: mouseY });
      if (trailRef.current.length > 15) {
        trailRef.current.shift();
      }
    };

    const handleMouseEnter = () => {
      cursor.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      cursor.style.opacity = '1';
      trailRef.current = [];
    };

    // Animation loop
    const animationFrame = () => {
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;

      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;

      // Render trail
      const trails = container.querySelectorAll('.cursor-trail');
      trails.forEach((trail, index) => {
        const point = trailRef.current[index];
        if (point) {
          (trail as HTMLElement).style.left = `${point.x}px`;
          (trail as HTMLElement).style.top = `${point.y}px`;
          (trail as HTMLElement).style.opacity = `${(index / trailRef.current.length) * 0.6}`;
        }
      });

      requestAnimationFrame(animationFrame);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    const frameId = requestAnimationFrame(animationFrame);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return { containerRef, cursorRef };
}
