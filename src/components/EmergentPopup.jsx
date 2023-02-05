import { useState } from "react";
import { useStepperContext } from "../contexts/StepperContext";
import Question from "./form/Question";
import RadioGroup from "./form/RadioGroup";

export default function EmergentPopup({ questions, setShowPopup }) {
  const { userData, setUserData } = useStepperContext();
  
  const handleClick = () => {
    if (userData["current_use_of_oral_anticoagulants"]) {
      setUserData({
        ...userData,
        current_use_of_oral_anticoagulants: null,
      });      
    }
    setShowPopup(false)
  }
  return (
    <div className="popup__background">
      <div className="popup">
        <div className="popup__header">
          <h2>URGENT</h2>
          <button onClick={handleClick}>X</button>
        </div>
        <div className="popup__body">
          {/* <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
            Current use of Oral anticoagulants
            <br />
            <div>
              <input
                id="yes"
                type="radio"
                name="oral_anticoagulants"
                value={"yes"}
                onChange={(e) => handle_oral_anticoagulants(e)}
              />
              <label htmlFor={"yes"}>{"yes"}</label>
            </div>
            {oral_anticoagulants === "yes" && (}
            <div>
              <input
                id="no"
                type="radio"
                name="oral_anticoagulants"
                value={"no"}
                onChange={(e) => handle_oral_anticoagulants(e)}
              />
              <label htmlFor={"no"}>{"no"}</label>
            </div>
          </div> */}
          <Questionnaire questions={questions} setShowPopup={setShowPopup} />
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
