import { useStepperContext } from "../../contexts/StepperContext";
import CheckboxGroup from "./CheckboxGroup";
import Input from "./Input";
import Select from "./Select";
import RadioGroup from "./RadioGroup";

export default function Question({ question, setShowPopup }) {
  return (
    <div>
      {/* Question Label */}
      <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
        {question.label}
      </div>

      {/* Checkbox with Sections*/}
      {question.sections?.map((section, sectionIndex) => {
        return (
          // Wrapper
          <div key={sectionIndex} className="ml-4">
            <div className="ml-4">
              {/* Section Title */}
              <h1 className="font-bold">{section.title}</h1>

              {/* Question */}
              <CheckboxGroup
                name={section.name}
                options={section.options}
                sections={undefined}
                question={question}
              />
            </div>
          </div>
        );
      })}

      {/* Verifying input Type */}

      {/* Input */}
      {question.type === "input" && (
        <Input
          name={question.name}
          placeholder={question.label}
          type={question.input_type}
        />
      )}

      {/* Select */}
      {question.type === "select" && (
        <Select
          options={question.options}
          name={question.name}
          placeholder={question.label}
        />
      )}

      {/* Radio */}
      {question.type === "radio" && (
        <RadioGroup
          options={question.options}
          name={question.name}
          question={question}
          setShowPopup={setShowPopup}
        />
      )}

      {/* Checkbox */}
      {question.type === "checkbox" && (
        <CheckboxGroup
          options={question.options}
          sections={question.sections}
          name={question.name}
          question={question}
        />
      )}
    </div>
  );
}
