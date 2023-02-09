import { useState } from "react";
import { useStepperContext } from "../../contexts/StepperContext";
import Checkbox from "./Checkbox";
import CheckboxWithCheckboxOptions from "./CheckboxWithCheckboxOptions";
import CheckboxWithRadioOptions from "./CheckboxWithRadioOptions";
import CheckboxWithSections from "./CheckboxWithSections";

export default function CheckboxGroup({ name, options, sections }) {
  const [checked, setChecked] = useState(false);
  const { userData, setUserData } = useStepperContext();

  const handleChange = (e) => {
    const { name } = e.target;
    setChecked(!checked);
    setUserData({ ...userData, [name]: !checked });
  };

  const handleChangeRadio = (e) => {
    const { value, name } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // ("options", options);
  if (sections) {
    return "";
  } else if (options) {
    return (
      <>
        {options?.map((option, index) => {
          if (option.label === "Coronary artery disease") {
            return (
              <div key={index}>
                <input
                  type="checkbox"
                  name="Coronary artery disease"
                  id="Coronary artery disease"
                  value="Coronary artery disease"
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="Coronary artery disease">
                  Coronary artery disease
                </label>
                <br />

                {checked && (
                  <div className="ml-5" id="acute">
                    <div>
                      <input
                        type="radio"
                        name="coronary"
                        id="Acute coronary syndrome"
                        value="Acute coronary syndrome"
                        onChange={(e) => handleChangeRadio(e)}
                      />
                      <label htmlFor="Acute coronary syndrome">
                        Acute coronary syndrome
                      </label>
                      <br />
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="coronary"
                        id="Chronic coronary syndrome"
                        value="Chronic coronary syndrome"
                        onChange={(e) => handleChangeRadio(e)}
                      />
                      <label htmlFor="Chronic coronary syndrome">
                        Chronic coronary syndrome
                      </label>
                      <br />
                    </div>

                    <div>
                      <input
                        type="radio"
                        name="isStented"
                        id="Stented"
                        value="Stented"
                        onChange={(e) => handleChangeRadio(e)}
                      />
                      <label htmlFor="Stented">Stented</label>
                      <br />
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="isStented"
                        id="Not stented"
                        value="Not stented"
                        onChange={(e) => handleChangeRadio(e)}
                      />
                      <label htmlFor="Not stented">Not stented</label>
                      <br />
                    </div>

                    <div>
                      <input
                        type="radio"
                        name="bypassGraft"
                        id="Bypass graft"
                        value="Bypass graft"
                        onChange={(e) => handleChangeRadio(e)}
                      />
                      <label htmlFor="Bypass graft">Bypass graft</label>
                      <br />
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="bypassGraft"
                        id="Not bypass graft"
                        value="Not bypass graft"
                        onChange={(e) => handleChangeRadio(e)}
                      />
                      <label htmlFor="Not bypass graft">Not bypass graft</label>
                      <br />
                    </div>
                  </div>
                )}
              </div>
            );
          }
          if (option.sections) {
            return (
              <div key={index}>
                <CheckboxWithSections
                  id={option.value}
                  input_name={option.value}
                  name={option.name}
                  label={option.label}
                  value={option.value}
                  sections={option.sections}
                  groupName={name}
                />
              </div>
            );
          }
          if (option.nestedQuestion?.type === "checkbox") {
            return (
              <div key={index}>
                <CheckboxWithCheckboxOptions
                  id={option.value}
                  input_name={option.value}
                  label={option.label}
                  value={option.value}
                  options={option.nestedQuestion.options}
                  groupName={name}
                />
              </div>
            );
          }

          if (option.nestedQuestion?.type === "radio") {
            return (
              <div key={index}>
                <CheckboxWithRadioOptions
                  id={option.value}
                  input_name={option.value}
                  label={option.label}
                  value={option.value}
                  options={option.nestedQuestion.options}
                  groupName={name}
                />
              </div>
            );
          }

          if (!option.nestedQuestion) {
            return (
              <div key={index}>
                <Checkbox
                  key={index}
                  id={option.value}
                  name={option.value}
                  label={option.label}
                  value={option.value}
                  groupName={name}
                />
                <br />
              </div>
            );
          }

          return null;
        })}
      </>
    );
  }
}
