import React, { useState, useEffect } from "react";
import "./AdminTable.css";

const initialTaskData = {
  taskName: "",
  taskDescription: "",
  userName: "",
  userId: ""
};

const AdminTable = () => {
  const [taskData, setTaskData] = useState(initialTaskData);
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    fetch("https://localhost:44309/api/Task")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  useEffect(() => {
    fetch("https://localhost:44309/api/User")
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (editTaskId === null) {
      fetch("https://localhost:44309/api/Task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name: taskData.taskName,
        description: taskData.taskDescription,
        userId: taskData.userId}),
      })
        .then((res) => res.json())
        .then((data) => setTasks([...tasks, data]));
    } else {
      fetch(`https://localhost:44309/api/Task`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name: taskData.taskName,
        description: taskData.taskDescription,
    userId: taskData.userId,
id: editTaskId}),
      })
        .then((res) => res.json())
        .then((data) => {
          const editedTasks = [...tasks];
          editedTasks[editTaskId] = data;
          setTasks(editedTasks);
        });
      setEditTaskId(null);
    }
    setTaskData(initialTaskData);
  };

  const handleEditClick = (index) => {
    setTaskData(tasks[index]);
    setEditTaskId(index);
  };

  const handleDeleteClick = (index) => {
    fetch(`https://localhost:44309/api/Task/?taskId=${tasks[index].id}`, {
      method: "DELETE",
    })
      .then(() => {
        const filteredTasks = tasks.filter((task, i) => i !== index);
        setTasks(filteredTasks);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <h1>Task Table</h1>
      <table className="task-table">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Task Description</th>
            <th>Employee Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.name}</td>
              <td>{task.description}</td>
              <td>{task.userName}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEditClick(index)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteClick(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form className="task-form" onSubmit={handleFormSubmit}>
        <label htmlFor="taskName">Task Name:</label>
        <input
          type="text"
          id="taskName"
          name="taskName"
          value={taskData.taskName}
          onChange={handleInputChange}/>
          <label htmlFor="taskDescription">Task Description:</label>
          <input
                 type="text"
                 id="taskDescription"
                 name="taskDescription"
                 value={taskData.taskDescription}
                 onChange={handleInputChange}
               />
          <label htmlFor="employeeName">Employee Name:</label>
              <select
                  id="employeeName"
                  name="userId"
                  value={taskData.userId}
                  onChange={handleInputChange}
               >
                  <option value="">Select Employee</option>
                  {employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                          {employee.userName}
                      </option>
                  ))}
              </select>

          <button type="submit">{editTaskId === null ? "Add" : "Update"}</button>
          </form>
          </>
          );
          };
          
          export default AdminTable;
          
          
          
          
          