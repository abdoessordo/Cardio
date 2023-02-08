import { useEffect, useState } from "react";
import { useStepperContext } from "../../contexts/StepperContext";

export default function RadioWithOptions({
  id,
  input_name,
  label,
  value,
  options,
}) {
  const { userData, setUserData } = useStepperContext();
  const [parentChecked, setParentChecked] = useState(null);
  const [nestedChecked, setNestedChecked] = useState(null);

  useEffect(() => {
    if (userData["current_use_of_oral_anticoagulants"] === null) {
      setParentChecked(null);
      setNestedChecked(null);
    }
  }, []);

  let childChecked = {};

  const handleChild = (e) => {
    // check if child is a nested question
    const isNestedQuestion = e.target.getAttribute("nested-question");
    if (isNestedQuestion) {
      setNestedChecked(e.target.checked);
    }

    childChecked = { [value]: e.target.value };
    setUserData({ ...userData, [input_name]: childChecked });
  };

  const handleParent = (e) => {
    setUserData({ ...userData, [e.target.name]: "" });
    setParentChecked({ [input_name]: e.target.value });
  };

  const checked =
    userData[input_name] === "" || typeof userData[input_name] === "object";

  return (
    <>
      <input
        id={id}
        type="radio"
        name={input_name}
        value={value}
        onChange={(e) => handleParent(e)}
      />
      <label htmlFor={id}>{label}</label>
      <br />

      {checked && (
        <div className="flex flex-col ml-5">
          {options.map((option, index) => {
            if (option.nestedQuestion) {
              return (
                <div key={index}>
                  <input
                    id={option.value}
                    type="radio"
                    name={id}
                    value={option.value}
                    nested-question="true"
                    onChange={(e) => handleChild(e)}
                  />
                  <label htmlFor={option.value}>{option.label}</label>
                  <br />

                  {nestedChecked && (
                    <div className="flex flex-col ml-5">
                      {option.nestedQuestion.options.map(
                        (nestedOption, index) => (
                          <div key={index}>
                            <input
                              id={nestedOption.value}
                              type="radio"
                              name={option.value}
                              value={nestedOption.value}
                              onChange={(e) => handleChild(e)}
                            />
                            <label htmlFor={nestedOption.value}>
                              {nestedOption.label}
                            </label>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
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
