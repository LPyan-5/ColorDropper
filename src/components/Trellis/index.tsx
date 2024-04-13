import React, { useMemo } from 'react';

import { CENTER_POSITION, GRID_SIZE } from '../../constants';
import styles from './styles.module.css';

interface CursorPosition {
    startX: number;
    startY: number;
}

interface Props {
    getColor: (x: number, y: number) => string;
    cursorPosition: CursorPosition;
}

const Trellis: React.FC<Props> = ({ getColor, cursorPosition }) => {
    const gridData = useMemo<string[][]>(
        () =>
            new Array(GRID_SIZE)
                .fill(null)
                .map(() => new Array(GRID_SIZE).fill('')),
        [],
    );

    return (
        <div className={styles.gridContainer}>
            {gridData.map((row, x) =>
                row.map((cell, y) => (
                    <div
                        key={`${y}_${x}`}
                        className={styles.gridItem}
                        style={{
                            backgroundColor: getColor(
                                x + cursorPosition.startX,
                                y + cursorPosition.startY,
                            ),
                            ...(x === CENTER_POSITION && y === CENTER_POSITION
                                ? { outline: '1px solid' }
                                : {}),
                        }}
                    />
                )),
            )}
        </div>
    );
};

export default Trellis;
