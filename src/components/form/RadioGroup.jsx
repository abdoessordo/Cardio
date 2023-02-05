import Radio from "./Radio";
import RadioWithOptions from "./RadioWithOptions";

export default function RadioGroup({ name, options, question, setShowPopup}) {
  // console.log("options", options);
  console.log(question);

  return (
    <>
      {options?.map((option, index) => {
        if (option.nestedQuestion) {
          return (
            <div key={index}>
              <RadioWithOptions
                id={option.value}
                input_name={name}
                label={option.label}
                value={option.value}
                options={option.nestedQuestion.options}
              />
            </div>
          );
        } else {
          return (
            <div key={index}>
              <Radio
                id={option.value}
                label={option.label}
                value={option.value}
                name={name}
                setShowPopup={setShowPopup}
              />
              <br />
            </div>
          );
        }
      })}
    </>
  );
}
