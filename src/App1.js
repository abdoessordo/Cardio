import Question from "./components/form/Question";

export default function App() {
  const questions = [
    {
      label: "What is your favorite color?",
      options: [
        {
          value: "red",
          label: "Red",
          nestedQuestion: {
            label: "Why do you like red?",
            options: [
              {
                value: "bright",
                label: "I like how bright it is",
              },
              {
                value: "passionate",
                label: "I associate it with passion and love",
              },
              {
                value: "other",
                label: "Other",
                nestedQuestion: {
                  label: "Please specify:",
                  options: [
                    {
                      value: "other-option1",
                      label: "Option 1",
                    },
                    {
                      value: "other-option2",
                      label: "Option 2",
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          value: "green",
          label: "green",
        },
        {
          value: "green",
          label: "green",
        },
      ],
    },
    {
      label: "What is your favorite color?",
      options: [
        {
          value: "red",
          label: "Red",
          nestedQuestion: {
            label: "Why do you like red?",
            options: [
              {
                value: "bright",
                label: "I like how bright it is",
              },
              {
                value: "passionate",
                label: "I associate it with passion and love",
              },
              {
                value: "other",
                label: "Other",
                nestedQuestion: {
                  label: "Please specify:",
                  options: [
                    {
                      value: "other-option1",
                      label: "Option 1",
                    },
                    {
                      value: "other-option2",
                      label: "Option 2",
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          value: "green",
          label: "green",
        },
        {
          value: "green",
          label: "green",
        },
      ],
    },
  ];

  return <Questionnaire questions={questions} />;
}

function Questionnaire({ questions }) {
  return (
    <>
      {questions.map((question, index) => {
        return (
          <div key={index}>
            <Question question={question} nested={false} />
          </div>
        );
      })}
    </>
  );
}
