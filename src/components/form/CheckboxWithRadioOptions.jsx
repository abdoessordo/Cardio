import { useState } from "react";
import { useStepperContext } from "../../contexts/StepperContext";
import CheckboxWithCheckboxOptions from "./CheckboxWithCheckboxOptions";

export default function CheckboxWithRadioOptions({
  id,
  input_name,
  label,
  value,
  options,
  groupName,
}) {
  const { userData, setUserData } = useStepperContext();
  const [parentChecked, setParentChecked] = useState(false);

  let childChecked = {};

  const handleChild = (e) => {
    childChecked = { [value]: e.target.value };

    // update key value pair
    // Verify if an object with the same key exists
    for (let item of userData[groupName]) {
      if (typeof item === "object" && item[value]) {
        item[value] = e.target.value;
        setUserData({ ...userData, [groupName]: userData[groupName] });
        return;
      }
    }

    setUserData({
      ...userData,
      [groupName]: [...userData[groupName], childChecked],
    });
  };

  const handleParent = (e) => {
    setParentChecked(e.target.checked);
    if (!e.target.checked) {
      //remove from userData
      let test = userData[groupName].filter((item) =>
        typeof item === "object" ? input_name !== e.target.value : item
      );

      setUserData({ ...userData, [groupName]: test });
    } else {
      // initialize empty array if not exist
      if (!userData[groupName]) {
        setUserData({ ...userData, [groupName]: [] });
      }
    }
  };

  return (
    <>
      <input
        id={id}
        type="checkbox"
        name={input_name}
        value={value}
        onChange={(e) => handleParent(e)}
      />
      <label htmlFor={id}>{label}</label>
      <br />

      {parentChecked && (
        <div className="flex flex-col ml-5">
          {options.map((option, index) => {
            if (option.nestedQuestion) {
              console.log("ALEEEEEERT")
              return (
                <CheckboxWithCheckboxOptions
                  id={option.value}
                  input_name={option.value}
                  label={option.label}
                  value={option.value}
                  options={option.nestedQuestion.options}
                  groupName={option.name}
                />
              );
            }
            return (
              <div key={index}>
                <input
                  id={option.value}
                  type="radio"
                  name={id}
                  value={option.value}
                  onChange={(e) => handleChild(e)}
                />
                <label htmlFor={option.value}>{option.label}</label>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
