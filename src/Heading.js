import React, { useState } from "react";

const EditSubjectForm = ({ subject, onUpdateSubject, onCancel }) => {
    const [name, setName] = useState(subject ? subject.name : '');
    const [credit, setCredit] = useState(subject ? subject.credit : '');

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedSubject = {
            ...subject,
            name: name,
            credit: credit
        };
        onUpdateSubject(updatedSubject);
    };

    if (!subject) {
        return null; // Nếu subject không tồn tại, có thể trả về null hoặc hiển thị một thông báo lỗi
    }

    return (
        <div className="mt-4">
            <h3>Edit Subject</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="credit" className="form-label">Credit:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="credit"
                        value={credit}
                        onChange={(e) => setCredit(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary me-2">Update</button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default EditSubjectForm;
