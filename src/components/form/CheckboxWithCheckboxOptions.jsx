import { useState } from "react";
import { useStepperContext } from "../../contexts/StepperContext";

export default function CheckboxWithCheckboxOptions({
  id,
  input_name,
  label,
  value,
  options,
  groupName,
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
              item[input_name].push({ [tempNestedGroupName]: [] });
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
        // ("item", item);
        item[input_name] = checkedChildrenList;
        setUserData({ ...userData, [groupName]: groupList });
        return;
      }
    }
  };

  const handleParent = (e) => {
    setParentChecked(e.target.checked);

    if (!e.target.checked) {
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
    // let checkedChildrenList =
    //   userData[groupName]
    //     .filter((item) => typeof item === "object" && item[input_name])
    //     .filter((item) => typeof item === "object" && item[nestedGroupName]) ||
    //   [];

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


    setUserData({ ...userData });

    // update userData
    let tempUserData = userData;
    for (let item of tempUserData[groupName]) {
      if (typeof item === "object" && item[input_name]) {
        for (let nestedItem of item[input_name]) {
          if (typeof nestedItem === "object" && nestedItem[nestedGroupName]) {
            nestedItem[nestedGroupName] = checkedChildrenList;
          }
        }
      }
    }


    return;

    // ("checkedChildrenList", checkedChildrenList)

    // update the array
    // for (let item of groupList) {
    //   if (typeof item === "object" && item[input_name]) {
    //     ("item", item);
    //     item[input_name] = checkedChildrenList;
    //     setUserData({ ...userData, [groupName]: groupList });
    //     return;
    //   }
    // }
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
          {options.map((option, index) => {
            // handling sections
            if (option.sections) {
              return (
                <div key={index}>
                  {option.sections?.map((section, sectionIndex) => {
                    return (
                      // Wrapper
                      <div key={sectionIndex} className="ml-4">
                        <div className="ml-4">
                          {/* Section Title */}
                          <h1 className="font-bold">{section.title}</h1>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            }
            // handling nested question
            if (option.nestedQuestion) {
              return (
                <div key={index}>
                  <>
                    <input
                      id={option.value}
                      type="checkbox"
                      name={option.value}
                      value={option.value}
                      nested-question="true"
                      onChange={(e) => handleChild(e)}
                    />
                    <label htmlFor={option.value}>{option.label}</label>
                    <br />

                    {nestedParentChecked && (
                      <div className="flex flex-col ml-5">
                        {option.nestedQuestion.options.map(
                          (nestedOption, index) => {
                            return (
                              <div key={index}>
                                <input
                                  id={nestedOption.value}
                                  type="checkbox"
                                  name={id}
                                  value={nestedOption.value}
                                  onChange={(e) => handleGrandChild(e)}
                                />
                                <label htmlFor={nestedOption.value}>
                                  {nestedOption.label}
                                </label>
                              </div>
                            );
                          }
                        )}
                      </div>
                    )}
                  </>
                </div>
              );
            }
            return (
              <div key={index}>
                <input
                  id={option.value}
                  type="checkbox"
                  name={id}
                  value={option.value}
                  onChange={(e) => handleChild(e)}
                />
                <label htmlFor={option.value}>{option.label}</label>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
