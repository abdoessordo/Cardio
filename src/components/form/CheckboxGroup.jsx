import Checkbox from "./Checkbox";
import CheckboxWithCheckboxOptions from "./CheckboxWithCheckboxOptions";
import CheckboxWithRadioOptions from "./CheckboxWithRadioOptions";
import CheckboxWithSections from "./CheckboxWithSections";

export default function CheckboxGroup({ name, options, sections }) {
  // console.log("options", options);
  if (sections) {
    return "";
  } else if (options) {
    return (
      <>
        {options?.map((option, index) => {
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
            console.log("B");
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
