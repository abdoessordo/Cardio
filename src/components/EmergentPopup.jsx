import { useState, useEffect } from "react";
import { useStepperContext } from "../contexts/StepperContext";
import Question from "./form/Question";
import RadioGroup from "./form/RadioGroup";
import _ from "lodash";
import ToDo from "./ToDo";

export default function EmergentPopup({ questions, setShowPopup }) {
  const { userData, setUserData } = useStepperContext();
  const [showTodo, setShowTodo] = useState(false);
  const [preAssessmentTodoList, setPreAssessmentTodoList] = useState([]);

  useEffect(() => {
    preAssessment();
  }, [userData]);

  const handleClick = () => {
    if (userData["current_use_of_oral_anticoagulants"]) {
      setUserData({
        ...userData,
        current_use_of_oral_anticoagulants: null,
      });
    }
    setShowPopup(false);
  };

  function preAssessment() {
    const { current_use_of_oral_anticoagulants } = userData;
    if (_.isEqual(current_use_of_oral_anticoagulants, { yes: "dabigatran" })) {
      setPreAssessmentTodoList([
        {
          label:
            "Check for blood coagulation tests: full coagulation panel (prothrombin time, activated partial thromboplastin time, anti-factor Xa, diluted thrombin time, etc.)",
          span: "",
          class: "",
        },
        {
          label: "Measurement of Dabigatran plasma levels, if available",
          span: "",
          class: "",
        },
        {
          label:
            "Use Idarucizumab as a specific reversal agent (Class IIa, Level B)",
          span: "",
          class: "classIIa",
        },
        {
          label: "Targeted haemostatic measures",
          span: "",
          class: "",
        },
      ]);
      return;
    }

    if (
      _.isEqual(current_use_of_oral_anticoagulants, { yes: "rivaroxaban" }) ||
      _.isEqual(current_use_of_oral_anticoagulants, { yes: "apixaban" }) ||
      _.isEqual(current_use_of_oral_anticoagulants, { yes: "edoxaban" })
    ) {
      setPreAssessmentTodoList([
        {
          label:
            "Check for blood coagulation tests: full coagulation panel (prothrombin time, activated partial thromboplastin time, anti-factor Xa, diluted thrombin time, etc.) ",
          span: "",
          class: "",
        },
        {
          label: "Measurement of plasma levels, if available",
          span: "",
          class: "",
        },
        {
          label:
            "If specific reversal agent is unavailable, consider non-specific haemostatic agents (prothrombin complex concentrate [PCC] or activated PCC [aPCCs]).",
          span: "",
          class: "",
        },
        {
          label: "Targeted haemostatic measures",
          span: "",
          class: "",
        },
      ]);
      return;
    }

    if (_.isEqual(current_use_of_oral_anticoagulants, { yes: "vitamin_k_antagonist_oral_anticoagulants" })) {
      setPreAssessmentTodoList([
            {
              label: "Check for blood coagulation tests: full coagulation panel (prothrombin time, activated partial thromboplastin time, anti-factor Xa, diluted thrombin time, etc.)",
              span: "",
              class: "",
            },
            {
              label: "Urgent measurement of Index National Ratio (INR)",
              span: "",
              class: "",
            },
            {
              label: "Immediate interruption of non-vitamin K oral anticoagulant (Class I, Level C)",
              span: "",
              class: "classI",
            },
            {
              label: "Targeted haemostatic measures",
              span: "",
              class: "",
            },

      ])
    }
    
    else {
      setPreAssessmentTodoList([]);
    }
  }

  return (
    <div className="popup__background">
      <div className="popup">
        <div className="popup__header">
          <h2>URGENT</h2>
          <button onClick={handleClick}>X</button>
        </div>
        <div className="popup__body">
          <Questionnaire questions={questions} setShowPopup={setShowPopup} />
        </div>

        {/* Add a button To get Todo */}
        {/* <div className="todo-button">
          <button onClick={handleTodo}>Generate Todo</button>
        </div> */}

        <div id="todo-urgent">
          <ul>
            {preAssessmentTodoList?.map((item, index) => (
              <li key={index}>
                <div className={item.class}>
                  <span>
                    {item.label} <strong>{item.span}</strong>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Questionnaire({ questions, setShowPopup }) {
  return (
    <>
      {questions.map((question, index) => {
        return (
          <div key={index}>
            <Question question={question} setShowPopup={setShowPopup} />
          </div>
        );
      })}
    </>
  );
}
