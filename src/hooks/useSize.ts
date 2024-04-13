import { useState, useEffect } from 'react';

type Size = {
  width: number;
  height: number;
};

const getSizes = (): Size => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

export const useSize = (): Size => {
  const [size, setSize] = useState<Size>(getSizes());

  useEffect(() => {
    const onResize = () => {
      setSize(getSizes());
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return size;
}
