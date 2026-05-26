import React from 'react';

export interface BaseButtonProps {
  label: string;
  onClick?: () => void;
  primary?: boolean;
}

export const BaseButton: React.FC<BaseButtonProps> = ({ label, onClick, primary }) => {
  const style: React.CSSProperties = {
    backgroundColor: primary ? '#007bff' : '#6c757d',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <button style={style} onClick={onClick}>
      {label}
    </button>
  );
};
