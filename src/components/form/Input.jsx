import { useStepperContext } from "../../contexts/StepperContext";


export default function Input({ name, placeholder, type }) {
    const { userData, setUserData } = useStepperContext();

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    return (
      <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
        <input
          // value={userData[name] || ""}
          name={name}
          placeholder={placeholder}
          type={type}
          className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          onChange={(e) => handleChange(e)}
        />
      </div>
    );
  };