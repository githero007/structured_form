import React, { useState, useEffect } from "react";
import axios from 'axios';
import socket from "./Socket";
import { Link, useNavigate } from "react-router";
import { z } from 'zod';
import '../css/FormRender.css'
function FormRender() {
    const [fields, setFields] = useState([]);
    const [formid, setFormid] = useState();
    const [ans, setAns] = useState();
    const [flag, setFlag] = useState(0);
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();
    let fetchedFields;
    const handleForm = async () => {
        console.log(formid);
        await axios.post('https://structured-form.onrender.com/getform', {
            formId: formid
        })
            .then(function (response) {
                fetchedFields = response.data.form.fields;
                setFields(fetchedFields);
                console.log(fields);
                setFlag(1);
                socket.emit("joinForm", formid);
            }).catch(function (error) {
                console.log(error);
            })
    }
    socket.on('realChanges', async (answer, index) => {
        const updated = [...fields];
        updated[index].answer = answer;
        setFields(updated);
    })
    const handleAnswer = async (answer, index, questionId) => {
        const updated = [...fields];
        console.log(userId);
        socket.emit('editField', answer, index, questionId, userId);
        console.log(index);
        updated[index].answer = answer;
        setFields(updated);
    }
    const handleSubmit = async () => {
        await axios.post('https://structured-form.onrender.com/submit', {
            formId: formid,
            form: fields
        }).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
        })
    }
    const handleLock = async (questionId) => {
        console.log('questionId has been locked', questionId);
        socket.emit('lockField', questionId, userId);
    }
    socket.on('lockenable', async (changes, index) => {
        const update = [...fields];
        update[index][answer] = changes;
        setField(update);
    })

    return (<div className="form-container">
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
                        <h4>{question.question}(expected response ={question.type})</h4>
                        {question.type === "dropdown" ? (
                            <select
                                value={question.answer}
                                onChange={(e) => handleAnswer(e.target.value, index, question._id, question.type)}
                            >
                                <option value="">Select an option</option>
                                {question.options?.map((option, i) => (
                                    <option key={i} value={option}>{option}</option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type="text"
                                placeholder="enter your answer"
                                value={question.answer}
                                onChange={(e) => handleAnswer(e.target.value, index, question._id, question.type)}
                                name="" id=""
                            />
                        )}
                        <button onClick={e => handleLock(question._id)}> lock option</button>
                    </div>
                )
            })}

        </>)}
        <button className="submit-btn" onClick={handleSubmit}>SubmitForm</button>

    </div>)

}
export default FormRender;