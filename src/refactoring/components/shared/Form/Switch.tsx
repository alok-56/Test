import React, { useState } from 'react';
import { Switch } from 'antd';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled:any
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange,disabled }) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  const handleChange = (checked: boolean) => {
    setIsChecked(checked);
    onChange(checked);
  };

  return <Switch checked={isChecked} onChange={handleChange} disabled={disabled} />;
};

export default ToggleSwitch;
