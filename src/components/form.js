import React, {Fragment, useState} from 'react';
import ReactDOM from 'react';
import axios from 'axios';

function Table({tableData, handleReset}){

    return(
        <div className='table-wrap'>
            <table className="table table-striped">
                <caption>Table</caption>
                <thead>

                    <tr>
                        <th>Name</th>
                        <th>Lastname</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                {
                    tableData.map((data, index)=>{
                        return(
                            <tr key={index}>
                                <td>{data.name}</td>
                                <td>{data.lastname}</td>
                                <td>{data.email}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}


function Form({handleChange, formInputData, handleSubmit}){
    return(
        <form>   
            <h3>Form</h3>         
            <div className="form-row">
                <div className="col">
                    <input type="text" onChange={handleChange} value={formInputData.name} name="name" className="form-control" placeholder="Name" />
                </div>
                <div className="col">
                    <input type="text" onChange={handleChange} value={formInputData.lastname} name="lastname" className="form-control" placeholder="Lastname" />
                </div>
            </div>
            <div className="form-row">
                <div className="col">
                    <input type="email" onChange={handleChange} value={formInputData.email} name="email" className="form-control" placeholder="Email" />
                </div>
            </div>
            <div className="form-row">
                <div className="col">
                    <input id="send-btn" type="submit" onClick={handleSubmit} className="btn" />
                </div>
            </div>
        </form>
     
      
    )
}
    
function Main(){
        const [tableData, setTableData] = useState([])
        const [formInputData, setformInputData] = useState(
            {
            name:'',
            lastname:'',
            email:''
           }
           //this.handleChange = this.handleChange.bind(this),
           //this.addTask = this.addTask.bind(this)
        );

        //Manage records
        const addTask = (e) => {
            e.preventDefault();
            if(this.state._id) {
              fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT', //Update record
                body: JSON.stringify({
                    name: this.state.title,
                    lastname: this.state.lastname,
                    email: this.state.email
                }),
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
              })
                .then(res => res.json())
                .then(data => {
                    alert('record updated')
                    this.setState({_id: '', title: '', description: ''});
                  this.fetchTasks();
                });
            } else {
              fetch('/api/tasks', {
                method: 'POST', //Add record
                body: JSON.stringify(this.state),
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
              })
                .then(res => res.json())
                .then(data => {
                  console.log(data);
                  alert('record saved')
                  this.setState({name: '', lastname: '', email: ''});
                  this.fetchTasks();
                })
                .catch(err => console.error(err));
            }
        
          }
        
          const deleteTask = (id) => {
              fetch(`/api/tasks/${id}`, {
                method: 'DELETE', //Delete record
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
              })
                .then(res => res.json())
                .then(data => {
                  console.log(data);
                  alert('record deleted')
                  this.fetchTasks();
                });            
          }
        
          const editTask = (id) => {
            fetch(`/api/tasks/${id}`)
              .then(res => res.json())
              .then(data => {
                console.log(data);
                this.setState({
                    _id: this.state._id,
                    name: this.state.title,
                    lastname: this.state.lastname,
                    email: this.state.email
                });
              });
          }
        
          const componentDidMount = () => {
            this.fetchTasks();
          }
        
          const fetchTasks = () => {
            fetch('/api/tasks')
              .then(res => res.json())
              .then(data => {
                this.setState({tasks: data});
                console.log(this.state.tasks);
              });
          }        



        const handleChange=(ev)=>{  
            const newInput = (data)=>({...data, [ev.target.name]:ev.target.value})
           setformInputData(newInput)
        }
         
        const handleSubmit= (ev) =>{
            ev.preventDefault();

            if(formInputData.name =='' || formInputData.lastname =='' || formInputData.email =='' ){
                alert('You must fill all inputs')
            }else{
                const newData = (data)=>([...data, formInputData])
                setTableData(newData);
                const emptyInput= {name:'', lastname:'', email:''}
                setformInputData(emptyInput)

                //USING AXIOS AND FREE ONLINE API TO MAKE API CALL
                const url = 'https://reqres.in/api/users';
                axios.post(url, {
                    name: formInputData.name,
                    lastname: formInputData.lastname,
                    email: formInputData.email
                })
                .then(response => {
                    console.log('API response:')
                    console.log(response.data)});
                }
        }

        return(
            <React.Fragment>
            <div className="container">
            <div className="row">
                <div className="col-sm">
                <Form handleChange={handleChange} formInputData={formInputData} handleSubmit={handleSubmit}/>
                </div>
                <div className="col-sm">
                <Table tableData={tableData}/>
                </div>
            </div>
           </div>
            </React.Fragment>
        );

    }

export {Main, Form, Table};