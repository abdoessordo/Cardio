import { useEffect, useState } from "react";
import { useStepperContext } from "../../contexts/StepperContext";
// import Dwon
import _, { conforms } from "lodash";

import DownloadButton from "../DownloadButton";

export default function Result({ end }) {
  const { userData } = useStepperContext();
  const [preAssessmentTodoList, setPreAssessmentTodoList] = useState([]);

  let {
    examination,
    timing_of_surgery,
    type_of_surgery_or_intervention,
    bleeding_risk,
    patient_name,
    cardiovascular_risk_factor,
    cv_atcd,
    non_cv_atcd,
    medications_current_use,
  } = userData;

  useEffect(() => {
    preAssessment();
  }, []);

  const get_patient_name = () => {
    if (patient_name === "" || typeof patient_name === "undefined") {
      return <strong>none</strong>;
    }
    return <strong>{patient_name}</strong>;
  };

  const get_cv_atcd = () => {
    if (cv_atcd === "" || cv_atcd === [] || typeof cv_atcd === "undefined") {
      return <strong>none</strong>;
    }
    return (
      <strong>
        {cv_atcd.map((item, index) => {
          if (typeof item === "object") {
            // flatten the object
            let key = Object.keys(item)[0];
            if (key === "Heart failure") {
              item = `${key} (${item[key]})`;
            } else if (key === "Mechanical prosthetic heart valve") {
              if (typeof item[key] === "object") {
                let tempitem = " (";

                for (let index = 0; index < item[key].length; index++) {
                  const elem = item[key][index];
                  if (typeof elem === "object") {
                    let nestedKey = Object.keys(elem)[0];
                    tempitem += nestedKey.split(":")[0];
                    tempitem += " (";
                    if (elem[nestedKey]) {
                      for (
                        let nestedIndex = 0;
                        nestedIndex < elem[nestedKey].length;
                        nestedIndex++
                      ) {
                        const nestedElem = elem[nestedKey][nestedIndex];
                        tempitem += nestedElem;
                        if (nestedIndex < elem[nestedKey].length - 2) {
                          tempitem += ", ";
                        } else if (nestedIndex === elem[nestedKey].length - 2) {
                          tempitem += " and ";
                        }
                      }
                    }
                    tempitem += ")";
                  } else {
                    tempitem += elem;
                  }
                  if (index < item[key].length - 2) {
                    tempitem += ", ";
                  } else if (index === item[key].length - 2) {
                    tempitem += " and ";
                  }
                }
                item = `${key} ${tempitem} )`;
              } else {
                item = `${key} (${item[key]})`;
              }
            }
          }

          return (
            <span key={index}>
              {typeof item !== Object && item}
              {/* adding , or and between items */}
              {index < cv_atcd.length - 2 && ", "}
              {index === cv_atcd.length - 2 && " and "}
            </span>
          );
        })}
      </strong>
    );
  };

  const get_non_cv_atcd = () => {
    if (
      non_cv_atcd === "" ||
      non_cv_atcd === [] ||
      typeof non_cv_atcd === "undefined"
    ) {
      return <strong>none</strong>;
    }
    return (
      <strong>
        {non_cv_atcd.map((item, index) => (
          <span key={index}>
            {item}
            {/* adding , or and between items */}
            {index < non_cv_atcd.length - 2 && ", "}
            {index === non_cv_atcd.length - 2 && " and "}
          </span>
        ))}
      </strong>
    );
  };

  const get_cardiovascular_risk_factor = () => {
    if (
      cardiovascular_risk_factor === "" ||
      cardiovascular_risk_factor === [] ||
      typeof cardiovascular_risk_factor === "undefined"
    ) {
      return <strong>none</strong>;
    }

    return (
      <strong>
        {cardiovascular_risk_factor.map((item, index) => {
          if (typeof item === "object") {
            item = `${Object.keys(item)[0]} (${item[Object.keys(item)[0]]})`;
          }
          return (
            <span key={index}>
              {item}
              {/* adding , or and between items */}
              {index < cardiovascular_risk_factor.length - 2 && ", "}
              {index === cardiovascular_risk_factor.length - 2 && " and "}
            </span>
          );
        })}
      </strong>
    );
  };

  const get_surgery_details = () => {
    // check if timing of surgery is an object
    if (typeof timing_of_surgery === "object") {
      // get the key of the object
      let key = Object.keys(timing_of_surgery)[0];
      timing_of_surgery = `${key} (${timing_of_surgery[key]})`;
    }
    return (
      <strong>
        {type_of_surgery_or_intervention} {timing_of_surgery}
      </strong>
    );
  };

  const get_examination = () => {
    if (
      examination === "" ||
      examination === [] ||
      typeof examination === "undefined"
    ) {
      return <strong>Asymptomatic</strong>;
    }

    // get first key of object
    // let key = Object.keys(examination[0])[0];
    const handle = (item) => {
      return Object.keys(item)[0];
    };
    let temp_examination = [];
    for (let item of examination) {
      if (typeof item === "string") {
        temp_examination.push(item);
      }
      if (item[handle(item)]?.length === 0) {
        console.log("CONTINUe");
        continue;
      } else if (Array.isArray(item[handle(item)]) && item[handle(item)]?.length > 0) {
        console.log("ARRAAAAY::: ", item[handle(item)])
        let temp_item = `${handle(item)} (`;
        for (let i = 0; i < item[handle(item)].length; i++) {
          let child = item[handle(item)][i];
          console.log("children: ", child)
          temp_item += child;
          if (i < (item[handle(item)].length - 2)) {
            temp_item += ", ";
          }
          if (i === (item[handle(item)].length - 2)) {
            temp_item += " and ";
          }
        }
        temp_item += ")";
        temp_examination.push(temp_item);
      } 
    }
    console.log("temp_examination: ", temp_examination);
    return (
      <strong>
        {temp_examination.map((item, index) => (
          <span key={index}>
            {typeof item === "object" ? handle(item) : item}
            {console.log("item[handle]: ", item[handle(item)])}
            {/* adding , or and between items */}
            {index < examination.length - 2 && ", "}
            {index === examination.length - 2 && " and "}
          </span>
        ))}
      </strong>
    );
  };

  const get_bleeding_risk = () => {
    if (bleeding_risk === "" || typeof bleeding_risk === "undefined") {
      return <strong>no bleeding risk</strong>;
    }
    return <strong>{bleeding_risk}</strong>;
  };

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
    // console.log("type", type_of_surgery_or_intervention);
    // console.log("ee", examination, transformExamination(examination));
    // console.log("kole", userData);
    // console.log(antecedent);
    if (
      [
        "High surgical risk (>5%)",
        "Intermediate surgical risk (1-5%)",
      ].includes(type_of_surgery_or_intervention) &&
      (antecedent.length > 0 ||
        examination.includes(
          "Symptoms/signs suggestive of cardio-vascular disease"
        ))
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
      _.isEqual(examination, list) &&
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
      _.isEqual(examination, list)
    ) {
      console.log("kiderti liha");
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
      _.isEqual(examination, list)
    ) {
      ARR.push({
        label: "Stress imaging",
        span: "(Class IIa)",
        class: "classIIa",
      });
    }
    console.log(type_of_surgery_or_intervention);
    console.log(examination);
    if (
      type_of_surgery_or_intervention === "High surgical risk (>5%)" &&
      transformExamination(examination).includes(
        "Poor functional capacity (METs<4 –if the patient cannot climb two flights of stairs-)"
      ) &&
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

    if (
      [
        "Intermediate surgical risk (1-5%)",
        "High surgical risk (>5%)",
      ].includes(type_of_surgery_or_intervention)
    ) {
      ARR.push({
        label: "Measure haemoglobin pre-operatively",
        span: "(Class I)",
        class: "classI",
      });
    }

    // Medications
    if (medications_current_use?.includes("beta_bolckers")) {
      ARR2.push({
        label: "Continue using beta-blockers",
        span: "(Class I)",
        class: "classI",
      });
    }

    if (medications_current_use?.includes("statins")) {
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

    let isRenin = false;
    if (
      medications_current_use?.includes(
        "renin_angiotensin_aldosterone_system_inhibitors"
      ) &&
      (medications_current_use?.includes("to_treat_arterial_hypertension") ||
        medications_current_use?.includes("to_treat_heart_failure"))
    ) {
      isRenin = true;
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
      medications_current_use?.includes("calcium_channel_blockers") &&
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
    if (
      medications_current_use?.includes("to_treat_hypertension") &&
      medications_current_use?.includes("diuretics")
    ) {
      to_treat_hypertension = true;
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
        "sodium_glucose_co_transporter_2_inhibitors"
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

    if (medications_current_use?.includes("amiodarone")) {
      ARR2.push({
        label: "Continue Amiodarone",
        span: "",
        class: "",
      });
    }

    if (medications_current_use?.includes("ivabradine")) {
      ARR2.push({
        label: "Continue Ivabradine",
        span: "",
        class: "",
      });
    }

    let vitamin_k_antagonist = false;
    if (
      medications_current_use?.includes("oral_anticoagulants") &&
      userData.oral_anticoagulants === "vitamin_k_antagonist" &&
      [
        "Warfarin",
        "Acenocoumarol(Sintrom*)",
        "Other Vitamin K antagonist",
      ].includes(userData.vitamin_k_antagonist)
    ) {
      vitamin_k_antagonist = true;
    }

    let time_sensitive_non_cardiac_surgery = false;
    if (
      _.isEqual(timing_of_surgery, {
        "Time-sensitive non-cardiac surgery":
          "Possible to defer non-cardiac surgery",
      }) ||
      _.isEqual(timing_of_surgery, {
        "Time-sensitive non-cardiac surgery":
          "Noy possible to defer non-cardiac surgery",
      })
    ) {
      time_sensitive_non_cardiac_surgery = true;
    }

    let elective_non_cardiac_surgery =
      timing_of_surgery === "Elective non-cardiac surgery";

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

    if (
      medications_current_use?.includes("oral_anticoagulants") &&
      userData.oral_anticoagulants ===
        "non_vitamin_k_antagonist_oral_anticoagulants" &&
      ["Apixaban", "Dabigatran"].includes(
        userData.non_vitamin_k_antagonist_oral_anticoagulants
      )
    ) {
      dabigatran_apixaban = true;
    }

    if (
      dabigatran_apixaban &&
      elective_non_cardiac_surgery &&
      bleeding_risk === "Minor bleeding risk"
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

    if (
      medications_current_use?.includes("oral_anticoagulants") &&
      userData.oral_anticoagulants ===
        "non_vitamin_k_antagonist_oral_anticoagulants" &&
      ["Rivaroxaban", "Rivaroxaban"].includes(
        userData.non_vitamin_k_antagonist_oral_anticoagulants
      )
    ) {
      rivaroxaban_edoxaban = true;
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
          class: "classI",
        },
        {
          label:
            "In patients taking the dose in the evening, the evening dose may be skipped",
          span: "",
          class: "",
        },
        {
          label: "Bridging is not recommended",
          span: "(Class III)",
          class: "classIII",
        }
      );
    }

    let non_vitamin_k_antagonist_oral_anticoagulants = false;

    if (
      medications_current_use?.includes("oral_anticoagulants") &&
      userData.oral_anticoagulants ===
        "non_vitamin_k_antagonist_oral_anticoagulants" &&
      ["Rivaroxaban", "Rivaroxaban", "Apixaban", "Dabigatran"].includes(
        userData.non_vitamin_k_antagonist_oral_anticoagulants
      )
    ) {
      non_vitamin_k_antagonist_oral_anticoagulants = true;
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

    if (
      medications_current_use?.includes("oral_anticoagulants") &&
      !medications_current_use?.includes("high_thrombotic_risk")
    ) {
      not_high_thrombotic_risk = true;
    }

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

    if (
      medications_current_use?.includes("oral_anticoagulants") &&
      userData.oral_anticoagulants === "vitamin_k_antagonist" &&
      ["Warfarin", "Acénocoumarol"].includes(userData.vitamin_k_antagonist)
    ) {
      warfarin_acénocoumarol = true;
    }

    let mechanical_prosthetic_heart_valve = false;
    if (
      medications_current_use?.includes("oral_anticoagulants") &&
      medications_current_use?.includes("mechanical_prosthetic_heart_valve")
    ) {
      mechanical_prosthetic_heart_valve = true;
    }

    if (
      warfarin_acénocoumarol &&
      time_sensitive_non_cardiac_surgery &&
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
      "Time-sensitive non-cardiac surgery":
        "Possible to defer non-cardiac surgery",
    });

    let high_thromboembolic_risk = false;
    if (
      medications_current_use?.includes("oral_anticoagulants") &&
      medications_current_use?.includes("high_thromboembolic_risk") &&
      (medications_current_use?.includes(
        "patients_with_a_recent_thromboembolic_event"
      ) ||
        medications_current_use?.includes(
          "patients_who_experienced_a_thromboembolic_event_during_previous_interruption_of_non_vitamin_k_oral_anticoagulant_therapy"
        ))
    ) {
      high_thromboembolic_risk = true;
    }

    if (
      possible_to_defer_surgery &&
      bleeding_risk === "High bleeding risk" &&
      high_thromboembolic_risk
    ) {
      ARR2.push({
        label:
          "Defer non-cardiac surgery (>3 months after stroke or venous thromboembolism)",
        span: "",
        class: "",
      });
    }

    let not_possible_to_defer_surgery = _.isEqual(timing_of_surgery, {
      "Time-sensitive non-cardiac surgery":
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

    let very_high_thromboembolic_risk = false;
    if (
      medications_current_use?.includes("oral_anticoagulants") &&
      medications_current_use?.includes("high_thromboembolic_risk") &&
      (medications_current_use?.includes("recent_stroke_less_than_3_months") ||
        medications_current_use?.includes(
          "high_risk_of_venous_thromboembolism_recurrences"
        ) ||
        medications_current_use?.includes("left_ventricular_apex_thrombus") ||
        medications_current_use?.includes(
          "artial_fibrillation_with_a_very_high_stroke_risk"
        ))
    ) {
      very_high_thromboembolic_risk = true;
    }

    if (
      elective_non_cardiac_surgery &&
      bleeding_risk === "High bleeding risk" &&
      (very_high_thromboembolic_risk || high_thromboembolic_risk) &&
      non_vitamin_k_antagonist_oral_anticoagulants &&
      not_possible_to_defer_surgery
    ) {
      ARR2.push({
        label:
          "Bridging with unfractionated heparin or low molecular weight heparin should be considered",
        span: "(Class IIb)",
        class: "classIIb",
      });
    }

    let aspirin_primary_prevention = false;

    if (
      medications_current_use?.includes("antiplatelets") &&
      medications_current_use?.includes("aspirin") &&
      userData.aspirin === "primary_prevention"
    ) {
      aspirin_primary_prevention = true;
    }

   

    let is_Aspirin = false;

    if (
      medications_current_use?.includes("antiplatelets") &&
      medications_current_use?.includes("aspirin") &&
      ["primary_prevention", "secondary_prevention"].includes(userData.aspirin)
    ) {
      is_Aspirin = true;
    }

    let is_P2Y12 = false;

    if (
      medications_current_use?.includes("antiplatelets") &&
      medications_current_use?.includes("p2y12_inhibitors") &&
      ["ticagrelor", "clopidogrel", "prasugrel"].includes(
        userData.p2y12_inhibitors
      )
    ) {
      is_P2Y12 = true;
    }

    let nothing_set = true

    if (
      ["Low bleeding risk", "Minor bleeding risk"].includes(bleeding_risk) &&
      is_Aspirin &&
      is_P2Y12
    ) {
      ARR2.push({
        label: "Continue aspirin and P2Y12 inhibitor",
        span: "(Class I)",
        class: "classI",
      });
      nothing_set = false;
    }

    let antiplatelets_low_thrombotic_risk = false;

    if (
      medications_current_use?.includes("antiplatelets") &&
      medications_current_use?.includes("low_thrombotic_risk")
    ) {
      antiplatelets_low_thrombotic_risk = true;
    }

    let p2y12_ticarelor = false;
    if (
      medications_current_use?.includes("antiplatelets") &&
      medications_current_use?.includes("p2y12_inhibitors") &&
      userData.p2y12_inhibitors === "ticagrelor"
    ) {
      p2y12_ticarelor = true;
    }

    if (
      bleeding_risk === "High bleeding risk" &&
      antiplatelets_low_thrombotic_risk &&
      is_Aspirin &&
      p2y12_ticarelor
    ) {
      ARR2.push(
        {
          label: "Continue Aspirin",
          span: "(Class I)",
          class: "classI",
        },
        {
          label: "Interrupt Ticagrelor 3-5 days pre-operatively",
          span: "(Class I)",
          class: "classI",
        },
        {
          label:
            "Bridging with Tirofiban/Eptifibatide infusion 3 days pre-operatively, and interrupt it 4 hours pre-operatively or bridging with Cangrelor infusion immediately with interruption of Ticagrelor and interrupt it 1 hour pre-operatively",
          span: "(Class I)",
          class: "classI",
        },
        {
          label:
            "Initiate Clopidogrel (LD 300 mg ) 4 to 6 hours after non-cardiac surgery , followed by 75 mg once a day",
          span: "(Class I)",
          class: "classI",
        }
      );
      nothing_set = false;

    }

    let p2y12_clopidogrel = false;

    if (
      medications_current_use?.includes("antiplatelets") &&
      medications_current_use?.includes("p2y12_inhibitors") &&
      userData.p2y12_inhibitors === "clopidogrel"
    ) {
      p2y12_clopidogrel = true;
    }

    if (
      bleeding_risk === "High bleeding risk" &&
      antiplatelets_low_thrombotic_risk &&
      is_Aspirin &&
      p2y12_clopidogrel
    ) {
      ARR2.push(
        {
          label: "Continue aspirin",
          span: "(Class I)",
          class: "classI",
        },
        {
          label: "Interrupt Clopidogrel 5days pre-operatively",
          span: "(Class I)",
          class: "classI",
        },
        {
          label:
            "Bridging with Tirofiban/Eptifibatide infusion 3 days pre-operatively, and interrupt it 4 hours",
          span: "(Class I)",
          class: "classI",
        },
        {
          label:
            "Pre-operatively or bridging with Cangrelor infusion immediately with interruption of clopidogrel and interrupt it 1 hour per-operatively",
          span: "(Class I)",
          class: "classI",
        },
        {
          label:
            "Initiate clopidogrel (LD 300 mg) 4 to 6 hours after non-cardiac surgery, followed by 75 mg once a day",
          span: "(Class I)",
          class: "classI",
        }
      );
      nothing_set = false;

    }

    let p2y12_prasugrel = false;
    if (
      medications_current_use?.includes("antiplatelets") &&
      medications_current_use?.includes("p2y12_inhibitors") &&
      userData.p2y12_inhibitors === "prasugrel"
    ) {
      p2y12_prasugrel = true;
    }

    if (
      bleeding_risk === "High bleeding risk" &&
      antiplatelets_low_thrombotic_risk &&
      is_Aspirin &&
      p2y12_prasugrel
    ) {
      ARR2.push(
        {
          label: "Continue aspirin",
          span: "(Class I)",
          class: "classI",
        },
        {
          label: "Interrupt Prasugrel 7 days pre-operatively",
          span: "(Class I)",
          class: "classI",
        },
        {
          label:
            "Bridging with Tirofiban/Eptifibatide infusion 3 days pre-operatively, and interrupt it 4 hours (Class I) pre-operatively or bridging with cangrelor infusion immediately with interruption of Prasugrel and interrupt it 1 hour pre-operatively",
          span: "(Class I)",
          class: "classI",
        },
        {
          label:
            "Initiate Clopidogrel (LD 300 mg) 4 to 6 hours after non-cardiac surgery, followed by 75 mg once a day",
          span: "(Class I)",
          class: "classI",
        }
      );
      nothing_set = false;

    }

    let antiplatelets_high_thrombotic_risk = false;
    if (
      medications_current_use?.includes("antiplatelets") &&
      medications_current_use?.includes("high_thrombotic_risk_1") &&
      (medications_current_use?.includes("high_risk_of_stent_thrombosis") ||
        medications_current_use?.includes("acute_coronary_syndrome") ||
        medications_current_use?.includes("percutaneous_coronary_intervention"))
    ) {
      antiplatelets_high_thrombotic_risk = true;
    }

    if (
      time_sensitive_non_cardiac_surgery &&
      bleeding_risk === "High bleeding risk" &&
      antiplatelets_high_thrombotic_risk &&
      is_Aspirin &&
      is_P2Y12
    ) {
      ARR2.push({
        label: "Bridge with glycoprotein IIb/IIIa inhibitors or Cangrelor",
        span: "",
        class: "",
      });
      nothing_set = false;

    }

    if (
      bleeding_risk === "High bleeding risk" &&
      antiplatelets_high_thrombotic_risk &&
      elective_non_cardiac_surgery &&
      is_Aspirin &&
      is_P2Y12
    ) {
      ARR2.push({
        label: "Defer non-cardiac surgery",
        span: "(Class I)",
        class: "classI",
      });
      nothing_set = false;

    }

    if (nothing_set && aspirin_primary_prevention) {
      ARR2.push({
        label: "Interrupt Aspirin",
        span: "",
        class: "",
      });

    }

    if (end) {
      setPreAssessmentTodoList(ARR2);
    } else {
      setPreAssessmentTodoList(ARR);
    }
  }

  if (end) {
    return (
      <div className="container md:mt-10">
        <div className="flex flex-col items-center">
          <div className="wrapper">
            <svg
              className="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                className="checkmark__circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className="checkmark__check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </div>

          <div className="mt-3 text-xl font-semibold uppercase text-blue-500">
            Recommendations regarding medications
          </div>

          <br />
          <div className="mt-5 text-xl font-semibold uppercase text-blue-500">
            <u>TO DO PLEASE</u>
          </div>
        </div>
        <div>
          <div
            className="text-lg font-semibold text-gray-500"
            style={
              preAssessmentTodoList.length === 0
                ? { textAlign: "center" }
                : null
            }
          >
            {preAssessmentTodoList?.length === 0 &&
              timing_of_surgery !== "Time-sensitive non-cardiac surgery" && (
                <div>
                  <div className="text-lg font-semibold text-gray-500">
                    <ul>
                      <li>
                        <div>
                          <span>
                            Proceed to surgery without additional pre-operative
                            risk assessment <strong></strong>
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
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

          <DownloadButton />

          {end && (
            <div className="mt-5">
              <a className="mt-10" href="/">
                <button className="h-10 px-5 text-blue-700 transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-blue-500 hover:text-blue-100">
                  Close
                </button>
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="container md:mt-10">
      <div className="flex flex-col items-center">
        <div className="wrapper">
          <svg
            className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>

        <div className="mt-3 text-xl font-semibold uppercase text-blue-500">
          Cardiology opinion
        </div>
        <div
          className="text-lg font-semibold text-gray-500 mt-5"
          id="resultText"
        >
          It's about the patient Mr/Mrs {get_patient_name()}, having as a
          cardiovascular risk factor {get_cardiovascular_risk_factor()}, as
          cardiovascular antecedents {get_cv_atcd()} and as non cardiovascular
          antecedent {get_non_cv_atcd()}, undergoing a {get_surgery_details()},
          with a {get_bleeding_risk()}. The examination found{" "}
          {get_examination()}
        </div>

        <br />
        <br />
        <br />
        <div className="mt-5 text-xl font-semibold uppercase text-blue-500">
          <u>TO DO PLEASE</u>
        </div>
      </div>
      <div>
        <div
          className="text-lg font-semibold text-gray-500"
          style={
            preAssessmentTodoList.length === 0 ? { textAlign: "center" } : null
          }
        >
          {preAssessmentTodoList?.length === 0 &&
            timing_of_surgery !== "Time-sensitive non-cardiac surgery" && (
              <div>
                <div className="text-lg font-semibold text-gray-500">
                  <ul>
                    <li>
                      <div>
                        <span>
                          Proceed to surgery without additional pre-operative
                          risk assessment <strong></strong>
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          <ul>
            {timing_of_surgery === "Time-sensitive non-cardiac surgery" && (
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

        <DownloadButton />

        {end && (
          <a className="mt-10" href="/">
            <button className="h-10 px-5 text-blue-700 transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-blue-500 hover:text-blue-100">
              Close
            </button>
          </a>
        )}
      </div>
    </div>
  );
}

/*
transform this
"examination": [
        {
          "Abnormal ECG": "[\"Pathological Q wave\"]"
        },
        "Acute coronary syndrome"
      ]

      to this
["Abnormal ECG", "Acute coronary syndrome"]
*/
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
