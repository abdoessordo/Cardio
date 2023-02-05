import { useStepperContext } from "../../contexts/StepperContext";

export default function Select({
  name,
  placeholder,
  options = [{ titles: [""], value: "" }],
}) {
  const { userData, setUserData } = useStepperContext();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
      <select
        className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
        name={name}
        onChange={(e) => handleChange(e)}
      >
        <option defaultValue={null}>{placeholder}</option>
        {options.map((option, index) =>
          option.titles.map((title, index) => {
            return (
              <option key={index} value={option.value}>
                {title}
              </option>
            );
          })
        )}
      </select>
    </div>
  );
}

// {options.map((option, index) => {
//   return (
//     <option key={index} value={option.value}>
//       {option.title}
//     </option>
//   );
// })}
