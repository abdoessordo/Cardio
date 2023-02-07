import { useState } from "react";
import { useStepperContext } from "../../contexts/StepperContext";

export default function Checkbox({ id, name, label, value, groupName }) {
  const [checked, setChecked] = useState(false);

  const { userData, setUserData } = useStepperContext();

  let checkedList = userData[groupName] || [];
  
  const handleChange = (e) => {
    const { name } = e.target;
    setChecked(!checked);

    if (checked) {
        const index = checkedList.indexOf(name);
        if (index > -1) {
            checkedList.splice(index, 1);
        }
    } else {
        checkedList.push(name);
    }
    setUserData({ ...userData, [groupName]: checkedList });
	  console.log(userData);
  };

  return (
    <>
      <input
        type="checkbox"
        name={label}
        value={label}
        id={id}
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor={id}>{label}</label>
    </>
  );
}


// {
//   patient_name: "",
//   cardiovascular_risk_factor: "",
//   cardiovascular_antecedents: "",
//   non_cardiovascular_antecedents: "",
//   timing_of_surgery: "",
//   type_of_surgery_or_intervention: "",
//   bleeding_risk: "",
//   examination: [],
//   cv_atcd: "",
//   non_cv_atcd: ""
// }
