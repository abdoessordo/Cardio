import React, { useEffect, useState } from "react";
import { isCompositeComponent } from "react-dom/test-utils";
import { useStepperContext } from "../../contexts/StepperContext";
// import { useStepperContext } from "../../contexts/StepperContext";
import Input from "./Input";
import Select from "./Select";

const QuestionWithRecursion = ({ question, nested, parent }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionsCheckbox, setSelectedOptionsCheckbox] = useState([]);
  const { userData, setUserData } = useStepperContext();

  const [questionData, setQuestionData] = useState({});

  setQuestionParent();

  const handleParent = (e) => {
    const { value, type } = e.target;
    // ("checked: ", checked);

    if (type === "radio") {
      setSelectedOption(value);
      setUserData({ ...userData, [parent]: value });
      return;
    }

    let tempSelectedOptionsCheckbox = userData.medications_current_use || [];

    if (selectedOptionsCheckbox.includes(value)) {
      // Remove from array
      tempSelectedOptionsCheckbox = selectedOptionsCheckbox.filter(
        (option) => option !== value
      );
    } else {
      // Add to array
      tempSelectedOptionsCheckbox.push(value);
    }
    setSelectedOptionsCheckbox(tempSelectedOptionsCheckbox);
    setUserData({
      ...userData,
      medications_current_use: tempSelectedOptionsCheckbox,
    });
  };

  if (["results", "title"].includes(question.type)) {
    return null;
  }

  if (question.type === "select") {
    return (
      <>
        <div classvalue="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          {question.label}
        </div>
        <Select
          options={question.options}
          name={question.name}
          placeholder={question.label}
        />
      </>
    );
  }

  if (question.type === "input") {
    return (
      <>
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          {question.label}
        </div>
        <Input
          name={question.name}
          placeholder={question.label}
          type={question.input_type}
        />
      </>
    );
  }

  if (question.type === "checkbox") {
    if (question.sections) {
      return (
        <div>
          <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
            {question.label}
          </div>

          {question.sections?.map((section, sectionIndex) => {
            return (
              <div key={sectionIndex} className="ml-4">
                <div className="ml-4">
                  <h1 className="font-bold">{section.title}</h1>

                  {section.options.map((option, index) => {
                    return (
                      <div
                        key={index}
                        className={`${
                          nested && index === section.options.length - 1
                            ? "mb-5"
                            : ""
                        }`}
                      >
                        <input
                          section={sectionIndex}
                          index={index}
                          id={option.value}
                          type="checkbox"
                          value={option.value}
                          name={option.label}
                          checked={selectedOptionsCheckbox.includes(
                            option.value
                          )}
                          // onChange={handleCheckboxChange}
                          onChange={handleParent}
                        />
                        <label htmlFor={`${option.value}`}>
                          {option.label}
                        </label>

                        {option.nestedQuestion && (
                          <div
                            className={
                              selectedOptionsCheckbox.includes(option.label)
                                ? "ml-4"
                                : "ml-4 hidden"
                            }
                          >
                            <QuestionWithRecursion
                              question={option.nestedQuestion}
                              nested={true}
                              parent={option.value}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div>
        {question.label && (
          <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
            {question.label}
          </div>
        )}

        {question.options.map((option, index) => (
          <div
            key={index}
            className={`${
              nested && index === question.options.length - 1 ? "mb-5" : ""
            }`}
          >
            <input
              index={index}
              id={option.value}
              type="checkbox"
              value={option.value}
              name={option.label}
              checked={selectedOptionsCheckbox.includes(option.value)}
              // onChange={handleCheckboxChange}
              onChange={handleParent}
            />
            {/* name={input_name} */}
            <label htmlFor={option.value}>{option.label}</label>

            {option.sections?.map((section, index) => {
              return (
                <div key={index} className="ml-4">
                  <div
                    className={
                      // selectedOption === option.value ? "ml-4" : "ml-4 hidden"
                      selectedOptionsCheckbox.includes(option.value)
                        ? "ml-4"
                        : "ml-4 hidden"
                    }
                  >
                    <h1 className="font-bold">{section.title}</h1>
                  </div>
                  {section.nestedQuestion && (
                    <div
                      className={
                        // selectedOption === option.value ? "ml-4" : "ml-4 hidden"
                        selectedOptionsCheckbox.includes(option.value)
                          ? "ml-4"
                          : "ml-4 hidden"
                      }
                    >
                      <QuestionWithRecursion
                        question={section.nestedQuestion}
                        nested={true}
                        parent={option.value}
                      />
                    </div>
                  )}
                </div>
              );
            })}
            {option.nestedQuestion && (
              <div
                className={
                  selectedOptionsCheckbox.includes(option.value)
                    ? "ml-4"
                    : "ml-4 hidden"
                }
              >
                <>
                  <QuestionWithRecursion
                    question={option.nestedQuestion}
                    nested={true}
                    parent={option.value}
                  />
                </>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {!nested && (
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          {question.label}
        </div>
      )}

      {question.options.map((option, index) => {
        return (
          <div
            key={index}
            className={`${
              nested && index === question.options.length - 1 ? "mb-5" : ""
            }`}
          >
            {/* {(checkIfRadioChecked(userData, option.name))} */}
            <input
              index={index}
              id={`${option.value}`}
              type={question.type}
              value={option.value}
              checked={
                // selectedOption === option.name ||
                checkIfRadioChecked(userData, option.value)
              }
              onChange={handleParent}
            />
            {/* name={input_name} */}
            <label htmlFor={`${option.value}`}>{option.label}</label>
            {option.nestedQuestion && (
              <div
                className={
                  selectedOption === option.value ? "ml-4" : "ml-4 hidden"
                }
              >
                <QuestionWithRecursion
                  question={option.nestedQuestion}
                  nested={true}
                  parent={option.value}
                  parentData={questionData}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  function isParent(e) {
    const index = e.target.getAttribute("index");
    if (question.sections) {
      const sectionIndex = e.target.getAttribute("section");
      if (question.sections[sectionIndex].options[index].nestedQuestion) {
        question.isParent = true;
      } else {
        question.isParent = false;
      }
      return;
    }
    if (
      question.options[index].sections ||
      question.options[index].nestedQuestion
    ) {
      question.isParent = true;
    } else {
      question.isParent = false;
    }
  }

  function setQuestionParent() {
    if (parent) {
      question.parent = parent;
    } else {
      question.parent = question.label;
    }
  }

  function nestObject(str) {
    let arr = str.split(": ");

    let form = {};
    for (let i = arr.length - 1; i >= 0; i--) {
      if (i === arr.length - 2) {
        form = { [arr[i]]: arr[arr.length - 1] };
      } else {
        form = { [arr[i]]: form };
      }
    }

    // return form and the name of the key
    return { object_: form, key_: arr[0] };
  }

  function nestArray(arr) {
    let form = {};
    let selected = [];

    // pushing selected options to array
    for (let i = 0; i < arr.length; i++) {
      const splitted = arr[i].split(": ");
      const lastElement = getLastElement(splitted);
      if (lastElement === "nested") {
        continue;
      }
      selected.push(lastElement);
    }

    // picking the first element of the array (any element will do)
    const firstElement = arr[0].split(": ");
    firstElement.pop();
    // nesting the array
    for (let i = firstElement.length - 1; i >= 0; i--) {
      if (i === firstElement.length - 1) {
        form = { [firstElement[i]]: selected };
      } else {
        form = { [firstElement[i]]: form };
      }
    }

    // return the form and the name of the key
    return { object_: form, key_: firstElement[0], path_: firstElement };
  }

  function getLastElement(arr) {
    return arr[arr.length - 1];
  }

  function checkIfExist(arr) {
    let form = userData;
    for (let i = 0; i < arr.length - 1; i++) {
      if (i === arr.length - 2) {
        if (!form[arr[i]] || form[arr[i]]?.length === 0) {
          return false;
        } else {
          return true;
        }
      } else {
        form = form[arr[i]];
      }
    }
  }
};

export default QuestionWithRecursion;

/*
form = {
    "Timing of surgery": {
        " Elective non-cardiac surgery": " Not possible to defer non-cardiac surgery"
    }
}
*/

/*
[
    "Cardiovascular risk factor: Family history of cardiovascular disease: Myocardial infarction or sudden death <55 years with father or brother",
    "Cardiovascular risk factor: Family history of cardiovascular disease: Myocardial infarction or sudden death <65 years with mother or sister",
    "Cardiovascular risk factor: Family history of cardiovascular disease: Cerebrovascular accident <45 years with parents or brother/sister"
]
*/

/*

{
  Cardio Cardiovascular risk factor: {
    Family history of cardiovascular disase: [
      "Myocardial infarction or sudden death <55 years with father or brother",
      "Myocardial infarction or sudden death <65 years with mother or sister",
      "Cerebrovascular accident <45 years with parents or brother/sister"
    ]
  }
}
*/

function checkIfRadioChecked(userData, value) {
  if (Object.values(userData).includes(value)) {
    return true;
  }
  return false;
}

/*


    "value": {
      "medications_current_use": [
        "beta_bolckers",
        "amiodarone",
        "diuretics",
        "sodium_glucose_co_transporter_2_inhibitors",
        "oral_anticoagulants"
      ],
      "Oral anticoagulants": "non_vitamin_k_antagonist_oral_anticoagulants"
    },
 


*/
