import { useState } from "react";
import EmergentPopup from "../EmergentPopup";
import Question from "../form/Question";
import QuestionWithRecursion from "../form/Question (legacy)";

export default function PartQuestions({ parts }) {
  const [showPopup, setShowPopup] = useState(false);

  const popUpQuestionnaure = [
    {
      type: "radio",
      label: "Current use of Oral anticoagulants",
      name: "current_use_of_oral_anticoagulants",
      options: [
        {
          label: "Yes",
          value: "yes",
          name: "yes",
          nestedQuestion: {
            type: "radio",
            options: [
              {
                label: "Non-vitamin K antagonist oral anticoagulants:",
                value: "non_vitamin_k_antagonist_oral_anticoagulants",
                name: "non_vitamin_k_antagonist_oral_anticoagulants",
                nestedQuestion: {
                  type: "checkbox",
                  options: [
                    {
                      label: "Dabigatran",
                      value: "dabigatran",
                    },
                    {
                      label: "Rivaroxaban",
                      value: "rivaroxaban",
                    },
                    {
                      label: "Apixaban",
                      value: "apixaban",
                    },
                    {
                      label: "Edoxaban",
                      value: "edoxaban",
                    },
                  ],
                },
              },
              {
                label: "Vitamin K antagonist oral anticoagulants:",
                value: "vitamin_k_antagonist_oral_anticoagulants",
              },
            ],
          },
        },
        {
          label: "No",
          value: "no",
        },
      ],
    },
  ];

  const Part = ({ part }) => {
    const { title, questions } = part;
    return (
      <div className="flex flex-col ">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Questionnaire questions={questions} setShowPopup={setShowPopup} />
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      {parts.map((part, index) => (
        <div key={index} className={`${index === 0 ? "" : "mt-5"}`}>
          <Part key={index} part={part} setShowPopup={setShowPopup} />
          {index === 0 && showPopup && (
            <EmergentPopup
              questions={popUpQuestionnaure}
              setShowPopup={setShowPopup}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// function Questionnaire({ questions, parents, setParents }) {
//   return (
//     <>
//       {questions.map((question, index) => {
//         if (question.type === "checkbox") {
//           question.checkboxGroupName = question.name;
//           return (
//             <div key={index}>
//               <Question
//                 question={question}
//                 nested={true}
//                 parents={parents}
//                 setParents={setParents}
//               />
//             </div>
//           );
//         }

//         return (
//           <div key={index}>
//             <Question
//               question={question}
//               nested={false}
//               parents={parents}
//               setParents={setParents}
//             />
//           </div>
//         );
//       })}
//     </>
//   );
// }

function Questionnaire({ questions, setShowPopup }) {
  console.log(questions);
  if (questions[0].name === "medications_current_use") {
    return (
      <>
        {questions.map((question, index) => {
          return (
            <div key={index}>
              
              <QuestionWithRecursion question={question} nested={false} />
  
            </div>
          );
        })}
      </>
    );
  }
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
