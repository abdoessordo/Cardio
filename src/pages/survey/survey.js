import { useState } from "react";
import Stepper from "../../components/Stepper";
import StepperControl from "../../components/StepperControl";
import { UseContextProvider } from "../../contexts/StepperContext";

import PartQuestions from "../../components/steps/Part";
import { form } from "../../utils/form";
import Result from "../../components/steps/Result";

const Survey = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = form.steps.map((step) => step.title);

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };
  return (
    <div className="mx-auto rounded-2xl bg-white mb-5 pb-2 shadow-xl md:w-2/3">
      {/* Stepper */}
      <div className="horizontal container mt-5">
        <Stepper steps={steps} currentStep={currentStep} />

        <div className="my-10 p-10 ">
          <UseContextProvider>
            {[2, 4].includes(currentStep) ? (
              currentStep === steps.length ? (
                <Result end={true} />
              ) : (
                <Result end={false} />
              )
            ) : (
              <PartQuestions parts={form.steps[currentStep - 1].parts} />
            )}
          </UseContextProvider>
        </div>
      </div>

      {/* navigation button */}
      <UseContextProvider>
        {currentStep !== steps.length && (
          <StepperControl
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
          />
        )}
      </UseContextProvider>
    </div>
  );
};

export default Survey;
