import { useStepperContext } from "../../contexts/StepperContext";

export default function Radio({ id, name, label, value, setShowPopup }) {
  const { userData, setUserData } = useStepperContext();

  const handleChange = (e) => {
    if (
      ["Emergent non-cardiac surgery", "Urgent non-cardiac surgery"].includes(
        e.target.value
      )
    ) {
      setShowPopup(true);
    }
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <input
        id={id}
        type="radio"
        name={name}
        value={label}
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor={id}>{label}</label>
    </>
  );
}
