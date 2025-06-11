import React, { useState, useEffect } from "react";
import axios from 'axios';
function FormRender() {
    const [fields, setFields] = useState([]);
    const [formid, setFormid] = useState();
    const [ans, setAns] = useState();
    const [flag, setFlag] = useState(0);
    let fetchedFields;
    const handleForm = async () => {
        console.log(formid);
        await axios.post('http://localhost:3000/getform', {
            formId: formid
        })
            .then(function (response) {
                fetchedFields = response.data.form.fields;
                setFields(fetchedFields);
                console.log(fields);
                setFlag(1);
            }).catch(function (error) {
                console.log(error);
            })
    }
    const handleAnswer = async (answer, index) => {
        const updated = [...fields];
        console.log(index);
        updated[index].answer = answer;
        setFields(updated);
    }
    return (<>
        {flag == 0 && (<div className="getForm">
            <input type="text"
                value={formid}
                placeholder="enter the formId"
                name="" id=""
                onChange={e => setFormid(e.target.value)} />
            <br />
            <button onClick={handleForm}>Fetch Form </button>
        </div>)}
        {fields.length != 0 && (<>
            {console.log(fields)}
            {fields.map((question, index) => {
                return (
                    <div key={index}>
                        <h4>{question.question}</h4>
                        <input type="text"
                            placeholder="enter your answer"
                            value={question.answer}
                            onChange={(e) => handleAnswer(e.target.value, index)}
                            name="" id="" />
                    </div>)
            }

            )}
        </>)}
        <button>Submit Form</button>
    </>)

}
export default FormRender;