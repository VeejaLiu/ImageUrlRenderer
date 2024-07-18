import React, { useState, forwardRef, useImperativeHandle } from 'react';
import './InputContainer.css';

interface InputContainerProps {
  maxLength?: number;
  type?: string;
  pattern?: string;
  onEnterPressed?: () => void;
  [key: string]: any;
}

const InputContainer = forwardRef<
  {
    getValue: () => string;
    setValue: (value: string) => void;
  },
  InputContainerProps
>(({ maxLength, type = 'text', pattern, onEnterPressed, ...props }, ref) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (!pattern || new RegExp(pattern).test(value)) {
      setInputValue(value.slice(0, maxLength ?? 0));
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && onEnterPressed) {
      onEnterPressed();
    }
  };

  useImperativeHandle(ref, () => ({
    getValue: () => inputValue,
    setValue: (value) => setInputValue(value),
  }));

  return (
    <div className="input-container">
      <input
        type={type}
        id="input-img-url"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        maxLength={maxLength}
        required
        {...props}
      />
      <label htmlFor="input-img-url" className="label">
        Enter Image URL:
      </label>
      <div className="underline"></div>
    </div>
  );
});

export default InputContainer;
