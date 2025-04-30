/**
 * ShakeHandler.jsx
 * ----------------------------------------------
 * React component for detecting shake gestures
 * using the device's motion sensors.
 * 
 * When a shake is detected, it calls the `onShake` callback.
 * Can be used for skipping exercises, triggering events, etc.
 * 
 * Author: Dario Santiago Lopez
 * Course: CSC 332 - Mobile & Pervasive Computing
 * Partner: Anthony Roca
 * Date: April 11, 2025
 * ----------------------------------------------
 */

import { useEffect } from 'react';

const ShakeHandler = ({ onShake, threshold = 15, debounceTime = 1000 }) => {
  useEffect(() => {
    let lastX = null, lastY = null, lastZ = null;
    let lastShakeTime = 0;

    // Handle motion events from device sensors
    const handleMotion = (event) => {
      const acc = event.accelerationIncludingGravity;
      if (!acc) return;

      const now = Date.now();

      // Calculate change in acceleration on each axis
      const deltaX = Math.abs(acc.x - (lastX || 0));
      const deltaY = Math.abs(acc.y - (lastY || 0));
      const deltaZ = Math.abs(acc.z - (lastZ || 0));

      const totalShake = deltaX + deltaY + deltaZ;

      // If shake exceeds threshold and cooldown period has passed
      if (totalShake > threshold && now - lastShakeTime > debounceTime) {
        lastShakeTime = now;
        onShake(); // Trigger callback (e.g., skip workout step)
      }

      // Save last values for comparison
      lastX = acc.x;
      lastY = acc.y;
      lastZ = acc.z;
    };

    // Attach motion listener
    window.addEventListener('devicemotion', handleMotion, true);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('devicemotion', handleMotion, true);
    };
  }, [onShake, threshold, debounceTime]);

  return null; // No UI component needed
};

export default ShakeHandler;
