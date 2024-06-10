import 'bootstrap/dist/css/bootstrap.min.css';

import { TableFooter, TextField } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';

import {useState, useEffect} from 'react';
import axios from 'axios';


const BASEURL = 'http://localhost:5000'

async function getTasks(callback) {
  return axios.get(BASEURL + '/tasks').then((resp) => callback(resp.data)).catch((error) => console.log(error))
}

async function completeTask(id) {
  return axios.post(BASEURL + '/complete-task/' + id,).then((resp) => {}).catch((error) => console.log(error))
}

async function deleteTask(id) {
  return axios.delete(BASEURL + '/task/' + id).then((resp) => {}).catch((error) => console.log(error))
}

async function addTask(task) {
  return axios.post(BASEURL + '/add-task', task).then((resp) => {}).catch((error) => console.log(error))
}


function App() {
  const [rows, setRows] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    getTasks(setRows);
  }, []);

  const onAddNewTask = () => {
    addTask({title: newTitle, description: newDescription}).then(() => {
      setNewTitle('');
      setNewDescription('');
      getTasks(setRows);
    });
  }
  const onRemoveTask = (id) => {
    deleteTask(id).then(() => getTasks(setRows));
  }
  const onCompleteTask = (id) => {
    completeTask(id).then(() => getTasks(setRows));
  }

  return (
    <div className="App">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead   style={{backgroundColor:'#ddd'}}>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>title</TableCell>
            <TableCell>description</TableCell>
            <TableCell>completed</TableCell>
            <TableCell>action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length == 0 && <TableRow><TableCell colSpan={5} align="center">(No tasks)</TableCell></TableRow>}
          {rows.map((row) => (
            <TableRow
              key={row.id}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell >{row.title}</TableCell>
              <TableCell >{row.description}</TableCell>
              <TableCell >
                <ToggleButton
                  value="check"
                  selected={row.completed}
                  disabled={row.completed}
                  style={row.completed ? {backgroundColor: 'green', color: 'white' } : {}}
                  onChange={() => onCompleteTask(row.id)}
                >
                  <CheckIcon />
                </ToggleButton>
              </TableCell>
              <TableCell ><Button onClick={() => onRemoveTask(row.id)}>Delete task</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter style={{background: '#ddd'}}>
          <TableRow>
              <TableCell></TableCell>
              <TableCell><TextField label='title' value={newTitle} onChange={evt => {setNewTitle(evt.target.value);}} /> </TableCell>
              <TableCell><TextField label='description' value={newDescription} onChange={evt => setNewDescription(evt.target.value)} /></TableCell>
              <TableCell></TableCell>
              <TableCell><Button onClick={() => onAddNewTask()}>Add task</Button></TableCell>
              </TableRow>
            </TableFooter>
      </Table>
    </div>
  );
}

export default App;