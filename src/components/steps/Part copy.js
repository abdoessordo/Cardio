import CheckboxGroup from "../form/CheckboxGroup";
import Input from "../form/Input";
import Radio from "../form/Radio";
import RadioWithOptions from "../form/RadioWithOptions";
import Select from "../form/Select";

const QuestionLabel = ({ label }) => {
  return (
    <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
      {label}
    </div>
  );
};

export const Question = ({ question }) => {
  let questionComponent = null;
  let label = <QuestionLabel label={question.label} />;

  // eslint-disable-next-line default-case
  switch (question.type) {
    case "input":
      questionComponent = (
        <Input
          name={question.name}
          placeholder={question.placeholder}
          type={question.input_type}
        />
      );
      break;
    case "select":
      questionComponent = (
        <Select
          name={question.name}
          placeholder={question.label}
          options={question.options}
        />
      );
      break;
    case "radio":
      questionComponent = (
        <>
          {question.options.map((option, index) => {
            if (option.options)
              return (
                <RadioWithOptions
                  key={index}
                  id={option.value}
                  input_name={question.name}
                  label={option.title}
                  value={option.value}
                  options={option.options}
                />
              );
            return (
              <div key={index}>
                <Radio
                  key={index}
                  id={option.value}
                  input_name={question.name}
                  label={option.title}
                  value={option.value}
                />
                <br />
              </div>
            );
          })}
        </>
      );
      break;
    case "checkbox":
      console.log();
      questionComponent = (
        <CheckboxGroup name={question.name} options={question.options} />
      );

      break;

    // default:
    //   return <h1>Hello</h1>;
  }

  let output = (
    <div className="mx-2 w-full flex-1">
      {label}
      {questionComponent}
    </div>
  );
  return output;
};

export default function PartQuestions({ parts }) {
  const Part = ({ part }) => {
    const { title, questions } = part;
    console.log(questions);
    return (
      <div className="flex flex-col ">
        <h1 className="text-2xl font-bold">{title}</h1>
        {questions.map((question, index) => (
          <Question key={index} question={question} />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      {parts.map((part, index) => (
        <div key={index}>
          <Part key={index} part={part} />
        </div>
      ))}
    </div>
  );
}
