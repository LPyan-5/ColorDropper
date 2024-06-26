import React, { useState, useRef, useEffect, useMemo } from 'react';

import { useSize } from '../../hooks/useSize';

import Tools from '../Tools';
import DropperCursor from '../DropperCursor';
import ImageUrl from '../../assets/image.jpg';
import { rgbToHex } from '../../utils/rgbToHex';
import {
    SCALE_MAX,
    SCALE_MIN,
    DROPPER_SIZE,
    DEFAULT_COLOR,
    CENTER_POSITION,
    DEFAULT_POSITION,
} from '../../constants';

import styles from './styles.module.css';

interface Position {
    x: number;
    y: number;
    startX: number;
    startY: number;
}

const Root: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctx = useRef<CanvasRenderingContext2D | null>(null);
    const [isInsideCanvas, setIsInsideCanvas] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [color, setColor] = useState<string>(DEFAULT_COLOR);
    const [cursorPosition, setCursorPosition] =
        useState<Position>(DEFAULT_POSITION);

    const { width }: { width: number } = useSize();

    const scale = useMemo<number>(
        () => (width > 1440 ? SCALE_MAX : SCALE_MIN),
        [width],
    );

    const showDropper = useMemo<boolean>(
        () => isActive && isInsideCanvas,
        [isActive, isInsideCanvas],
    );

    const dropperPosition = useMemo(
        () => ({
            x: cursorPosition.x - DROPPER_SIZE / 2,
            y: cursorPosition.y,
        }),
        [cursorPosition],
    );

    const handleDropperClick = () => {
        setIsActive(!isActive);
    };

    // Returns the color data of a single pixel from the canvas context at (x, y) position
    const getImageData = (x: number, y: number): Uint8ClampedArray =>
        ctx.current!.getImageData(x, y, 1, 1).data;

    // Returns color at (x, y) position
    const getColor = (x: number, y: number): string => {
        const data = getImageData(x, y);
        if (!data) {
            return DEFAULT_COLOR;
        }
        const [r, g, b] = data.slice(0, 3);
        return rgbToHex(r, g, b);
    };

    // Gets and sets the current position's color hex value and cursor coordinates
    const getColorAndCursor = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const x = event.nativeEvent.offsetX;
        const y = event.nativeEvent.offsetY;
        if (!x || !y) return;
        if (!isInsideCanvas) {
            setIsInsideCanvas(true);
        }
        const data = getImageData(x, y);
        const [r, g, b] = data.slice(0, 3);
        const hex = rgbToHex(r, g, b);
        setCursorPosition({
            x,
            y,
            startX: x - CENTER_POSITION,
            startY: y - CENTER_POSITION,
        });

        setColor(hex);
    };

    const handleMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (isActive) {
            getColorAndCursor(e);
        }
    };

    // On canvas click sets color and deactivates the dropper mode
    const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (isActive) {
            getColorAndCursor(e);
            handleDropperClick();
        }
    };

    const handleMouseOut = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsInsideCanvas(false);
    };

    // Drawing image on canvas
    const drawImage = () => {
        const image = new Image();
        image.src = ImageUrl;
        image.onload = () => {
            const canvas = canvasRef.current!;
            ctx.current = canvas?.getContext('2d', {
                willReadFrequently: true,
            })!;

            const width = image.width * scale;
            const height = image.height * scale;

            canvas.width = window.innerWidth;
            canvas.height = height;

            const x = (canvas.width - width) / 2;

            ctx.current.drawImage(image, x, 0, width, height);
        };
    };

    useEffect(() => {
        drawImage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scale]);

    return (
        <div className={`${styles.wrapper} ${showDropper && styles.cursor}`}>
            <div
                className={`${styles.canvasWrapper} ${showDropper && styles.cursor}`}
            >
                <Tools
                    color={color}
                    isActive={isActive}
                    handleDropperClick={handleDropperClick}
                />
                <canvas
                    ref={canvasRef}
                    onClick={handleClick}
                    onMouseMove={handleMove}
                    className={styles.canvas}
                    onMouseOut={handleMouseOut}
                />
                {showDropper && (
                    <DropperCursor
                        color={color}
                        getColor={getColor}
                        cursorPosition={cursorPosition}
                        dropperPosition={dropperPosition}
                    />
                )}
            </div>
        </div>
    );
};

export default Root;
