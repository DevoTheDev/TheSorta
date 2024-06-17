"use client";
import { CSS } from './formattable';
import React, { useState, useEffect } from 'react';

// Extract all CSS property keys from React.CSSProperties
const styleProperties = Object.keys({
    height: '',
    width: '',
    display: '',
    flexDirection: 'row',
    padding: '',
    margin: '',
    border: '',
    backgroundColor: '',
    justifyContent: 'flex-start',
    overflow: '',
    overflowX: 'auto',
    overflowY: 'auto',
    borderRadius: '',
    background: '',
    position: 'relative',
    zIndex: 'auto',
    alignItems: 'center',
    font: 'inherit',
    fontSize: '',
    fontFamily: 'inherit',
    fontWeight: 'inherit',
    color: '',
    animation: 'auto',
    transition: 'none',
    transform: 'none',
    textOverflow: 'clip',
    textDecoration: '',
} as CSS);

interface StylesFormProps {
  formStyles: CSS;
  draftStyles: CSS;
  setStyles: (styles: CSS) => void;
  applyStyles: () => void;
  closeForm: () => void;
}

const StylesForm: React.FC<StylesFormProps> = ({ draftStyles, formStyles, setStyles, applyStyles, closeForm }) => {
  const [localStyles, setLocalStyles] = useState<CSS>(draftStyles);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalStyles({ ...localStyles, [name]: value });
  };

  const handleSave = () => {
    setStyles(localStyles);
    applyStyles();
};

  useEffect(() => {
    setLocalStyles(draftStyles);
  }, [draftStyles]);

  return (
    <div
        style={formStyles}
    >
      {styleProperties.map(prop => (
        <div
        key={prop}>
          <label>{prop}</label>
          <input
            type="text"
            name={prop}
            value={localStyles[prop as keyof CSS] || ''}
            onChange={handleChange}
            style={{
                backgroundColor: 'cyan'
            }}
          />
        </div>
      ))}
      <div 
      style={{
        display: 'flex',
        justifyContent: 'space-around'
        
      }}
      className="btns">
      <button onClick={handleSave}>
        <div
            style={{backgroundColor: 'red', padding: '1rem 2rem'}}
        >SAVE</div>
      </button>
      <button onClick={closeForm}>Close</button>
      </div>
    </div>
  );
};

export default StylesForm;
