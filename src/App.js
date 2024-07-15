import React, { useEffect, useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddSubjectForm from './data';
import EditSubjectForm from "./Heading"; // Import AddSubjectForm component

const fetchSubjects = () => {
    // Fetch data from API
    return fetch("http://localhost:8070/api/subjects")
        .then((response) => response.json())
        .catch((error) => console.error(error));
};

const DataTable = () => {
    const [data, setData] = useState([]);
    const [editingSubject, setEditingSubject] = useState(null);

    useEffect(() => {
        fetchSubjects()
            .then((data) => {
                setData(data);
            })
            .catch((error) => console.error(error));
    }, []);

    const handleAddSubject = (newSubject) => {
        setData([...data, newSubject]);
    };

    const deleteSubject = async (code) => {
        try {
            await axios.delete(`http://localhost:8070/api/subjects/${code}`);
            setData(data.filter(subject => subject.code !== code));
        } catch (error) {
            console.error('Error deleting subject:', error);
        }
    };

    const editSubject = (subject) => {
        setEditingSubject(subject);
    };

    const updateSubject = async (updatedSubject) => {
        try {
            const response = await axios.put(`http://localhost:8070/api/subjects/${updatedSubject.code}`, updatedSubject);
            const updatedData = data.map(subject => {
                if (subject.code === updatedSubject.code) {
                    return response.data; // Use updated data from server
                }
                return subject;
            });
            setData(updatedData);
            setEditingSubject(null); // Clear editing state
        } catch (error) {
            console.error('Error updating subject:', error);
        }
    };

    return (
        <div className="container mt-5">
            {/* AddSubjectForm component */}
            <AddSubjectForm onAddSubject={handleAddSubject} />

            <h2 className="mt-4 mb-4">Subjects Data</h2>
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                <tr>
                    <th scope="col">Code</th>
                    <th scope="col">Name</th>
                    <th scope="col">Credit</th>
                    <th style={{
                        width: "150px"
                    }} scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {data.map((subject, index) => (
                    <tr key={index}>
                        <td>{subject.code}</td>
                        <td>{subject.name}</td>
                        <td>{subject.credit}</td>
                        <td>
                            <button className="btn btn-primary btn-sm me-2" onClick={() => editSubject(subject)}>Edit</button>
                            <button className="btn btn-danger btn-sm" onClick={() => deleteSubject(subject.code)}>Delete</button>
                        </td>
                    </tr>
                ))}
                {data.length === 0 && (
                    <tr>
                        <td colSpan="4" className="text-center">No data available</td>
                    </tr>
                )}
                </tbody>
            </table>

            {/* EditSubjectForm component */}
            {editingSubject && (
                <EditSubjectForm subject={editingSubject} onUpdateSubject={updateSubject} />
            )}
        </div>
    );
};

export default DataTable;
