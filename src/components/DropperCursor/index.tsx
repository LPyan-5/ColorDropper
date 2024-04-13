import React from 'react';

import Trellis from '../Trellis';
import { getReverseColor } from '../../utils/getReverseColor';

import styles from './styles.module.css';

interface Props {
    color: string;
    getColor: (x: number, y: number) => string;
    cursorPosition: {
        startX: number;
        startY: number;
    };
    dropperPosition: {
        x: number;
        y: number;
    };
}

const DropperCursor: React.FC<Props> = ({
    color,
    getColor,
    cursorPosition,
    dropperPosition,
}) => {
    return (
        <div
            className={styles.dropperCursor}
            style={{
                left: dropperPosition.x,
                top: dropperPosition.y,
            }}
        >
            <div className={styles.dropperTrellis}>
                <Trellis getColor={getColor} cursorPosition={cursorPosition} />
                <svg
                    fill="none"
                    width="166"
                    height="166"
                    viewBox="0 0 160 160"
                    className={styles.dropperCircle}
                >
                    <path
                        fill={color}
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M80 148C117.555 148 148 117.555 148 80C148 42.4446 117.555 12 80 12C42.4446 12 12 42.4446 12 80C12 117.555 42.4446 148 80 148ZM80 160C124.183 160 160 124.183 160 80C160 35.8172 124.183 0 80 0C35.8172 0 0 35.8172 0 80C0 124.183 35.8172 160 80 160Z"
                    />
                </svg>
                <div
                    className={styles.circleHex}
                    style={{
                        backgroundColor: getReverseColor(color),
                    }}
                >
                    {color}
                </div>
            </div>
        </div>
    );
};

export default DropperCursor;
