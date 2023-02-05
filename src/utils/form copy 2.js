export const form = {
  steps: [
    // {
    //   title: "Pre-assessment tools",
    //   parts: [
    //     {
    //       title: "Surgery-related",
    //       questions: [
    //         {
    //           type: "radio",
    //           required: true,
    //           label: "Timing of surgery",
    //           name: "timing_of_surgery",
    //           options: [
    //             {
    //               title: "Emergent non-cardiac surgery",
    //               value: "emergent_non_cardiac_surgery",
    //               particular: true,
    //             },
    //             {
    //               title: "Urgent non-cardiac surgery",
    //               value: "urgent_non_cardiac_surgery",
    //               particular: true,
    //             },
    //             {
    //               title: "Time-sensitive non-cardiac surgery",
    //               value: "time_sensitive_non_cardiac_surgery",
    //             },
    //             {
    //               title: "Elective non-cardiac surgery",
    //               value: "elective_non_cardiac_surgery",
    //               type: "radio",
    //               name: "elective_non_cardiac_surgery",
    //               required: true,
    //               options: [
    //                 {
    //                   title: "Possible to defer non-cardiac surgery",
    //                   value: "possible_to_defer_non_cardiac_surgery",
    //                 },
    //                 {
    //                   title: "Not possible to defer non-cardiac surgery",
    //                   value: "not_possible_to_defer_non_cardiac_surgery",
    //                 },
    //               ],
    //             },
    //           ],
    //         },
    //         {
    //           type: "select",
    //           required: true,
    //           label: "Type of surgery or intervention",
    //           name: "type_of_surgery_or_intervention",
    //           options: [
    //             {
    //               value: "Low surgical risk (<1%)",
    //               titles: [
    //                 "Breast",
    //                 "Dental",
    //                 "Endocrine: thyroid",
    //                 "Eye",
    //                 "Gynaecological: minor",
    //                 "Orthopaedic minor (meniscectomy)",
    //                 "Reconstructive",
    //                 "Superficial surgery",
    //                 "Urological minor: (transurethral resection of the prostate)",
    //                 "Video assisted thoracic surgery minor lung resection",
    //               ],
    //             },
    //             {
    //               value: "Intermediate surgical risk (1-5%)",
    //               titles: [
    //                 "Carotid asymptomatic (coronary endarterectomy or coronary artery stenting)",
    //                 "Carotid symptomatic (coronary endarterectomy)",
    //                 "Endovascular aortic aneurysm repair",
    //                 "Head or neck surgery",
    //                 "Intraperitoneal: splenectomy, hiatal hernia repair, cholecystectomy",
    //                 "Intrathoracic: non-major",
    //                 "Neurological or orthopaedic: major (hip and spine surgery)",
    //                 "Peripheral arterial angioplasty",
    //                 "Renal transplants",
    //                 "Urological or gynaecological: major",
    //               ],
    //             },
    //             {
    //               value: "High surgical risk (>5%)",
    //               titles: [
    //                 "Adrenal resection",
    //                 "Aortic and major vascular surgery",
    //                 "Carotid symptomatic (Carotid artery stenting)",
    //                 "Duodenal-pancreatic surgery",
    //                 "Liver resection, bile duct surgery ",
    //                 "Oesophagectomy",
    //                 "Open lower limb revascularization for acute limb ischaemia or amputation",
    //                 "Pneumonectomy (video-assisted thoracic surgery or open surgery)",
    //                 "Pulmonary or liver transplant",
    //                 "Repair of perforated bowel",
    //                 "Total cystectomy",
    //               ],
    //             },
    //           ],
    //         },
    //         {
    //           type: "select",
    //           required: true,
    //           label: "Bleeding risk",
    //           name: "bleeding_risk",
    //           options: [
    //             {
    //               value: "Minor bleeding risk",
    //               titles: [
    //                 "Cataract or glaucoma procedure",
    //                 "Dental procedures: extractions (1–3 teeth), periodontal surgery, implant positioning endodontic (root canal) procedures, subgingival scaling/cleaning",
    //                 "Endoscopy without biopsy or resection",
    //                 " Superficial surgery (e.g. abscess incision, small skin excisions/ biopsy)",
    //               ],
    //             },
    //             {
    //               value: "Low bleeding risk",
    //               titles: [
    //                 "Abdominal surgery: cholecystectomy, hernia repair, colon resection",
    //                 "Breast surgery",
    //                 "Complex dental procedures (multiple tooth extractions)",
    //                 "Endoscopy with simple biopsy",
    //                 "Gastroscopy or colonoscopy with simple biopsy",
    //                 "Large-bore needles procedures (e.g. bone marrow or lymph node biopsy)",
    //                 "Non-cataract ophthalmic surgery",
    //                 "Small orthopaedic surgery (foot, hand arthroscopy)",
    //               ],
    //             },
    //             {
    //               value: "High bleeding risk",
    //               titles: [
    //                 "Abdominal surgery with liver biopsy, extracorporeal shockwave lithotripsy",
    //                 "Extensive cancer surgery (e.g. pancreas, liver)",
    //                 "Neuraxial (spinal or epidural) anaesthesia",
    //                 "Neurosurgery (intracranial, spinal) ",
    //                 "Major orthopaedic surgery ",
    //                 "Procedures with vascular organ biopsy (kidney or prostate)",
    //                 "Reconstructive plastic surgery",
    //                 "Specific interventions (colon polypectomy, lumbar puncture, endovascular aneurysm repair)",
    //                 "Thoracic surgery, lung resection surgery",
    //                 " Urological surgery (prostatectomy, bladder tumour resection)",
    //                 "Vascular surgery (e.g. abdominal aortic aneuvrysm repair, vascular bypass)",
    //               ],
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //     {
    //       title: "Patient-related",
    //       questions: [
    //         {
    //           type: "input",
    //           input_type: "text",
    //           placeholder: "Enter patient's name",
    //           required: true,
    //           label: "Patient's name",
    //           name: "patient_name",
    //         },
    //         {
    //           type: "checkbox",
    //           required: false,
    //           label: "Cardiovascular risk factor",
    //           name: "cardiovascular_risk_factor",
    //           options: [
    //             {
    //               title: "Hypertension",
    //               value: "hypertension",
    //             },
    //             {
    //               title: "Diabetes",
    //               value: "diabetes",
    //             },
    //             {
    //               title: "Dyslipidemia",
    //               value: "dyslipidemia",
    //             },
    //             {
    //               title: "Smoking",
    //               value: "smoking",
    //             },
    //             {
    //               title: "Age greater than or equal to 65 years",
    //               value: "age_greater_than_65_years",
    //             },
    //             {
    //               title: "Family history of cardiovascular disease",
    //               value: "family_history_of_cardiovascular_disease",
    //               type: "checkbox",
    //               required: true,
    //               options: [
    //                 {
    //                   title:
    //                     "Myocardial infarction or sudden death <55 years with father or brother",
    //                   value:
    //                     "myocardial_infarction_or_sudden_death_less_than_55_years_with_father_or_brother",
    //                 },
    //                 {
    //                   title:
    //                     "Myocardial infarction or sudden death <65 years with mother or sister",
    //                   value:
    //                     "myocardial_infarction_or_sudden_death_less_than_65_years_with_mother_or_sister",
    //                 },
    //                 {
    //                   title:
    //                     "Cerebrovascular accident <45 years with parents or brother/sister",
    //                   value:
    //                     "cerebrovascular_accident_less_than_45_years_with_parents_or_brother_sister",
    //                 },
    //               ],
    //             },
    //           ],
    //         },
    //         {
    //           type: "title",
    //           label: "Antecedents",
    //           sections: [
    //             {
    //               type: "radio",
    //               required: true,
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //     {
    //       title: "Examination",
    //       questions: [
    //         {
    //           type: "checkbox",
    //           required: true,
    //           label: "Examination",
    //           name: "examination",
    //           options: [
    //             {
    //               title: "Asymptomatic",
    //               value: "asymptomatic",
    //               default: true,
    //             },
    //             {
    //               title: "Newly detected murmurs",
    //               value: "newly_detected_murmurs",
    //             },
    //             {
    //               title: "Chest pain",
    //               value: "chest_pain",
    //             },
    //             {
    //               title: "Symptoms/signs suggestive of cardio-vascular disease",
    //               value: "symptoms_signs_suggestive_of_cardiovascular_disease",
    //             },
    //             {
    //               title:
    //                 "Poor functional capacity (METs<4 –if the patient cannot climb two flights of stairs-)",
    //               value: "poor_functional_capacity",
    //             },
    //             {
    //               title: "High clinical risk factor : (RCRI >= 1)",
    //               value: "high_clinical_risk_factor",
    //               type: "checkbox",
    //               name: "high_clinical_risk_factor",
    //               required: true,
    //               options: [
    //                 {
    //                   title: "Ischaemic heart disease",
    //                   value: "ischaemic_heart_disease",
    //                 },
    //                 {
    //                   title: "Cerebrovascular disease",
    //                   value: "cerebrovascular_disease",
    //                 },
    //                 {
    //                   title: "History of congestive heart failure",
    //                   value: "history_of_congestive_heart_failure",
    //                 },
    //                 {
    //                   title: "Insulin therapy for diabetes",
    //                   value: "insulin_therapy_for_diabetes",
    //                 },
    //                 {
    //                   title: "Serum creatinine level ≥2 mg/dL",
    //                   value:
    //                     "serum_creatinine_level_greater_than_or_equal_to_2_mg_per_dL",
    //                 },
    //                 {
    //                   title: "High-risk surgery",
    //                   value: "high_risk_surgery",
    //                 },
    //               ],
    //             },
    //             {
    //               title: "abnormal ECG",
    //               value: "abnormal_ecg",
    //               type: "checkbox",
    //               name: "abnormal_ecg",
    //               required: true,
    //               options: [
    //                 {
    //                   title: "Pathological Q wave",
    //                   value: "pathological_q_wave",
    //                 },
    //                 {
    //                   title: "ST-T wave changes",
    //                   value: "st_t_wave_changes",
    //                 },
    //                 {
    //                   title: "Non-sinus rhythm",
    //                   value: "non_sinus_rhythm",
    //                 },
    //                 {
    //                   title: "Left bundle branch block",
    //                   value: "left_bundle_branch_block",
    //                 },
    //               ],
    //             },
    //             {
    //               title: "High NT-pro-BNP/BNP",
    //               value: "high_nt_pro_bnp_bnp",
    //             },
    //             {
    //               title: "Acute coronary syndrome",
    //               value: "acute_coronary_syndrome",
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   title: "Results",
    //   type: "results",
    //   parts: [
    //     {
    //       title: "Results",
    //       questions: [
    //         {
    //           type: "title",
    //           label: "Results",
    //           options: [
    //             {
    //               title: "Low risk",
    //               value: "low_risk",
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // },
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
                { title: "Beta-blockers", value: "beta_bolckers" },
                { title: "Amiodarone", value: "amiodarone" },
                { title: "Ivabradine", value: "ivabradine" },
                { title: "Statins", value: "statins" },
                {
                  title: "Renin–angiotensin–aldosterone system inhibitors",
                  value: "renin_angiotensin_aldosterone_system_inhibitors",
                  name: "renin_angiotensin_aldosterone_system_inhibitors",
                  type: "checkbox",
                  options: [
                    {
                      title: "To treat arterial hypertension",
                      value: "to_treat_arterial_hypertension",
                    },
                    {
                      title: "To treat heart failure",
                      value: "to_treat_heart_failure",
                    }
                  ],
                },
                {
                  title: "Calcium channel blockers",
                  value: "calcium_channel_blockers",
                },
                {
                  title: "Diuretics ",
                  value: "diuretics",
                  name: "diuretics",
                  type: "checkbox",
                  options: [
                    {
                      title: "To treat hypertension",
                      value: "to_treat_hypertension",
                    },
                    {
                      title: "To treat heart failure",
                      value: "to_treat_heart_failure",
                    },
                    {
                      title: "Other indications",
                      value: "other_indications",
                    }
                  ],
                },
                {
                  title: "Sodium–glucose co-transporter-2 inhibitors",
                  value: "sodium_glucose_co_transporter_2_inhibitors",
                },
                {
                  title: "Oral anticoagulants",
                  value: "oral_anticoagulants",
                  name: "oral_anticoagulants",
                  type: "radio",
                  options: [
                    {
                      title: "Non-vitamin K antagonist oral anticoagulants",
                      value: "non_vitamin_k_antagonist_oral_anticoagulants",
                      name: "non_vitamin_k_antagonist_oral_anticoagulants",
                      type: "radio",
                      options: [
                        {
                          title: "Apixaban",
                          value: "apixaban",
                        },
                        {
                          title: "Dabigatran",
                          value: "dabigatran",
                        },
                      ]
                    },
                    {
                      title: "Vitamin K antagonist",
                      value: "vitamin_k_antagonist",
                      name: "vitamin_k_antagonist",
                      type: "radio",
                      options: [
                        {
                          title: "Warfarin",
                          value: "warfarin",
                        },
                        {
                          title: "Acenocoumarol(Sintrom*)",
                          value: "acenocoumarol_sintrom",
                        },
                        {
                          title: "Other Vitamin K antagonist",
                          value: "other_vitamin_k_antagonist",
                        }
                      ]
                    }
                  ],
                }
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
