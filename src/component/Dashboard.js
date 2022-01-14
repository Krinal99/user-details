import React from 'react';
import "./style.css";
// import "bootstrap/dist/css/bootstrap.css";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from "react-bootstrap-table2-paginator";
import { Type } from 'react-bootstrap-table2-editor';
import cellEditFactory from 'react-bootstrap-table2-editor';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
  
const columns = [
    {
      dataField: "id",
      text: "User Id",
      editable: false,
      
    },
    {
      dataField: "name",
      text: "User Name",
      editable: false,
    },
    {
      dataField: "Email",
      text: "User Email",
      editable: false,
    },
    {
      dataField: "Action",
      text: 'Action',
      editor:{
            type: Type.SELECT,
            options: [{  
              value: 'Edit User',
              label: 'Edit User'
            }, {
              value: 'Delete User',
              label: 'Delete User'
            }]
      }
    }
  ];

  toast.configure()

class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.state={
            loginUser:this.props.location.user,
            name:'',
            job:'',
            items: [],
            dataSource:[],
            addUserData:null,
            showModal:false,
            DataisLoaded: false,
            updateuserdetail:null,
            editableName:'',
            editableEmail:'',
            EditShowModal:false,
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit =this.handleSubmit.bind(this);
        this.onChangeJob = this.onChangeJob.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.addUser = this.addUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.handleChangeCellEdit = this. handleChangeCellEdit.bind(this);
        this.handleEditClose = this.handleEditClose.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.onChangeEditName =this.onChangeEditName.bind(this);
        this.onEditChangeEmail = this.onEditChangeEmail.bind(this);

    }

    componentDidMount(){
        this.fetchUserData();
                         
    }

    componentDidUpdate(prevProps,prevState){
        if(this.state.items != prevState.items){
           this.getdata(this.state.items);
        }
    }

    fetchUserData = () => {
        fetch("https://reqres.in/api/users?page=1")
            .then((res) => res.json())
            .then((json) => {
                
                this.setState({
                    items: json,
                    DataisLoaded: true
                } ,() => {
                    // this.getdata(this.state.items); 
                });
            })
    }

    getdata = (items) => {
        const data = [];
        items.data.map((user) => {
            data.push({ id: user.id, name: user.first_name  , Email: user.email ,Action:"Select action"})
            this.setState({
                dataSource: data
            })
        } )
    }

    handleAdd = () => {
        this.setState({showModal:true})
    }
    handleClose = () => {
        this.setState({showModal:false})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let userObject = {
            name: this.state.name,
            job: this.state.job,
        }
        this.setState({addUserData: userObject},() => {
            this.addUser(userObject)
        })
    }
    addUser = (userObject) => {
        axios.post('https://reqres.in/api/users', userObject)
        .then(response => 
            toast("Successfully User Added")
        )
        .catch(error =>
            toast("Failed")
        )
        this.setState({showModal:false})
    }

    handleEditClose = () => {
        this.setState({EditShowModal:false})
    }
    updateUser = (userdetails) => {
        let id = userdetails.id
        let user = {
            name: userdetails.name,
            id : userdetails.id,
            email: userdetails.email,
        }
        axios.put('https://reqres.in/api/users/',{ params: { id }} , user)
        .then(response => toast("Successfully Updated"))
        .catch(error => {
           toast("falied")
        });
        this.setState({
            EditShowModal:false
        })
    }

    onChangeName = (e) =>{
        this.setState({name:e.target.value})
    }
    onChangeJob = (e) =>{
      this.setState({job:e.target.value})
    }
    
    handleLogout = (e) => {
        let { history } = this.props;
        history.push({ pathname: "/login" })
    }

    handleChangeCellEdit(oldValue, newValue, row, column){
        let indexOfSelectedItem = -1;
        column.editor.options.forEach((item, idx) => {
          if (newValue === item.value) {
                if(newValue === "Edit User"){

                // this.updateUser(row);
                this.setState({
                    updateuserdetail:row,
                    editableName: row.name,
                    editableEmail:row.Email,
                    id: row.id,
                }, () => {
            
                    this.setState({EditShowModal:true,})
                })
                }
            // indexOfSelectedItem = idx;
          }
        });
        if (indexOfSelectedItem > -1) {
          console.log(indexOfSelectedItem);
        }
    }

    headerlayout = () => {
        return(
            <>
            <div className="header">
                <div className='d-flex justify-content-end'>
                    <span><h3>{this.state.loginUser}</h3></span>
                    <span><button className='btn btn-info' style={{padding:"10px 20px" }} onClick={this.handleLogout}>Logout</button></span>
                </div>
            </div>
            </>
        )
    }
    
    onChangeEditName = (e) => {
        this.setState({editableName: e.target.value})
    }

    onEditChangeEmail = (e) => {
        this.setState({editableEmail: e.target.value})
    }

    handleEdit = (e) => {
        e.preventDefault()
        console.log("e",e);
        let userObject = {
            name: this.state.editableName,
            Email: this.state.editableEmail,
        }
        
            this.updateUser(userObject)
    
    }

  render() {
      console.log("hello")
    return (
      <div className="container-fluid">

        <div className="wrapper">
            {this.headerlayout()}
              
            <BootstrapTable
                bootstrap4
                keyField="id"
                data={this.state.dataSource}
                columns={columns}
                cellEdit={ cellEditFactory({ 
                            mode: 'click',
                            blurToSave: true,
                            afterSaveCell: this.handleChangeCellEdit}) }
                pagination={paginationFactory({ sizePerPage: 5 })}
            />

            <div>
                <button className='btn btn-outline-info' onClick={this.handleAdd}>Add User</button>
            </div>

            <Modal show={this.state.showModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group className="mb-3" >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" onChange={this.onChangeName} required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Job</Form.Label>
                    <Form.Control type="text" placeholder="Job" onChange={this.onChangeJob} required />
                  </Form.Group>
                  <button type="submit" className='btn btn-primary'>
                    ADD
                  </button>
                </Form>
                </Modal.Body>
            </Modal>

            {/* edit user modal */}
            <Modal show={this.state.EditShowModal} onHide={this.handleEditClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={this.handleEdit}>
                  <Form.Group className="mb-3" >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" defaultValue={this.state.editableName} onChange={this.onChangeEditName} required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" value={this.state.editableEmail} onChange={this.onEditChangeEmail} required />
                  </Form.Group>
                  <button type="submit" className='btn btn-primary'>
                    Edit
                  </button>
                </Form>
                </Modal.Body>
            </Modal>
          </div>
        </div>
    )
  }
}

export default Dashboard;
