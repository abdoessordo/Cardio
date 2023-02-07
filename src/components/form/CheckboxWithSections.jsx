import { useState } from "react";
import { useStepperContext } from "../../contexts/StepperContext";

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
          let new_input_name;
          for (let nestedItem of item[input_name]) {
            // get the key
            let key = Object.keys(nestedItem)[0];
            if (nestedGroupName === key) {
              nestedItem[key] = value;
            } else if (
              [
                "vitamin_k_antagonist",
                "non_vitamin_k_antagonist_oral_anticoagulants",
              ].includes(nestedGroupName) &&
              nestedGroupName !== key
            ) {
              // remove object that have different key
              item[input_name] = item[input_name].filter(
                (item) =>
                  typeof item === "string" ||
                  Object.keys(item)[0] === nestedGroupName
              );
            }
          }
        }
      }

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
                                      {console.log(nestedOptions)}

                                      {nestedOptions.label ===
                                        "High risk of stent thrombosis " && (
                                        <div className="ml-5">
                                          <div>
                                            <input
                                              id="history_of_stent_thrombosis"
                                              type="checkbox"
                                              name="history_of_stent_thrombosis"
                                              value="history_of_stent_thrombosis"
                                            />
                                            <label htmlFor="history_of_stent_thrombosis">
                                              History of stent thrombosis under
                                              antiplatelet therapy
                                            </label>
                                            <br />
                                          </div>

                                          <div>
                                            <input
                                              id="reduced_left_ventricular_ejection_fraction"
                                              type="checkbox"
                                              name="reduced_left_ventricular_ejection_fraction"
                                              value="reduced_left_ventricular_ejection_fraction"
                                            />
                                            <label htmlFor="reduced_left_ventricular_ejection_fraction">
                                              Reduced left ventricular ejection
                                              fraction (40%)
                                            </label>
                                            <br />
                                          </div>

                                          <div>
                                            <input
                                              id="poorly_controlled_diabetes"
                                              type="checkbox"
                                              name="poorly_controlled_diabetes"
                                              value="poorly_controlled_diabetes"
                                            />
                                            <label htmlFor="poorly_controlled_diabetes">
                                              Poorly controlled diabetes
                                            </label>
                                            <br />
                                          </div>

                                          <div>
                                            <input
                                              id="severely_impaired_renal_function"
                                              type="checkbox"
                                              name="severely_impaired_renal_function"
                                              value="severely_impaired_renal_function"
                                            />
                                            <label htmlFor="severely_impaired_renal_function">
                                              Severely impaired renal
                                              function/haemodialysis
                                            </label>
                                            <br />
                                          </div>

                                          <div>
                                            <input
                                              id="recent_complex_pci"
                                              type="checkbox"
                                              name="recent_complex_pci"
                                              value="recent_complex_pci"
                                            />
                                            <label htmlFor="recent_complex_pci">
                                              Recent complex PCI (i.e. severely
                                              calcified lesion, left main PCI,
                                              chronic total occlusion,
                                              bifurcational/crush technique,
                                              bypass graft PCI)
                                            </label>
                                            <br />
                                          </div>

                                          <div>
                                            <input
                                              id="stent_malapposition"
                                              type="checkbox"
                                              name="stent_malapposition"
                                              value="stent_malapposition"
                                            />
                                            <label htmlFor="stent_malapposition">
                                              Stent malapposition/residual
                                              dissection.
                                            </label>
                                            <br />
                                          </div>
                                        </div>
                                      )}

                                      {nestedOptions.label ===
                                        "Very high thromboembolic risk" && (
                                        <div className="ml-5">
                                          <div>
                                            <input
                                              id="recent_stroke_3_months"
                                              type="checkbox"
                                              name="recent_stroke_3_months"
                                              value="recent_stroke_3_months"
                                            />
                                            <label htmlFor="recent_stroke_3_months">
                                              {"Recent stroke <3 months"}
                                            </label>
                                            <br />
                                          </div>

                                          <div>
                                            <input
                                              id="high_risk_of_venous_thromboembolism_recurrences"
                                              type="checkbox"
                                              name="high_risk_of_venous_thromboembolism_recurrences"
                                              value="high_risk_of_venous_thromboembolism_recurrences"
                                            />
                                            <label htmlFor="high_risk_of_venous_thromboembolism_recurrences">
                                              High risk of venous
                                              thromboembolism recurrences (e.g.
                                              antithrombin 3 deficiency or
                                              protein C and/or S deficiency)
                                            </label>
                                            <br />
                                          </div>

                                          <div>
                                            <input
                                              id="left_ventricular_apex_thrombus"
                                              type="checkbox"
                                              name="left_ventricular_apex_thrombus"
                                              value="left_ventricular_apex_thrombus"
                                            />
                                            <label htmlFor="left_ventricular_apex_thrombus">
                                              Left ventricular apex thrombus
                                            </label>
                                            <br />
                                          </div>

                                          <div>
                                            <input
                                              id="artial_fibrillation_with_a_very_high_stroke_risk"
                                              type="checkbox"
                                              name="artial_fibrillation_with_a_very_high_stroke_risk"
                                              value="artial_fibrillation_with_a_very_high_stroke_risk"
                                            />
                                            <label htmlFor="artial_fibrillation_with_a_very_high_stroke_risk">
                                              Artial fibrillation with a very
                                              high stroke risk
                                            </label>
                                            <br />
                                          </div>
                                        </div>
                                      )}
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
