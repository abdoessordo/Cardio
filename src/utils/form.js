export const form = {
  steps: [
    {
      title: "Pre-assessment tools",
      parts: [
        {
          title: "Surgery-related",
          questions: [
            {
              type: "radio",
              required: true,
              label: "Timing of surgery",
              name: "timing_of_surgery",
              options: [
                {
                  label: "Emergent non-cardiac surgery",
                  value: "Emergent non-cardiac surgery"
                },
                {
                  label: "Urgent non-cardiac surgery",
                  value: "Urgent non-cardiac surgery"
                },
                {
                  label: "Time-sensitive non-cardiac surgery",
                  value: "Time-sensitive non-cardiac surgery"
                },
                {
                  label: "Elective non-cardiac surgery",
                  value: "Elective non-cardiac surgery",
                  name: "elective_non_cardiac_surgery",
                  nestedQuestion: {
                    type: "radio",
                    options: [
                      {
                        label: "Possible to defer non-cardiac surgery",
                        value: "Possible to defer non-cardiac surgery"
                      },
                      {
                        label: "Not possible to defer non-cardiac surgery",
                        value: "Not possible to defer non-cardiac surgery",
                      },
                    ],
                  },
                },
              ],
            },
            {
              type: "select",
              required: true,
              label: "Type of surgery or intervention",
              name: "type_of_surgery_or_intervention",
              options: [
                {
                  value: "Low surgical risk (<1%)",
                  titles: [
                    "Breast",
                    "Dental",
                    "Endocrine: thyroid",
                    "Eye",
                    "Gynaecological: minor",
                    "Orthopaedic minor (meniscectomy)",
                    "Reconstructive",
                    "Superficial surgery",
                    "Urological minor: (transurethral resection of the prostate)",
                    "Video assisted thoracic surgery minor lung resection",
                  ],
                },
                {
                  value: "Intermediate surgical risk (1-5%)",
                  titles: [
                    "Carotid asymptomatic (coronary endarterectomy or coronary artery stenting)",
                    "Carotid symptomatic (coronary endarterectomy)",
                    "Endovascular aortic aneurysm repair",
                    "Head or neck surgery",
                    "Intraperitoneal: splenectomy, hiatal hernia repair, cholecystectomy",
                    "Intrathoracic: non-major",
                    "Neurological or orthopaedic: major (hip and spine surgery)",
                    "Peripheral arterial angioplasty",
                    "Renal transplants",
                    "Urological or gynaecological: major",
                  ],
                },
                {
                  value: "High surgical risk (>5%)",
                  titles: [
                    "Adrenal resection",
                    "Aortic and major vascular surgery",
                    "Carotid symptomatic (Carotid artery stenting)",
                    "Duodenal-pancreatic surgery",
                    "Liver resection, bile duct surgery ",
                    "Oesophagectomy",
                    "Open lower limb revascularization for acute limb ischaemia or amputation",
                    "Pneumonectomy (video-assisted thoracic surgery or open surgery)",
                    "Pulmonary or liver transplant",
                    "Repair of perforated bowel",
                    "Total cystectomy",
                  ],
                },
              ],
            },
            {
              type: "select",
              required: true,
              label: "Bleeding risk",
              name: "bleeding_risk",
              options: [
                {
                  value: "Minor bleeding risk",
                  titles: [
                    "Cataract or glaucoma procedure",
                    "Dental procedures: extractions (1–3 teeth), periodontal surgery, implant positioning endodontic (root canal) procedures, subgingival scaling/cleaning",
                    "Endoscopy without biopsy or resection",
                    " Superficial surgery (e.g. abscess incision, small skin excisions/ biopsy)",
                  ],
                },
                {
                  value: "Low bleeding risk",
                  titles: [
                    "Abdominal surgery: cholecystectomy, hernia repair, colon resection",
                    "Breast surgery",
                    "Complex dental procedures (multiple tooth extractions)",
                    "Endoscopy with simple biopsy",
                    "Gastroscopy or colonoscopy with simple biopsy",
                    "Large-bore needles procedures (e.g. bone marrow or lymph node biopsy)",
                    "Non-cataract ophthalmic surgery",
                    "Small orthopaedic surgery (foot, hand arthroscopy)",
                  ],
                },
                {
                  value: "High bleeding risk",
                  titles: [
                    "Abdominal surgery with liver biopsy, extracorporeal shockwave lithotripsy",
                    "Extensive cancer surgery (e.g. pancreas, liver)",
                    "Neuraxial (spinal or epidural) anaesthesia",
                    "Neurosurgery (intracranial, spinal) ",
                    "Major orthopaedic surgery ",
                    "Procedures with vascular organ biopsy (kidney or prostate)",
                    "Reconstructive plastic surgery",
                    "Specific interventions (colon polypectomy, lumbar puncture, endovascular aneurysm repair)",
                    "Thoracic surgery, lung resection surgery",
                    " Urological surgery (prostatectomy, bladder tumour resection)",
                    "Vascular surgery (e.g. abdominal aortic aneuvrysm repair, vascular bypass)",
                  ],
                },
              ],
            },
          ],
        },
        {
          title: "Patient-related",
          questions: [
            {
              type: "input",
              input_type: "text",
              placeholder: "Enter patient's name",
              required: true,
              label: "Patient's name",
              name: "patient_name",
            },
            {
              type: "checkbox",
              required: false,
              label: "Cardiovascular risk factor",
              name: "cardiovascular_risk_factor",
              options: [
                {
                  label: "Hypertension",
                  value: "Hypertension",
                },
                {
                  label: "Diabetes",
                  value: "Diabetes",
                },
                {
                  label: "Dyslipidemia",
                  value: "Dyslipidemia",
                },
                {
                  label: "Smoking",
                  value: "Smoking",
                },
                {
                  label: "Age greater than or equal to 65 years",
                  value: "Age greater than or equal to 65 years",
                },
                {
                  label: "Family history of cardiovascular disease",
                  value: "Family history of cardiovascular disease",
                  required: true,
                  nestedQuestion: {
                    type: "checkbox",
                    options: [
                      {
                        label:
                          "Myocardial infarction or sudden death <55 years with father or brother",
                        value:
                        "Myocardial infarction or sudden death <55 years with father or brother",
                      },
                      {
                        label:
                          "Myocardial infarction or sudden death <65 years with mother or sister",
                        value:
                          "Myocardial infarction or sudden death <65 years with mother or sister",
                      },
                      {
                        label:
                          "Cerebrovascular accident <45 years with parents or brother/sister",
                        value:
                          "Cerebrovascular accident <45 years with parents or brother/sister",
                      },
                    ],
                  },
                },
              ],
            },
            {
              type: "checkbox",
              label: "Antecedents",
              name: "antecedents",
              sections: [
                {
                  title: "Cardiovascular disease ",
                  name: "cv_atcd",
                  options: [
                    {
                      label: "Heart failure",
                      value: "Heart failure",
                      name: "heart_failure",
                      nestedQuestion: {
                        type: "radio",
                        options: [
                          {
                            label: "Stable heart failure",
                            value: "Stable heart failure",
                          },
                          {
                            label: "Unstable heart failure",
                            value: "Unstable heart failure",
                          },
                        ],
                      },
                    },
                    {
                      label: "Coronary artery disease",
                      value: "Coronary artery disease",
                    },
                    {
                      label: "Vasospastic angina",
                      value: "Vasospastic angina",
                    },
                    {
                      label: "Mechanical prosthetic heart valve",
                      value: "Mechanical prosthetic heart valve",
                      name: "mechanical_prosthetic_heart_valve",
                      nestedQuestion: {
                        type: "checkbox",
                        options: [
                          {
                            label:
                              "Mechanical aortic valve replacement(AVR), associated with",
                            value: "Mechanical aortic valve replacement(AVR), associated with",
                            name: "mechanical_aortic_valve_replacement_associated_with",
                            nestedQuestion: {
                              type: "checkbox",
                              options: [
                                {
                                  label: "Atrial fibrillation",
                                  value: "Atrial fibrillation",
                                },
                                {
                                  label: "Previous thromboembolism",
                                  value: "Previous thromboembolism",
                                },
                                {
                                  label: "Severe left ventricular dysfunction",
                                  value: "Severe left ventricular dysfunction",
                                },
                                {
                                  label: "Hypercoagulable state",
                                  value: "Hypercoagulable state",
                                },
                              ]
                            }

                          },
                          {
                            label:
                              "Older-generation mechanical aortic valve replacement ",
                            value:
                              "Older-generation mechanical aortic valve replacement ",
                          },
                          {
                            label: "Mechanical mitral valve replacement",
                            value: "Mechanical mitral valve replacement",
                          },
                        ],
                      },
                    },
                    {
                      label: "Atrial fibrillation",
                      value: "Atrial fibrillation",
                    },
                    {
                      label: "Other rythmic antecedents",
                      value: "Other rythmic antecedents",
                    },
                    {
                      label: "Venous thromboembolism",
                      value: "Venous thromboembolism",
                    },
                  ],
                },
                {
                  title: "Non cardiovascular disease",
                  name: "non_cv_atcd",
                  options: [
                    {
                      label: "Diabetes mellitus",
                      value: "Non Diabetes mellitus",
                    },
                    {
                      label: "Renal failure",
                      value: "Non Renal failure",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: "Examination",
          questions: [
            {
              type: "checkbox",
              required: true,
              label: "Examination",
              name: "examination",
              options: [
                {
                  label: "Asymptomatic",
                  value: "Asymptomatic",
                  default: true,
                },
                {
                  label: "Newly detected murmurs",
                  value: "Newly detected murmurs",
                },
                {
                  label: "Chest pain",
                  value: "Chest pain",
                },
                {
                  label: "Symptoms/signs suggestive of cardio-vascular disease",
                  value: "Symptoms/signs suggestive of cardio-vascular disease",
                },
                {
                  label:
                    "Poor functional capacity (METs<4 –if the patient cannot climb two flights of stairs-)",
                  value: "Poor functional capacity (METs<4 –if the patient cannot climb two flights of stairs-)",
                },
                {
                  label: "High clinical risk factor (RCRI >= 1)",
                  value: "High clinical risk factor (RCRI >= 1)",
                  name: "high_clinical_risk_factor",
                  required: true,
                  nestedQuestion: {
                    type: "checkbox",
                    options: [
                      {
                        label: "Ischaemic heart disease",
                        value: "Ischaemic heart disease",
                      },
                      {
                        label: "Cerebrovascular disease",
                        value: "Cerebrovascular disease",
                      },
                      {
                        label: "History of congestive heart failure",
                        value: "History of congestive heart failure",
                      },
                      {
                        label: "Insulin therapy for diabetes",
                        value: "Insulin therapy for diabetes",
                      },
                      {
                        label: "Serum creatinine level ≥2 mg/dL",
                        value:
                          "Serum creatinine level ≥2 mg/dL",
                      },
                      {
                        label: "High-risk surgery",
                        value: "High-risk surgery",
                      },
                    ],
                  },
                },
                {
                  label: "Abnormal ECG",
                  value: "Abnormal ECG",
                  name: "Abnormal ECG",
                  required: true,
                  nestedQuestion: {
                    type: "checkbox",
                    options: [
                      {
                        label: "Pathological Q wave",
                        value: "Pathological Q wave",
                      },
                      {
                        label: "ST-T wave changes",
                        value: "ST-T wave changes",
                      },
                      {
                        label: "Non-sinus rhythm",
                        value: "Non-sinus rhythm",
                      },
                      {
                        label: "Left bundle branch block",
                        value: "Left bundle branch block",
                      },
                    ],
                  },
                },
                {
                  label: "High NT-pro-BNP/BNP",
                  value: "High NT-pro-BNP/BNP",
                },
                {
                  label: "Acute coronary syndrome",
                  value: "Acute coronary syndrome",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: "Results",
      type: "results",
      parts: [
        {
          title: "Results",
          questions: [
            {
              type: "title",
              label: "Results",
              options: [
                {
                  title: "Low risk",
                  value: "low_risk",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: "Interruption and resumption of medications",
      parts: [
        {
          title: "Interruption and resumption of medications",
          questions: [
            {
              type: "checkbox",
              required: true,
              label: "Medications (current use)",
              name: "medications_current_use",
              options: [
                { label: "Beta-blockers", value: "beta_bolckers" },
                { label: "Amiodarone", value: "amiodarone" },
                { label: "Ivabradine", value: "ivabradine" },
                { label: "Statins", value: "statins" },
                {
                  label: "Renin–angiotensin–aldosterone system inhibitors",
                  value: "renin_angiotensin_aldosterone_system_inhibitors",
                  name: "renin_angiotensin_aldosterone_system_inhibitors",
                  nestedQuestion: {
                    type: "checkbox",
                    options: [
                      {
                        label: "To treat arterial hypertension",
                        value: "to_treat_arterial_hypertension",
                      },
                      {
                        label: "To treat heart failure",
                        value: "to_treat_heart_failure",
                      },
                    ],
                  },
                },
                {
                  label: "Calcium channel blockers",
                  value: "calcium_channel_blockers",
                },
                {
                  label: "Diuretics ",
                  value: "diuretics",
                  name: "diuretics",
                  nestedQuestion: {
                    type: "checkbox",
                    options: [
                      {
                        label: "To treat hypertension",
                        value: "to_treat_hypertension",
                      },
                      {
                        label: "To treat heart failure",
                        value: "to_treat_heart_failure1",
                      },
                      {
                        label: "Other indications",
                        value: "other_indications",
                      },
                    ],
                  },
                },
                {
                  label: "Sodium–glucose co-transporter-2 inhibitors",
                  value: "sodium_glucose_co_transporter_2_inhibitors",
                },
                {
                  label: "Oral anticoagulants",
                  value: "oral_anticoagulants",
                  name: "oral_anticoagulants",
                  sections: [
                    {
                      title: "Used Medications",
                      nestedQuestion: {
                        type: "radio",
                        options: [
                          {
                            label:
                              "Non-vitamin K antagonist oral anticoagulants",
                            value:
                              "non_vitamin_k_antagonist_oral_anticoagulants",
                            name: "non_vitamin_k_antagonist_oral_anticoagulants",
                            nestedQuestion: {
                              type: "radio",
                              options: [
                                {
                                  label: "Apixaban",
                                  value: "Apixaban",
                                },
                                {
                                  label: "Dabigatran",
                                  value: "Dabigatran",
                                },
                                {
                                  label: "Edoxaban",
                                  value: "Edoxaban",
                                },
                                {
                                  label: "Rivaroxaban",
                                  value: "Rivaroxaban",
                                },
                              ],
                            },
                          },
                          {
                            label: "Vitamin K antagonist",
                            value: "vitamin_k_antagonist",
                            name: "vitamin_k_antagonist",
                            nestedQuestion: {
                              type: "radio",
                              options: [
                                {
                                  label: "Warfarin",
                                  value: "Warfarin",
                                },
                                {
                                  label: "Acenocoumarol(Sintrom*)",
                                  value: "Acenocoumarol(Sintrom*)",
                                },
                                {
                                  label: "Other Vitamin K antagonist",
                                  value: "Other Vitamin K antagonist",
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      title: "Risk Evaluation",
                      nestedQuestion: {
                        type: "radio",
                        options: [
                          {
                            label: "High thrombotic risk",
                            value: "high_thrombotic_risk",
                            name: "high_thrombotic_risk",
                            nestedQuestion: {
                              type: "checkbox",
                              options: [
                                {
                                  label: "Mechanical prosthetic heart valve",
                                  value: "mechanical_prosthetic_heart_valve",
                                },
                                {
                                  label: "Very high thromboembolic risk",
                                  value: "very_high_thromboembolic_risk",
                                  name: "very_high_thromboembolic_risk",
                                  nestedQuestion: {
                                    type: "checkbox",
                                    options: [
                                      {
                                        label:
                                          "Recent stroke < 3 months",
                                        value: "recent_stroke_less_than_3_months",
                                      },
                                      {
                                        label:
                                          "High risk of venous thromboembolism recurrences (e.g. antithrombin 3 deficiency or protein C and/or S deficiency)",
                                        value:
                                          "high_risk_of_venous_thromboembolism_recurrences",
                                      },
                                      {
                                        label: "Left ventricular apex thrombus",
                                        value: "left_ventricular_apex_thrombus",
                                      },
                                      {
                                        label:
                                          "Artial fibrillation with a very high stroke risk",
                                        value:
                                          "artial_fibrillation_with_a_very_high_stroke_risk",
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                          {
                            label: "High thromboembolic risk",
                            value: "high_thromboembolic_risk",
                            name: "high_thromboembolic_risk",
                            nestedQuestion: {
                              type: "checkbox",
                              options: [
                                {
                                  label:
                                    "Patients with a recent (within 3 months) thromboembolic event (stroke, systemic embolism, or VTE)",
                                  value:
                                    "patients_with_a_recent_thromboembolic_event",
                                },
                                {
                                  label:
                                    "Patients who experienced a thromboembolic event during previous interruption of Non-vitamin K oral anticoagulant therapy",
                                  value:
                                    "patients_who_experienced_a_thromboembolic_event_during_previous_interruption_of_non_vitamin_k_oral_anticoagulant_therapy",
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },

                {
                  label: "Antiplatelets",
                  value: "antiplatelets",
                  name: "antiplatelets",
                  sections: [
                    {
                      title: "Used Medications",
                      nestedQuestion: {
                        type: "checkbox", 
                        options: [
                          {
                            label: "Aspirin",
                            value: "aspirin",
                            name: "aspirin",
                            nestedQuestion: {
                              type: "radio",
                              options: [
                                {
                                  label: "Primary prevention",
                                  value: "primary_prevention",
                                },
                                {
                                  label: "Secondary prevention",
                                  value: "secondary_prevention",
                                },
                              ],
                            },
                          },
                          {
                            label: "P2Y12 inhibitors",
                            value: "p2y12_inhibitors",
                            name: "p2y12_inhibitors",
                            nestedQuestion: {
                              type: "radio",
                              options: [
                                {
                                  label: "Ticagrelor",
                                  value: "ticagrelor",
                                },
                                {
                                  label: "Clopidogrel",
                                  value: "clopidogrel",
                                },
                                {
                                  label: "Prasugrel",
                                  value: "prasugrel",
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      title: "Risk Evaluation",
                      nestedQuestion: {
                        type: "radio",
                        options: [
                          {
                            label: "High thrombotic risk",
                            value: "high_thrombotic_risk_1",
                            name: "high_thrombotic_risk_1",
                            nestedQuestion: {
                              type: "checkbox",
                              options: [
                                {
                                  label:
                                    "Percutaneous coronary intervention <1 month",
                                  value: "percutaneous_coronary_intervention",
                                },
                                {
                                  label: "Acute coronary syndrome <3 months",
                                  value: "acute_coronary_syndrome",
                                },
                                {
                                  label: "High risk of stent thrombosis ",
                                  value: "high_risk_of_stent_thrombosis",
                                  namne: "high_risk_of_stent_thrombosis",
                                  nestedQuestion: {
                                    type: "checkbox",
                                    options: [
                                      {
                                        label:
                                          "History of stent thrombosis under antiplatelet therapy",
                                        value: "history_of_stent_thrombosis",
                                      },
                                      {
                                        label:
                                          "Reduced left ventricular ejection fraction (40%) ",
                                        value:
                                          "reduced_left_ventricular_ejection_fraction",
                                      },
                                      {
                                        label: "Poorly controlled diabetes ",
                                        value: "poorly_controlled_diabetes",
                                      },
                                      {
                                        label:
                                          "Severely impaired renal function/haemodialysis ",
                                        value:
                                          "severely_impaired_renal_function",
                                      },
                                      {
                                        label:
                                          "Recent complex PCI (i.e. severely calcified lesion, left main PCI, chronic total occlusion, bifurcational/crush technique, bypass graft PCI)",
                                        value: "recent_complex_pci",
                                      },
                                      {
                                        label:
                                          "Stent malapposition/residual dissection.",
                                        value: "stent_malapposition",
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                          {
                            label: "Low thrombotic risk",
                            value: "low_thrombotic_risk",
                          },
                        ],
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: "Results",
      type: "results",
      parts: [
        {
          title: "Results",
          questions: [
            {
              type: "title",
              label: "Results",
              options: [
                {
                  title: "Low risk",
                  value: "low_risk",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
