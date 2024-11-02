import axios from "axios";


export const GetAssociatedSymptomsDiagnosis =async (symptoms, diagnosis) => {
    const AI_API_URL = `${import.meta.env.VITE_AI_API_URL}`;
    var aiAxios= axios.create({
        baseURL: AI_API_URL,
        withCredentials:false,
        headers: {  
            'Content-Type': 'application/json; application/javascript',
        }
    });
  return await aiAxios
        .post(
            `/ddx/predict`,
            {
                input_symptoms: symptoms.map((symptom) => symptom.name),
                input_diagnoses: diagnosis.map((diag) => diag.name),
                n_diseases: 6,
                n_symptoms: 6,
                min_symptoms: 2,
            },{
                timeout:50000
            }
        ).then((response)=>{
            if (response.status == 200) {
                return response.data;
            }
            return;
        }).catch((err) => {
                console.log("axios ai error ",err);
            });
};