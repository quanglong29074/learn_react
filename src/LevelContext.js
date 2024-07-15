import React, { useState } from "react";
import axios from 'axios';

const AddSubjectForm = ({ onAddSubject }) => {
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [credit, setCredit] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8070/api/subjects', {
                code,
                name,
                credit
            });

            // Trigger parent component callback to update subject list
            onAddSubject(response.data);

            // Clear form fields after successful submission
            setCode('');
            setName('');
            setCredit('');
        } catch (error) {
            console.error('Error adding subject:', error);
        }
    };

    return (
        <div className="mt-4">
            <h2>Add New Subject</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="code" className="form-label">Code</label>
                    <input type="text" className="form-control" id="code" value={code} onChange={(e) => setCode(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="credit" className="form-label">Credit</label>
                    <input type="number" className="form-control" id="credit" value={credit} onChange={(e) => setCredit(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Add Subject</button>
            </form>
        </div>
    );
};

export default AddSubjectForm;