import { useEffect, useRef } from 'react';

interface CursorOptions {
  size?: number;
  color?: string;
  blendMode?: string;
  zIndex?: number;
}

export const useCursorEffect = (options: CursorOptions = {}) => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    // Default options
    const {
      size = 30,
      color = 'rgba(0, 255, 255, 0.5)',
      blendMode = 'screen',
      zIndex = 9999
    } = options;
    
    // Create cursor element
    const cursor = document.createElement('div');
    cursor.style.position = 'fixed';
    cursor.style.pointerEvents = 'none';
    cursor.style.width = `${size}px`;
    cursor.style.height = `${size}px`;
    cursor.style.borderRadius = '50%';
    cursor.style.backgroundColor = color;
    cursor.style.mixBlendMode = blendMode;
    cursor.style.zIndex = `${zIndex}`;
    cursor.style.transition = 'transform 0.2s ease-out, opacity 0.2s ease-out';
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.opacity = '0';
    
    document.body.appendChild(cursor);
    cursorRef.current = cursor;
    
    // Mouse move handler
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      cursor.style.opacity = '1';
      cursor.style.transform = `translate(${clientX}px, ${clientY}px) translate(-50%, -50%) scale(1)`;
    };
    
    // Mouse down/up handlers
    const onMouseDown = () => {
      cursor.style.transform = `translate(${cursor.style.left}, ${cursor.style.top}) translate(-50%, -50%) scale(0.8)`;
    };
    
    const onMouseUp = () => {
      cursor.style.transform = `translate(${cursor.style.left}, ${cursor.style.top}) translate(-50%, -50%) scale(1)`;
    };
    
    // Mouse enter/leave handlers
    const onMouseLeave = () => {
      cursor.style.opacity = '0';
    };
    
    const onMouseEnter = () => {
      cursor.style.opacity = '1';
    };
    
    // Add event listeners
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    
    // Clean up
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      
      if (cursorRef.current) {
        document.body.removeChild(cursorRef.current);
      }
    };
  }, [options]);
  
  return cursorRef;
};