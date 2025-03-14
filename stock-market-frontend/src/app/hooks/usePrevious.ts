"use client"
import { useEffect, useRef } from "react";

const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value; // Store previous value
  }, [value]);
  return ref.current; // Return previous value
};

export default usePrevious;