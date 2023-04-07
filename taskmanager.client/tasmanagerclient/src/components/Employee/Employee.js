import React, { useState, useEffect, useContext } from 'react';
import './EmployeeStyle.css';
import context from 'react-bootstrap/esm/AccordionContext';
import AuthContext from '../../store/auth-context'


const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const authCtx = useContext(AuthContext);
  const userId = localStorage.getItem('id');
  useEffect(() => {
    fetch(`https://localhost:44309/UserTasks?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        setTasks(data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleStatusChange = (id, status) => {
    fetch(`https://localhost:44309/api/Task`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id,
        status: status})
    })
      .then(res => res.json())
      .then(data => {
        console.log('Response from server:', data);
        const updatedTasks = tasks.map(task => {
          if (task.id === data.id) {
            return data;
          } else {
            return task;
          }
        });
        setTasks(updatedTasks);
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="task-table-container">
      <table>
        <thead>
          <tr>
            <th>Task name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td>{task.description}</td>
              {task.status == 0 && <td>Processing</td>}
              {task.status == 1 && <td>In-Progress</td>}
              {task.status == 2 && <td>Done</td>}
              
              <td>
                {task.status === 0 && (
                  <>
                    <button onClick={() => handleStatusChange(task.id, 2)}>Done</button>
                    <button onClick={() => handleStatusChange(task.id, 1)}>In-Progress</button>
                  </>
                )}
                {task.status === 1 && (
                  <>
                    <button onClick={() => handleStatusChange(task.id, 2)}>Done</button>
                    <button onClick={() => handleStatusChange(task.id, 0)}>Processing</button>
                  </>
                )}
                {task.status === 2 && (
                    <>
                    <button onClick={() => handleStatusChange(task.id, 1)}>In-Progress</button>
                    <button onClick={() => handleStatusChange(task.id, 0)}>Processing</button>
                    </>
                  
                  
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
