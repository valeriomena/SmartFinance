import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';

interface CalculatorButtonProps {
  onClick: () => void;
  tooltip: string;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({ onClick, tooltip }) => {
  return (
    <button type="button" onClick={onClick} title={tooltip}>
      <FontAwesomeIcon icon={faCalculator} />
    </button>
  );
};

export default CalculatorButton;
