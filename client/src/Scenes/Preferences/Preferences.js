import axios from 'axios';
import React from 'react';
import { Form, FormGroup, Button, Input, Label, Row, Container } from 'reactstrap';


export default class Preferences extends React.Component{
  
  state = {
    docter: '',
    patient: ''
  }

  constructor(props) {
    super(props)

    this.handlePatientChange = this.handlePatientChange.bind(this)
    this.handleDocterChange = this.handleDocterChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handlePatientChange(e) {
    this.setState({
      patient: e.target.value
    })
  }
  
  handleDocterChange(e) {
    this.setState({
      docter: e.target.value
    })
  }
  
  async handleClick(e) {
    e.preventDefault()
    let docter = this.state.docter
    let patient = this.state.patient
    let payload = {docter, patient}
    const headers = {
      'Content-Type': 'application/json'
    }
    let res = await axios.post('/api/name', payload, {
      headers
    })
    console.log(res.data);
  }

  render() {
    return(
      <div className='preferences'>
      <Container>
          <Form>
            <FormGroup>
              <Label>Docter name</Label>
              <Input type='text' name='docter' onChange={this.handleDocterChange}></Input>
            </FormGroup>
            <FormGroup>
              <Label>Patient name</Label>
              <Input type='text' name='patient' onChange={this.handlePatientChange}></Input>
            </FormGroup>
            <Button type='submit' onClick={this.handleClick}>บันทึก</Button>
          </Form>
      </Container>
    </div>);
    }
}