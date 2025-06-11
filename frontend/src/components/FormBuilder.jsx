import React, { useState } from "react";
import axios from 'axios';
function FormBuilder() {
    const userId = localStorage.getItem("userId");
    const [formid, setFormid] = useState('');
    const [title, setTitle] = useState('');
    const [fields, setFields] = useState([]);
    const handleAddQuestion = () => {
        setFields([...fields, { question: "", type: "text", options: [] }]);
    }
    const handleField = (index, key, value) => {
        const updateFields = [...fields]; //here because mutated fields
        updateFields[index][key] = value;
        if (key === "type" && value !== "dropdown") {
            updateFields[index].options = [];
        }
        setFields(updateFields);
    }
    const handleDelete = (index) => {
        const updateFields = [...fields];
        updateFields.splice(index, 1);
        setFields(updateFields);
    }
    const handleOptionChange = (index, optionsString) => {
        const updatedFields = [...fields];
        updatedFields[index].options = optionsString.split(",").map(opt => opt.trim());
        setFields(updatedFields);
    }
    const handleSubmit = async () => {
        await axios.post('http://localhost:3000/createForm', {
            userId: userId,
            title: title,
            fields: fields
        }).then(function (response) {
            setFormid(response.data.form);
        }).catch(function (error) {
            console.log(error)
        })

    }
    return (<>
        <div className="mainForm">
            <h2>Create Your Form</h2>
            <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder="Enter the title of the form" name="" id="" />
            <br>
            </br> <button onClick={handleAddQuestion}>add question</button>
            {fields.map((field, index) => {
                return (<div className="main" key={index}>
                    <input type="text"
                        placeholder="enter your questions"
                        value={field.question}
                        name="" id=""
                        onChange={e => handleField(index, "question", e.target.value)}
                    />
                    <select value={field.type}
                        onChange={e => handleField(index, "type", e.target.value)}
                    >
                        <option value="text">Text</option>
                        <option value="email">Email</option>
                        <option value="number">Number</option>
                        <option value="dropdown">Dropdown</option>
                    </select>
                    {field.type === "dropdown" && (
                        <input
                            type="text"
                            placeholder="Enter options comma-separated"
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                        />
                    )}
                    <button onClick={e => handleDelete(index, 1)}>Delete question</button>
                    <br />
                </div>)

            })}
            <br />
            <button onClick={handleSubmit}>Submit Form</button>
        </div>
        {formid != '' && (<>
            <p>the form can now be shared with other user by using the code {formid}</p>
        </>)}
    </>)
}
export default FormBuilder