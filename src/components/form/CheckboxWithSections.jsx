import { useState } from "react";
import { useStepperContext } from "../../contexts/StepperContext";
import CheckboxWithCheckboxOptions from "./CheckboxWithCheckboxOptions";

export default function CheckboxWithSections({
  id,
  input_name,
  groupName,
  label,
  value,
  sections,
}) {
  const { userData, setUserData } = useStepperContext();
  const [parentChecked, setParentChecked] = useState(false);
  const [nestedParentChecked, setnestedParentChecked] = useState(false);

  // nested
  const [nestedGroupName, setNestedGroupName] = useState("");

  let groupList = userData[groupName] || [];

  const handleChild = (e) => {
    // check if child is a nested question
    const isNestedQuestion = e.target.getAttribute("nested-question");
    const nested_type = e.target.getAttribute("nested-type");

    if (isNestedQuestion) {
      setnestedParentChecked(e.target.checked);
      setNestedGroupName(e.target.value);

      const tempNestedGroupName = e.target.value;

      if (!e.target.checked) {
        // remove from userData
        let tempUserData = userData;
        for (let item of tempUserData[groupName]) {
          if (typeof item === "object" && item[input_name]) {
            item[input_name] = item[input_name].filter(
              (item) => typeof item === "string"
            );
          }
        }

        setUserData({ ...tempUserData });
      } else {
        let nestedGroupList =
          userData[groupName].filter(
            (item) => typeof item === "object" && item[tempNestedGroupName]
          ) || [];

        // initialize empty array if not exist
        let initialized = false;

        // find the checked children list
        for (let item of userData[groupName]) {
          if (typeof item === "object" && item[input_name]) {
            for (let nestedItem of item[input_name]) {
              if (
                typeof nestedItem === "object" &&
                nestedItem[nestedGroupName]
              ) {
                initialized = true;
                break;
              }
            }
          }
        }

        if (!initialized) {
          let tempUserData = userData;
          for (let item of tempUserData[groupName]) {
            if (typeof item === "object" && item[input_name]) {
              if (nested_type === "checkbox") {
                item[input_name].push({ [tempNestedGroupName]: [] });
              }
              if (nested_type === "radio") {
                item[input_name].push({ [tempNestedGroupName]: "" });
              }
            }
          }
          setUserData({ ...tempUserData });
        }

        return;
      }
    }

    let checkedChildrenList;

    // find the checked children list
    for (let item of groupList) {
      if (typeof item === "object" && item[input_name]) {
        checkedChildrenList = item[input_name];
        break;
      }
    }

    const value = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      checkedChildrenList.push(value);
    } else {
      checkedChildrenList = checkedChildrenList.filter(
        (item) => item !== value
      );
    }

    // update the array
    for (let item of groupList) {
      if (typeof item === "object" && item[input_name]) {
        item[input_name] = checkedChildrenList;
        setUserData({ ...userData, [groupName]: groupList });
        return;
      }
    }
  };

  const handleParent = (e) => {
    setParentChecked(e.target.checked);

    if (!e.target.checked) {
      setnestedParentChecked(false);
      // remove from userData
      let test = userData[groupName].filter((item) =>
        typeof item === "object" ? input_name !== e.target.value : item
      );

      setUserData({ ...userData, [groupName]: test });
    }

    if (e.target.checked) {
      // setUserData({ ...userData, [groupName]: [{ [input_name]: [] }] });

      // initialize empty array if not exist
      let initialized = false;
      if (Array.isArray(userData[groupName])) {
        for (let item of userData[groupName]) {
          if (Array.isArray(item)) {
            initialized = true;
            break;
          }
        }
      }

      groupList.push({ [input_name]: [] });

      if (!initialized) {
        setUserData({ ...userData, [groupName]: groupList });
      }
    }
  };

  const handleGrandChild = (e) => {
    const { value, type } = e.target;
    if (type === "radio") {
      // update userData
      let tempUserData = userData;
      for (let item of tempUserData[groupName]) {
        if (typeof item === "object" && item[input_name]) {
          console.log("input_name:", item[input_name]);
          let new_input_name;
          console.log("nestedGroupName:", nestedGroupName);
          for (let nestedItem of item[input_name]) {
            console.log("nestedItem:", nestedItem);
            // get the key
            let key = Object.keys(nestedItem)[0];
            console.log("key:", key);
            console.log("nestedGroupName:", nestedGroupName);
            if (nestedGroupName === key) {
              nestedItem[key] = value;
            } else if(["vitamin_k_antagonist", "non_vitamin_k_antagonist_oral_anticoagulants"].includes(nestedGroupName) && nestedGroupName !== key) {
             // remove object that have different key
              item[input_name] = item[input_name].filter((item) => typeof item === "string" || Object.keys(item)[0] === nestedGroupName);
              console.log("item[input_name]:", item[input_name]);
            }
          }
        }
      }

      console.log("tempUserData:", tempUserData);

      setUserData({ ...tempUserData });
    }

    if (type === "checkbox") {
      let checkedChildrenList = [];

      // find the checked children list
      for (let item of userData[groupName]) {
        if (typeof item === "object" && item[input_name]) {
          for (let nestedItem of item[input_name]) {
            if (typeof nestedItem === "object" && nestedItem[nestedGroupName]) {
              checkedChildrenList = nestedItem[nestedGroupName];
              break;
            }
          }
        }
      }

      const value = e.target.value;
      const isChecked = e.target.checked;

      if (isChecked) {
        checkedChildrenList.push(value);
      } else {
        checkedChildrenList = checkedChildrenList.filter(
          (item) => item !== value
        );
      }

      console.log("userData", userData);

      setUserData({ ...userData });

      // update userData
      let tempUserData = userData;
      console.log("tempUserData", tempUserData);
      for (let item of tempUserData[groupName]) {
        if (typeof item === "object" && item[input_name]) {
          for (let nestedItem of item[input_name]) {
            if (typeof nestedItem === "object" && nestedItem[nestedGroupName]) {
              nestedItem[nestedGroupName] = checkedChildrenList;
            }
          }
        }
      }

      console.log("tempUserData", tempUserData);

      return;
    }
  };

  return (
    <>
      <input
        id={id}
        type="checkbox"
        name={input_name}
        value={value}
        onChange={(e) => handleParent(e)}
      />
      <label htmlFor={id}>{label}</label>
      <br />

      {parentChecked && (
        <div className="flex flex-col ml-5">
          {sections.map((section, sectionIndex) => {
            // handling sections
            // console.log("section", section);
            return (
              <div key={sectionIndex}>
                {/* Wrapper */}
                <div key={sectionIndex} className="ml-4">
                  <div className="ml-4">
                    {/* Section Title */}
                    <h1
                      // if index is not 0, add a margin top
                      className={`${
                        sectionIndex !== 0 ? "mt-2 font-bold" : "font-bold"
                      }`}
                    >
                      {section.title}
                    </h1>

                    {/* Section Options */}
                    {section.nestedQuestion.options.map((option, index) => {
                      // console.log("option", option);
                      return (
                        <div
                          key={index}
                          // if index is not 0, add a margin top
                          className={`${index !== 0 ? "mt-2" : ""}`}
                        >
                          {/* Check if it has a nested question */}
                          {option.nestedQuestion && (
                            <>
                              <input
                                id={option.value}
                                type={section.nestedQuestion.type}
                                name={section.title}
                                value={option.value}
                                nested-question="true"
                                nested-type={option.nestedQuestion.type}
                                onChange={(e) => handleChild(e)}
                              />
                              <label htmlFor={option.value}>
                                {option.label}
                              </label>
                              <br />
                            </>
                          )}

                          {/* Else */}
                          {!option.nestedQuestion && (
                            <>
                              <input
                                id={option.value}
                                type={section.nestedQuestion.type}
                                name={section.title}
                                value={option.value}
                                onChange={(e) => handleChild(e)}
                              />
                              <label htmlFor={option.value}>
                                {option.label}
                              </label>
                              <br />
                            </>
                          )}

                          {/* Nested Options */}
                          {nestedParentChecked && option.nestedQuestion && (
                            <div className="flex flex-col ml-5">
                              {option.nestedQuestion.options.map(
                                (nestedOptions, nestedIndex) => {
                                  // console.log("nestedOptions", nestedOptions);
                                  return (
                                    <div key={nestedIndex}>
                                      <input
                                        id={nestedOptions.value}
                                        type={option.nestedQuestion.type}
                                        name={option.label}
                                        value={nestedOptions.value}
                                        onChange={(e) => handleGrandChild(e)}
                                      />
                                      <label htmlFor={nestedOptions.value}>
                                        {nestedOptions.label}
                                      </label>
                                      <br />
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
            // handling nested question
            // if (option.nestedQuestion) {
            //   return (
            //     <div key={index}>
            //       <>
            //         <input
            //           id={option.value}
            //           type="checkbox"
            //           name={option.value}
            //           value={option.value}
            //           nested-question="true"
            //           onChange={(e) => handleChild(e)}
            //         />
            //         <label htmlFor={option.value}>{option.label}</label>
            //         <br />

            //         {nestedParentChecked && (
            //           <div className="flex flex-col ml-5">
            //             {option.nestedQuestion.options.map(
            //               (nestedOption, index) => {
            //                 return (
            //                   <div key={index}>
            //                     <input
            //                       id={nestedOption.value}
            //                       type="checkbox"
            //                       name={id}
            //                       value={nestedOption.value}
            //                       onChange={(e) => handleGrandChild(e)}
            //                     />
            //                     <label htmlFor={nestedOption.value}>
            //                       {nestedOption.label}
            //                     </label>
            //                   </div>
            //                 );
            //               }
            //             )}
            //           </div>
            //         )}
            //       </>
            //     </div>
            //   );
            // }
            // return (
            //   <div key={index}>
            //     <input
            //       id={option.value}
            //       type="checkbox"
            //       name={id}
            //       value={option.value}
            //       onChange={(e) => handleChild(e)}
            //     />
            //     <label htmlFor={option.value}>{option.label}</label>
            //   </div>
            // );
          })}
        </div>
      )}
    </>
  );
}
