import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fname:'',
      lname:'',
      email:'',
      phone:'',
      password:''
    }
  }
  
  onChangefName = (e) =>{
    this.setState({fname:e.target.value})
  }

  onChangelName = (e) =>{
    this.setState({lname:e.target.value})
  }

  onChangeEmail = (e) =>{
    this.setState({email:e.target.value})
  }

  onChangePhone = (e) =>{
    this.setState({phone:e.target.value})
  }

  onChangePassword = (e) =>{
    this.setState({password:e.target.value})
  }

  onSubmit = (e) =>{
    let { history } = this.props
    let ob = {
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password,
    }
    let olddata = localStorage.getItem('formdata');
    if(olddata==null){
      olddata = []
      olddata.push(ob)
      localStorage.setItem('formdata', JSON.stringify(olddata));
    }else{
      let oldArr = JSON.parse(olddata)
      oldArr.push(ob)
      localStorage.setItem("formdata", JSON.stringify(oldArr))
      console.log(oldArr,'hhg')
    }
    history.push({ pathname: "/login" });
  }

  render() {
    return (
      <div className='container'>
        <h1>Registration</h1>
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input type="text" className="form-control" value={this.state.fname} onChange={this.onChangefName} required />
        </div>
        <div className="form-group">
          <label>last Name</label>
          <input type="text" className="form-control" value={this.state.lname} onChange={this.onChangelName} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" value={this.state.email} onChange={this.onChangeEmail} required />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="tel" className="form-control" value={this.state.phone} onChange={this.onChangePhone} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" value={this.state.password} onChange={this.onChangePassword} required />
        </div>
        <button type="submit" className="btn btn-primary btn-block" onClick={this.props.onRegister}>Register</button>
      </form>
      </div>
    )
  }
}

export default Register;