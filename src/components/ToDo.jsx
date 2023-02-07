import { useEffect, useState } from "react";

import _ from "lodash";
import { useStepperContext } from "../contexts/StepperContext";

export default function ToDo({ end }) {
  const { userData } = useStepperContext();
  const [preAssessmentTodoList, setPreAssessmentTodoList] = useState([]);

  let {
    examination,
    timing_of_surgery,
    type_of_surgery_or_intervention,
    bleeding_risk,
    cardiovascular_risk_factor,
    cv_atcd,
    non_cv_atcd,
    medications_current_use,
  } = userData;

  useEffect(() => {
    preAssessment();
    console.log("preAssessmentTodoList", preAssessmentTodoList);
  }, []);

  function preAssessment() {
    let ARR = [];
    let ARR2 = [];
    // initialize empty array if type undefined
    if (typeof cardiovascular_risk_factor === "undefined") {
      cardiovascular_risk_factor = [];
    }
    if (typeof examination === "undefined") {
      examination = [];
    }
    if (typeof timing_of_surgery === "undefined") {
      timing_of_surgery = [];
    }
    if (typeof type_of_surgery_or_intervention === "undefined") {
      type_of_surgery_or_intervention = [];
    }
    if (typeof bleeding_risk === "undefined") {
      bleeding_risk = [];
    }
    if (typeof cv_atcd === "undefined") {
      cv_atcd = [];
    }
    if (typeof non_cv_atcd === "undefined") {
      non_cv_atcd = [];
    }
    if (typeof medications_current_use === "undefined") {
      medications_current_use = [];
    }
    // union of cv_atcd and non_cv_atcd
    let antecedent = [...cv_atcd, ...non_cv_atcd];

    if (
      [
        "High surgical risk (>5%)",
        "Intermediate surgical risk (1-5%)",
      ].includes(type_of_surgery_or_intervention) &&
      antecedent.length > 0
    ) {
      ARR.push(
        {
          label: "Pre-operative 12-lead ECG",
          span: "(Class I)",
          class: "classI",
        },
        {
          label:
            "Measure high sensitivity cardiac troponin before surgery, then 24H and 48H afterwards (Class I)",
          span: "(Class I)",
          class: "classI",
        },
        {
          label: "Measure BNP or NT-pro-BNP",
          span: "(Class IIa)",
          class: "classIIa",
        }
      );
    }

    if (
      type_of_surgery_or_intervention === "High surgical risk (>5%)" &&
      cardiovascular_risk_factor.length === 0 &&
      antecedent.length === 0
    ) {
      ARR.push(
        {
          label:
            "ECG and Measure high sensitivity cardiac troponin before surgery, then 24H and 48H afterwards",
          span: "(Class I)",
          class: "classI",
        },
        {
          label: "Measure BNP or NT-pro-BNP",
          span: "(Class IIa)",
          class: "classIIa",
        }
      );
    }

    let list = [
      "Poor functional capacity (METs<4 –if the patient cannot climb two flights of stairs-)",
      "High NT-pro-BNP/BNP",
      "Newly detected murmurs",
    ];
    if (
      compareArrays(examination, list) &&
      type_of_surgery_or_intervention === "High surgical risk (>5%)"
    ) {
      ARR.push({
        label: "Trans-thoracic echography (ETT)",
        span: "(Class I)",
        class: "classI",
      });
    }

    list = [
      "Poor functional capacity (METs<4 –if the patient cannot climb two flights of stairs-)",
      "High NT-pro-BNP/BNP",
      "Abnormal ECG",
      "High clinical risk factor (RCRI >= 1)",
    ];
    if (
      type_of_surgery_or_intervention === "Intermediate surgical risk (1-5%)" &&
      compareArrays(examination, list)
    ) {
      ARR.push({
        label: "Trans-thoracic echography (ETT)",
        span: "(Class IIb)",
        class: "classIIb",
      });
    }

    list = [
      "Poor functional capacity (METs<4 –if the patient cannot climb two flights of stairs-)",
      "Asymptomatic",
    ];
    if (
      type_of_surgery_or_intervention === "High surgical risk (>5%)" &&
      compareArrays(examination, list)
    ) {
      ARR.push({
        label: "Stress imaging",
        span: "(Class IIa)",
        class: "classIIa",
      });
    }

    if (
      type_of_surgery_or_intervention === "High surgical risk (>5%)" &&
      examination ===
        "Poor functional capacity (METs<4 –if the patient cannot climb two flights of stairs-)" &&
      transformExamination(examination).includes(
        "High clinical risk factor (RCRI >= 1)"
      )
    ) {
      ARR.push({
        label: "Stress imaging",
        span: "(Class I)",
        class: "classI",
      });
    }

    if (["Low bleeding risk", "High bleeding risk"].includes(bleeding_risk)) {
      ARR.push({
        label: "Measure haemoglobin pre-operatively",
        span: "(Class I)",
        class: "classI",
      });
    }

    // Medications
    if (medications_current_use?.includes("Beta-blockers")) {
      ARR2.push({
        label: "Continue using beta-blockers",
        span: "(Class I)",
        class: "classI",
      });
    }

    if (medications_current_use?.includes("Statins")) {
      ARR2.push({
        label: "Continue using Statins",
        span: "(Class I)",
        class: "classI",
      });
    }

    let stable_heart_failure = false;
    let unstable_heart_failure = false;
    for (let atcd of cv_atcd) {
      if (_.isEqual(atcd, { "Heart failure": "Stable heart failure" })) {
        stable_heart_failure = true;
        break;
      }
      if (_.isEqual(atcd, { "Heart failure": "Unstable heart failure" })) {
        unstable_heart_failure = true;
        break;
      }
    }
    let isRenin;
    for (let med of medications_current_use) {
      if (
        typeof med === "object" &&
        med["renin_angiotensin_aldosterone_system_inhibitors"]
      ) {
        isRenin =
          med["renin_angiotensin_aldosterone_system_inhibitors"].length > 0;
        break;
      }
    }
    if (stable_heart_failure && isRenin) {
      ARR2.push({
        label: "Continue using Renin–angiotensin–aldosterone system inhibitors",
        span: "(Class IIb)",
        class: "classIIb",
      });
    }

    if (unstable_heart_failure && isRenin) {
      ARR2.push({
        label:
          "Interrupt Renin–angiotensin–aldosterone system inhibitors on the day of the non-cardiac surgery",
        span: "(Class IIa)",
        class: "classIIa",
      });
    }

    if (
      medications_current_use?.includes("Calcium channel blockers") &&
      cv_atcd.includes("Vasospastic angina")
    ) {
      ARR2.push({
        label:
          "Interrupt Calcium channel blockers on the day of the non-cardiac surgery, especially for those with vasospastic angina to avoid post-operative hypotension",
        span: "",
        class: "",
      });
    }

    let to_treat_hypertension = false;
    for (let med of medications_current_use) {
      if (
        typeof med === "object" &&
        med["diuretics"]?.includes("to_treat_hypertension")
      ) {
        to_treat_hypertension = true;
        break;
      }
    }
    if (to_treat_hypertension) {
      ARR2.push({
        label: "Interrupt Diuretics on the day of the non-cardiac surgery",
        span: "(Class IIa)",
        class: "classIIa",
      });
    }

    if (
      medications_current_use.includes(
        "Sodium–glucose co-transporter-2 inhibitors"
      ) &&
      [
        "Intermediate surgical risk (1-5%)",
        "High surgical risk (>5%)",
      ].includes(type_of_surgery_or_intervention)
    ) {
      ARR2.push({
        label:
          "Interrupt Sodium–glucose co-transporter-2 inhibitors for at least 3 days before the non-cardiac surgery",
        span: "(Class IIa)",
        class: "classIIa",
      });
    }

    if (medications_current_use?.includes("Amiodarone")) {
      ARR2.push({
        label: "Continue Amiodarone",
        span: "",
        class: "",
      });
    }

    if (medications_current_use?.includes("Ivabradine")) {
      ARR2.push({
        label: "Continue Ivabradine",
        span: "",
        class: "",
      });
    }

    let vitamin_k_antagonist = false;
    for (let med of medications_current_use) {
      if (typeof med === "object" && med.oral_anticoagulants?.length > 0) {
        for (let oral_meds of med.oral_anticoagulants) {
          if (
            typeof oral_meds === "object" &&
            oral_meds.vitamin_k_antagonist?.length > 0
          ) {
            vitamin_k_antagonist = true;
            break;
          }
        }
      }
    }

    let elective_non_cardiac_surgery = false;
    if (
      _.isEqual(timing_of_surgery, {
        "Elective non-cardiac surgery": "Possible to defer non-cardiac surgery",
      }) ||
      _.isEqual(timing_of_surgery, {
        "Elective non-cardiac surgery":
          "Noy possible to defer non-cardiac surgery",
      })
    ) {
      elective_non_cardiac_surgery = true;
    }

    if (
      vitamin_k_antagonist &&
      elective_non_cardiac_surgery &&
      ["Low bleeding risk", "Minor bleeding risk"].includes(bleeding_risk)
    ) {
      ARR2.push(
        {
          label: "Continue with INR in lower level or short interruption",
          span: "(Class I)",
          class: "classI",
        },
        {
          label: "Bridging is not recommended",
          span: "(Class III)",
          class: "classIII",
        }
      );
    }

    let dabigatran_apixaban = false;

    for (let med of medications_current_use) {
      if (typeof med === "object" && med.oral_anticoagulants?.length > 0) {
        for (let oral_meds of med.oral_anticoagulants) {
          console.log(oral_meds);
          if (
            typeof oral_meds === "object" &&
            ["Apixaban", "Dabigatran"].includes(
              oral_meds.non_vitamin_k_antagonist_oral_anticoagulants
            )
          ) {
            dabigatran_apixaban = true;
            break;
          }
        }
      }
    }

    if (
      dabigatran_apixaban &&
      elective_non_cardiac_surgery &&
      ["Low bleeding risk", "Minor bleeding risk"].includes(bleeding_risk)
    ) {
      ARR2.push(
        {
          label:
            "May skip the evening dose and restart Non-vitamin K antagonist oral anticoagulants >6h after surgery",
          span: "(Class I)",
          class: "classI",
        },
        {
          label: "Bridging is not recommended",
          span: "(Class III)",
          class: "classIII",
        },
        {
          label:
            "In patient or circumstances favoring Non-vitamin K antagonist oral anticoagulants accumulation (renal dysfunction, older age, or concomitant medication) the non-vitamin K antagonist oral anticoagulant should be paused 12-24h earlier",
          span: "",
          class: "",
        }
      );
    }

    let rivaroxaban_edoxaban = false;

    for (let med of medications_current_use) {
      if (typeof med === "object" && med.oral_anticoagulants?.length > 0) {
        for (let oral_meds of med.oral_anticoagulants) {
          console.log(oral_meds);
          if (
            typeof oral_meds === "object" &&
            ["Rivaroxaban", "Edoxaban"].includes(
              oral_meds.non_vitamin_k_antagonist_oral_anticoagulants
            )
          ) {
            rivaroxaban_edoxaban = true;
            break;
          }
        }
      }
    }

    if (
      rivaroxaban_edoxaban &&
      elective_non_cardiac_surgery &&
      bleeding_risk === "Minor bleeding risk"
    ) {
      ARR2.push(
        {
          label:
            "Continue and restart Non-vitamin K antagonsit oral anticoagulant>6h after surgery",
          span: "(Class I)",
          class: "classIII",
        },
        {
          label: "Bridging is not recommended",
          span: "(Class III)",
          class: "classIII",
        },
        {
          label:
            "In patients taking the dose in the evening, the evening dose may be skipped",
          span: "",
          class: "",
        }
      );
    }

    let non_vitamin_k_antagonist_oral_anticoagulants = false;

    for (let med of medications_current_use) {
      if (typeof med === "object" && med.oral_anticoagulants?.length > 0) {
        for (let oral_meds of med.oral_anticoagulants) {
          console.log(oral_meds);
          if (
            typeof oral_meds === "object" &&
            ["Rivaroxaban", "Edoxaban", "Apixaban", "Dabigatran"].includes(
              oral_meds.non_vitamin_k_antagonist_oral_anticoagulants
            )
          ) {
            non_vitamin_k_antagonist_oral_anticoagulants = true;
            break;
          }
        }
      }
    }

    if (
      non_vitamin_k_antagonist_oral_anticoagulants &&
      elective_non_cardiac_surgery &&
      bleeding_risk === "Low bleeding risk"
    ) {
      ARR2.push(
        {
          label:
            "No Non-vitamin K oral anticoagulants in the day before non cardiac surgery and consider restarting NOAC after surgery in the evening",
          span: "(Class I)",
          class: "classI",
        },
        {
          label: "Bridging is not recommended",
          span: "(Class III)",
          class: "classIII",
        }
      );
    }

    let not_high_thrombotic_risk = true;

    for (let med of medications_current_use) {
      if (typeof med === "object" && med.oral_anticoagulants?.length > 0) {
        for (let oral_meds of med.oral_anticoagulants) {
          if (
            typeof oral_meds === "object" &&
            oral_meds.high_thrombotic_risk?.length > 0
          ) {
            not_high_thrombotic_risk = false;
            break;
          }
        }
      }
    }

    console.log("vitamin_k_antagonist", vitamin_k_antagonist);
    if (
      elective_non_cardiac_surgery &&
      bleeding_risk === "High bleeding risk" &&
      not_high_thrombotic_risk &&
      vitamin_k_antagonist
    ) {
      ARR2.push(
        {
          label: "Interrupt 3 to 5 days",
          span: "(Class I)",
          class: "classI",
        },
        {
          label: "Bridging is not recommended",
          span: "(Class III)",
          class: "classIII",
        }
      );
    }

    if (
      elective_non_cardiac_surgery &&
      bleeding_risk === "High bleeding risk" &&
      not_high_thrombotic_risk &&
      non_vitamin_k_antagonist_oral_anticoagulants
    ) {
      ARR2.push(
        {
          label:
            "Interrupt non vitamin K oral anticoagulant 2 days before surgery",
          span: "(Class I)",
          class: "classI",
        },
        {
          label:
            "Consider prophylactic dose heparin postoperatively restart Non-vitamin K oral anticoagulants >48 - 72h after surgery",
          span: "(Class I)",
          class: "classI",
        },
        {
          label: "Bridging is not recommended",
          span: "(Class III)",
          class: "classIII",
        }
      );
    }

    let warfarin_acénocoumarol = false;
    for (let med of medications_current_use) {
      if (typeof med === "object" && med.oral_anticoagulants?.length > 0) {
        for (let oral_meds of med.oral_anticoagulants) {
          if (
            typeof oral_meds === "object" &&
            ["Warfarin", "Acénocoumarol"].includes(
              oral_meds.vitamin_k_antagonist
            )
          ) {
            warfarin_acénocoumarol = true;
            break;
          }
        }
      }
    }

    let mechanical_prosthetic_heart_valve = false;
    for (let med of medications_current_use) {
      if (typeof med === "object" && med.oral_anticoagulants?.length > 0) {
        for (let oral_meds of med.oral_anticoagulants) {
          console.log(oral_meds);
          if (
            typeof oral_meds === "object" &&
            oral_meds.high_thrombotic_risk?.includes(
              "mechanical_prosthetic_heart_valve"
            )
          ) {
            mechanical_prosthetic_heart_valve = true;
            break;
          }
        }
      }
    }
    if (
      warfarin_acénocoumarol &&
      elective_non_cardiac_surgery &&
      bleeding_risk === "High bleeding risk" &&
      mechanical_prosthetic_heart_valve
    ) {
      ARR2.push(
        {
          label:
            "Interrupt vitamin K antagonist 3 to 5 days before surgery and restart Vitamin K antagonists 12 to 24 h after non-cardiac surgery if bleeding risk is well controlled and intestinal reabsorption have being re-established",
          span: "(Class I)",
          class: "classI",
        },
        {
          label:
            "The restarting dose should be the maintenance dose plus a boosting dose of 50% for 2 days",
          span: "(Class I)",
          class: "classI",
        },
        {
          label:
            "Bridging with unfractionated heparin or low molecular weight heparin may be considered (Class IIa):	Start low molecular weight heparin 3 days before surgery, Interrupt low molecular weight heparin >12 h before surgery, Restart low molecular weight heparin 1 or 2 days after procedure and Interrupt unfractionated heparin or low molecular weight heparinwhen INR>2",
          span: "",
          class: "classIIa",
        }
      );
    }

    let possible_to_defer_surgery = _.isEqual(timing_of_surgery, {
      "Elective non-cardiac surgery": "Possible to defer non-cardiac surgery",
    });

    let high_thromboembolic_risk = false;
    for (let med of medications_current_use) {
      if (typeof med === "object" && med.oral_anticoagulants?.length > 0) {
        for (let oral_meds of med.oral_anticoagulants) {
          if (
            typeof oral_meds === "object" &&
            oral_meds.high_thromboembolic_risk?.length > 0
          ) {
            high_thromboembolic_risk = true;
            break;
          }
        }
      }
    }

    if (
      possible_to_defer_surgery &&
      bleeding_risk === "High bleeding risk" &&
      high_thromboembolic_risk
    ) {
      ARR2.push({
        label:
          "Defer non-cardiac surgery (>3 months after stroke or venousthromboembolism)",
        span: "",
        class: "",
      });
    }

    let not_possible_to_defer_surgery = _.isEqual(timing_of_surgery, {
      "Elective non-cardiac surgery":
        "Not possible to defer non-cardiac surgery",
    });

    if (
      not_possible_to_defer_surgery &&
      bleeding_risk === "High bleeding risk" &&
      high_thromboembolic_risk &&
      vitamin_k_antagonist
    ) {
      ARR2.push(
        {
          label: "Interrupt Vitamin K antagonists 2 to 5 days before surgery",
          span: "(Class I)",
          class: "classI",
        },
        {
          label:
            "Restart vitamin K antagonists 12 to 24 h after surgery if bleeding risk is well controlled and intestinal reabsorption have been re-established",
          span: "(Class I)",
          class: "classI",
        },
        {
          label:
            "The restarting dose should be the maintenance dose plus a boosting   dose of 50% FOR 2 DAYS",
          span: "(Class I)",
          class: "classI",
        },
        {
          label:
            "Bridging with unfractionated heparin or low molecular weight  heparin should be considered (Class IIb) : Start low molecular weight heparin 3 days before surgery, Interrupt low molecular weight heparin >12h before surgery, Restart low molecular weight heparin 1 or 2 days after surgery and Stop low molecular weight heparin or unfractionated heparin when  INR>2",
          span: "",
          class: "classIIb",
        }
      );
    }

    // emergent
    if (
      ["Emergent non-cardiac surgery", "Urgent non-cardiac surgery"].includes(
        timing_of_surgery
      )
    ) {
    }

    if (end) {
      setPreAssessmentTodoList(ARR2);
    } else {
      setPreAssessmentTodoList(ARR);
    }
  }

  if (end) {
    return (
      <div>
        <div
          className="text-lg font-semibold text-gray-500"
          style={
            preAssessmentTodoList.length === 0 ? { textAlign: "center" } : null
          }
        >
          {preAssessmentTodoList?.length === 0 &&
            timing_of_surgery !== "Time-sensitive non-cardiac surgery" && (
              <span>
                <strong>Nothing to do</strong>
              </span>
            )}
          <ul>
            {!end &&
              timing_of_surgery === "Time-sensitive non-cardiac surgery" && (
                <li>
                  <div>
                    <strong>Timing of surgery: </strong>
                    <span>
                      Multidisciplinary decision of individualized cardiac
                      testing. If time, manage as elective non-cardiac surgery{" "}
                      <br />
                    </span>
                  </div>
                </li>
              )}
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

        {/* <DownloadButton /> */}

        {end && (
          <div className="mt-5">
            <a className="mt-10" href="/user/dashboard">
              <button className="h-10 px-5 text-green-700 transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-green-500 hover:text-green-100">
                Close
              </button>
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div
        className="text-lg font-semibold text-gray-500"
        style={
          preAssessmentTodoList.length === 0 ? { textAlign: "center" } : null
        }
      >
        {preAssessmentTodoList?.length === 0 &&
          timing_of_surgery !== "Time-sensitive non-cardiac surgery" && (
            <span>
              <strong>Nothing to do</strong>
            </span>
          )}
        <ul>
          {timing_of_surgery === "Time-sensitive non-cardiac surgery" && (
            <li>
              <div>
                <strong>Timing of surgery: </strong>
                <span>
                  Multidisciplinary decision of individualized cardiac testing.
                  If time, manage as elective non-cardiac surgery <br />
                </span>
              </div>
            </li>
          )}
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

      {/* <DownloadButton /> */}

      {end && (
        <a className="mt-10" href="/user/dashboard">
          <button className="h-10 px-5 text-green-700 transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-green-500 hover:text-green-100">
            Close
          </button>
        </a>
      )}
    </div>
  );
}

function transformExamination(examination) {
  let result = [];
  examination.forEach((item) => {
    if (typeof item === "string") {
      result.push(item);
    } else {
      for (let key in item) {
        result.push(key);
      }
    }
  });
  return result;
}

function compareArrays(examination, array2) {
  let new_examination = transformExamination(examination);
  for (let element of new_examination) {
    if (array2.includes(element)) {
      return true;
    }
  }
  return false;
}
