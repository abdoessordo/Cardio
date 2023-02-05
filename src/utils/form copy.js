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
                  value: "emergent_non_cardiac_surgery",
                },
                {
                  label: "Urgent non-cardiac surgery",
                  value: "urgent_non_cardiac_surgery",
                },
                {
                  label: "Time-sensitive non-cardiac surgery",
                  value: "time_sensitive_non_cardiac_surgery",
                },
                {
                  label: "Elective non-cardiac surgery",
                  value: "elective_non_cardiac_surgery",
                  // name: "elective_non_cardiac_surgery",
                  nestedQuestion: {
                    type: "radio",
                    options: [
                      {
                        label: "Possible to defer non-cardiac surgery",
                        value: "possible_to_defer_non_cardiac_surgery",
                      },
                      {
                        label: "Not possible to defer non-cardiac surgery",
                        value: "not_possible_to_defer_non_cardiac_surgery",
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
              // name: "cardiovascular_risk_factor",
              options: [
                {
                  label: "Hypertension",
                  value: "hypertension",
                },
                {
                  label: "Diabetes",
                  value: "diabetes",
                },
                {
                  label: "Dyslipidemia",
                  value: "dyslipidemia",
                },
                {
                  label: "Smoking",
                  value: "smoking",
                },
                {
                  label: "Age greater than or equal to 65 years",
                  value: "age_greater_than_65_years",
                },
                {
                  label: "Family history of cardiovascular disease",
                  value: "family_history_of_cardiovascular_disease",
                  required: true,
                  nestedQuestion: {
                    type: "checkbox",
                    options: [
                      {
                        label:
                          "Myocardial infarction or sudden death <55 years with father or brother",
                        value:
                          "myocardial_infarction_or_sudden_death_less_than_55_years_with_father_or_brother",
                      },
                      {
                        label:
                          "Myocardial infarction or sudden death <65 years with mother or sister",
                        value:
                          "myocardial_infarction_or_sudden_death_less_than_65_years_with_mother_or_sister",
                      },
                      {
                        label:
                          "Cerebrovascular accident <45 years with parents or brother/sister",
                        value:
                          "cerebrovascular_accident_less_than_45_years_with_parents_or_brother_sister",
                      },
                    ],
                  }
                },
              ],
            },
            {
              type: "title",
              label: "Antecedents",
              sections: [
                {
                  type: "radio",
                  required: true,
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
                  value: "asymptomatic",
                  default: true,
                },
                {
                  label: "Newly detected murmurs",
                  value: "newly_detected_murmurs",
                },
                {
                  label: "Chest pain",
                  value: "chest_pain",
                },
                {
                  label: "Symptoms/signs suggestive of cardio-vascular disease",
                  value: "symptoms_signs_suggestive_of_cardiovascular_disease",
                },
                {
                  label:
                    "Poor functional capacity (METs<4 –if the patient cannot climb two flights of stairs-)",
                  value: "poor_functional_capacity",
                },
                {
                  label: "High clinical risk factor : (RCRI >= 1)",
                  value: "high_clinical_risk_factor",
                  name: "high_clinical_risk_factor",
                  required: true,
                  nestedQuestion: {
                    type: "checkbox",
                    options: [
                      {
                        label: "Ischaemic heart disease",
                        value: "ischaemic_heart_disease",
                      },
                      {
                        label: "Cerebrovascular disease",
                        value: "cerebrovascular_disease",
                      },
                      {
                        label: "History of congestive heart failure",
                        value: "history_of_congestive_heart_failure",
                      },
                      {
                        label: "Insulin therapy for diabetes",
                        value: "insulin_therapy_for_diabetes",
                      },
                      {
                        label: "Serum creatinine level ≥2 mg/dL",
                        value:
                          "serum_creatinine_level_greater_than_or_equal_to_2_mg_per_dL",
                      },
                      {
                        label: "High-risk surgery",
                        value: "high_risk_surgery",
                      },
                    ],
                  }
                },
                {
                  label: "Abnormal ECG",
                  value: "abnormal_ecg",
                  name: "abnormal_ecg",
                  required: true,
                  nestedQuestion: {
                    type: "checkbox",
                    options: [
                      {
                        label: "Pathological Q wave",
                        value: "pathological_q_wave",
                      },
                      {
                        label: "ST-T wave changes",
                        value: "st_t_wave_changes",
                      },
                      {
                        label: "Non-sinus rhythm",
                        value: "non_sinus_rhythm",
                      },
                      {
                        label: "Left bundle branch block",
                        value: "left_bundle_branch_block",
                      },
                    ],
                  }
                },
                {
                  label: "High NT-pro-BNP/BNP",
                  value: "high_nt_pro_bnp_bnp",
                },
                {
                  label: "Acute coronary syndrome",
                  value: "acute_coronary_syndrome",
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
                        value: "to_treat_heart_failure",
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
                  nestedQuestion: {
                    type: "radio",
                    options: [
                      {
                        label: "Non-vitamin K antagonist oral anticoagulants",
                        value: "non_vitamin_k_antagonist_oral_anticoagulants",
                        name: "non_vitamin_k_antagonist_oral_anticoagulants",
                        nestedQuestion: {
                          type: "radio",
                          options: [
                            {
                              label: "Apixaban",
                              value: "apixaban",
                            },
                            {
                              label: "Dabigatran",
                              value: "dabigatran",
                            },
                            {
                              label: "Edoxaban",
                              value: "edoxaban",
                            },
                            {
                              label: "Rivaroxaban",
                              value: "rivaroxaban",
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
                              value: "warfarin",
                            },
                            {
                              label: "Acenocoumarol(Sintrom*)",
                              value: "acenocoumarol_sintrom",
                            },
                            {
                              label: "Other Vitamin K antagonist",
                              value: "other_vitamin_k_antagonist",
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
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
                              label: "Mechanical prosthetic heart valve",
                              value: "mechanical_prosthetic_heart_valve",
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
                {
                  label: "Antiplatelets",
                  value: "antiplatelets",
                  name: "antiplatelets",
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
                                    value: "severely_impaired_renal_function",
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