import { useState } from "react";

export default function useCheckbox(
  defaultValue: boolean
): [boolean, (event: React.ChangeEvent<HTMLInputElement>) => void] {
  const [isChecked, setIsChecked] = useState(defaultValue);

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIsChecked(event.target.checked);
  }

  return [isChecked, handleCheckboxChange];
}
