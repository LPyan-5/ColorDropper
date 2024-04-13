import React from 'react';

import DropperIcon from '../../assets/dropperIcon.svg';
import styles from './styles.module.css';

interface ToolsProps {
    color: string;
    isActive: boolean;
    handleDropperClick: () => void;
}

const Tools: React.FC<ToolsProps> = ({
    color,
    isActive,
    handleDropperClick,
}) => {
    return (
        <div className={styles.tools}>
            <button
                className={`${styles.dropperBtn} ${isActive && styles.active}`}
                onClick={handleDropperClick}
            >
                <img
                    alt="Dropper"
                    src={DropperIcon}
                    className={styles.dropperIcon}
                />
            </button>
            <div className={styles.hexShow}>
                <div
                    className={styles.color}
                    style={{ backgroundColor: color }}
                />
                {color}
            </div>
        </div>
    );
};

export default Tools;
