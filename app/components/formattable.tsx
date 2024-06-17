"use client";
import React, { useState, useEffect } from 'react';
import StylesForm from './styleForm';

export type CSS = React.CSSProperties;

interface FormattableProps {
  children?: React.ReactNode;
  styles?: CSS;
}

const Formattable: React.FC<FormattableProps> = ({ children, styles }) => {
  const [formatStyles, setFormatStyles] = useState<CSS>(styles || {});
  const [formVisible, setFormVisible] = useState(false);
  const [draftStyles, setDraftStyles] = useState<CSS>({});

  const handleFormVisibility = () => {
    setFormVisible(!formVisible);
  };

  const applyStyles = () => {
    setFormatStyles(draftStyles);
  };

  useEffect(() => {
    console.log(draftStyles);
  }, [draftStyles]);

  useEffect(() => {
    setFormatStyles(draftStyles);
  }, [draftStyles]);

  const formStyles: CSS = { backgroundColor: 'green' }

  return (
    <div 
    onDoubleClick={handleFormVisibility}
    style={{ ...formatStyles }}>
      {formVisible && (
        <StylesForm
          formStyles={formStyles}
          draftStyles={draftStyles}
          setStyles={setDraftStyles}
          applyStyles={applyStyles}
          closeForm={() => setFormVisible(false)}
        />
      )}
      {children}
    </div>
  );
};

export default Formattable;
