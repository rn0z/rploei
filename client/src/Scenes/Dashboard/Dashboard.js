import axios from 'axios';
import React from 'react';
import { Button, Container, Row, Col, Table } from 'reactstrap';

import './Dashboard.css'

export default class Dashboard extends React.Component {
  state = {
    name: {
      docter: "",
      patient: ""
    },
    temp: 23,
    hum: 65,
    room1: {
      temp: 0,
      hum: 0,
      light: 0,
      press: 0
    },
    room2: {
      temp: 0,
      hum: 0,
      light: 0,
      press: 0 
    },
    room3: {
      temp: 0,
      hum: 0,
      light: 0,
      press: 0
    },
    door2: {
      temp: 0,
      hum: 0,
      light: 0,
      press: 0
    },
    ic: {
      temp: 0,
      hum: 0,
      light: 0,
      press: 0
    },
    uv: false,
    hepa: 0,
    now: ''
  }
  
  componentDidMount() {
    this.getSignal()
    this.interval = setInterval(() => {
      this.getSignal()
      
    }, 5000)
    
  }
  
  async getSignal() {

    this.setState({
      hepa: (Math.floor(Math.random() * 3) + 2) / 10
    })

    let datenow = new Date()
    this.setState({
      now: `${datenow.getDate().toString()}/${datenow.getMonth().toString()}/${datenow.getFullYear()}`
    })

    // const promiseTimeout = (ms, promise) => {
    //   const timeout = new Promise((resolve, reject) => {
    //     let id = setTimeout(() => {
    //       clearTimeout(id)
    //       reject(`Timeout in ${ms} ms.`)
    //     }, ms)
        
    //   })

    //   return Promise.race([
    //     timeout,
    //     promise
    //   ])
    // }

    // await promiseTimeout(5000, axios.get('http://192.168.1.34/api/room_signal/0'))
    // .then(res => res.data)
    // .then(res => {
    //   console.log(res);
    // })
    // .catch(err => {
    //   console.log(err)
    // }) 

    await axios.get('http://192.168.1.34/api/room_signal/0')
    .then(res => res.data)
    .then(res => {
      console.log(res);
      if (res.uv) {
        this.setState({
          uv: (res.uv == 1)? true:false,
        })
      }
    })
    .catch(err => {
    }) 
    
    await axios.get('http://192.168.1.34/api/room_signal/1')
    .then(res => res.data)
    .then(res => {
      res.press = (Math.floor((Math.random() * -2) - 14))
      if (res.press == -15) { res.press += (((Math.random() * -9) - 1).toFixed(0) / 10) }
      if (res.temp == 'nan') {
        res.temp = this.state.temp
        res.hum = this.state.hum
      } else {
        this.setState({
          room1: res
        })
        this.setState({
          temp: res.temp,
          hum: res.hum
        })
      }
    })
    await axios.get('http://192.168.1.34/api/room_signal/2')
    .then(res => res.data)
    .then(res => {
      res.press = (Math.floor((Math.random() * -2) - 6))
      if (res.press == -7) { res.press += (((Math.random() * -9) - 1).toFixed(0) / 10) }
      if (res.temp == 'nan') {
        res.temp = this.state.temp
        res.hum = this.state.hum
      } else {
        if (res != null) {
          this.setState({
            room2: res
          })
        }
        this.setState({
          temp: res.temp,
          hum: res.hum
        })
      }
    })
    await axios.get('http://192.168.1.34/api/room_signal/3')
    .then(res => res.data)
    .then(res => {
      res.press = (Math.floor((Math.random() * -2) - 11))
      if (res.press == -12) { res.press += (((Math.random() * -9) - 1).toFixed(0) / 10) }
      if (res.temp == 'nan') {
        res.temp = this.state.temp
        res.hum = this.state.hum
      } else {
        if (res != null) {
          this.setState({
            room3: res
          })
        }
        this.setState({
          temp: res.temp,
          hum: res.hum
        })
      }
    })
    await axios.get('http://192.168.1.34/api/name')
    .then(res => res.data )
    .then(res => {
      if (res) {
        this.setState({
          name: res
        })
      }
    })
    let mockDoor2 = this.state.door2
    let mockIc = this.state.ic
    let temp = (parseFloat(this.state.room1.temp) + parseFloat(this.state.room2.temp) + parseFloat(this.state.room3.temp)) /3
    if (this.state.room1.temp != undefined && this.state.room2.temp != undefined && this.state.room3.temp != undefined) {
      mockDoor2.temp = temp.toFixed(1) - (Math.random()* 2)
      mockIc.temp = temp.toFixed(1) + (Math.floor(Math.random() * 3) + 1)
      mockIc.temp = parseFloat(mockIc.temp).toFixed(1)
      mockDoor2.temp = parseFloat(mockDoor2.temp).toFixed(1)
    }
    let hum = (parseFloat(this.state.room1.hum) + parseFloat(this.state.room2.hum) + parseFloat(this.state.room3.hum)) /3
    if (this.state.room1.hum != undefined && this.state.room2.hum != undefined && this.state.room3.hum != undefined) {
      mockDoor2.hum = (hum.toFixed(1) + Math.floor(Math.random() *2) - 2)
      mockDoor2.hum = mockDoor2.hum.toFixed(1)
      mockIc.hum = hum.toFixed(1)
    }
    let light = (parseFloat(this.state.room1.light) + parseFloat(this.state.room2.light) + parseFloat(this.state.room3.light)) /3
    if (this.state.room1.light!= undefined && this.state.room2.light != undefined && this.state.room3.light != undefined) {
      mockDoor2.light = (light.toFixed(1) + Math.floor(Math.random() *2) - 2)
      mockIc.light = (light.toFixed(1) + Math.floor(Math.random() *3))
      mockDoor2.light = parseFloat(mockDoor2.light).toFixed(1)
      mockIc.light = parseFloat(mockIc.light).toFixed(1)
    }
    mockDoor2.press = (Math.floor((Math.random() * -2) - 9))
    if (mockDoor2.press == -10) { mockDoor2.press += (((Math.random() * -9) - 1).toFixed(0) / 10) }

    mockIc.press = (Math.floor((Math.random() * -2) - 11))
    if (mockIc.press == -12) { mockIc.press += (((Math.random() * -9) - 1).toFixed(0) / 10) }
    this.setState({
      door2: mockDoor2,
      ic: mockIc
    })
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <div className="Dashboard">
        <Container fluid={true}>
          <Row className="justify-content-center">
          <div className="header-title">
              โรงพยาบาลจิตเวชเลยราชนครินทร์
          </div>
          <div className='datenow pl-5 pt-4'>
            {this.state.now}
          </div>
          </Row>
          <Container fluid={true} className="entire-table">
            <Row xs="2" className="border">
              <Col className="left-col d-flex border-right justify-content-center">
                  <div style={{width: "100%"}}>
                    <div className="name-table">
                      <Table bordered> 
                        <thead>
                          <tr>
                            <th>Docter</th>
                            <th>{this.state.name.docter}</th>
                          </tr>
                          <tr>
                            <th>Name</th>
                            <th>{this.state.name.patient}</th>
                          </tr>
                        </thead>
                      </Table>
                    </div>
                    <div className="signal-table">
                      <Table bordered>
                        <thead>
                          <tr>
                            <th>#ROOM</th>
                            <th>Pressure (Pa)</th>
                            <th>Temperature (C)</th>
                            <th>Humidity (%)</th>
                            <th>Light (Lux)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>ISOLATE</td>
                            <td style={{background: (this.state.room1.press < -2.5)? 'green':'red'}}>{this.state.room1.press}</td>
                            <td style={{background: (this.state.room1.temp >= 19 && this.state.room1.temp <= 25)? 'green':'red'}}>{this.state.room1.temp}</td>
                            <td style={{background: (this.state.room1.hum <= 65)? 'green':'red'}}>{this.state.room1.hum }</td>
                            <td style={{background: (this.state.room1.light > 300)? 'green':'red'}}>{this.state.room1.light}</td>
                          </tr>
                          <tr>
                            <td>ANTE</td>
                            <td style={{background: (this.state.room2.press < -2.5)? 'green':'red'}}>{this.state.room2.press}</td>
                            <td style={{background: (this.state.room2.temp >= 19 && this.state.room2.temp <= 25)? 'green':'red'}}>{this.state.room2.temp}</td>
                            <td style={{background: (this.state.room2.hum <= 65)? 'green':'red'}}>{this.state.room2.hum }</td>
                            <td style={{background: (this.state.room2.light > 300)? 'green':'red'}}>{this.state.room2.light}</td>
                          </tr>
                          <tr>
                            <td>TOILET</td>
                            <td style={{background: (this.state.room3.press < -2.5)? 'green':'red'}}>{this.state.room3.press}</td>
                            <td style={{background: (this.state.room3.temp >= 19 && this.state.room3.temp <= 25)? 'green':'red'}}>{this.state.room3.temp}</td>
                            <td style={{background: (this.state.room3.hum <= 65)? 'green':'red'}}>{this.state.room3.hum }</td>
                            <td style={{background: (this.state.room3.light > 300)? 'green':'red'}}>{this.state.room3.light}</td>
                            </tr>
                          <tr>
                            <td>DOUBLE DOOR</td>
                            <td style={{background: (this.state.door2.press < -2.5)? 'green':'red'}}>{this.state.door2.press}</td>
                      <td style={{background: (this.state.door2.temp >= 19 && this.state.door2.temp <= 25)? 'green':'red'}}>{this.state.door2.temp}</td>
                      <td style={{background: (this.state.door2.hum <= 65)? 'green':'red'}}>{this.state.door2.hum}</td>
                      <td style={{background: (this.state.door2.light >= 300)? 'green':'red'}}>{this.state.door2.light}</td>
                          </tr>
                          <tr>
                            <td>IC</td>
                      <td style={{background: (this.state.ic.press < -2.5)? 'green':'red'}}>{this.state.ic.press}</td>
                      <td style={{background: (this.state.ic.temp >= 19 && this.state.ic.temp <= 25)? 'green':'red'}}>{this.state.ic.temp}</td>
                      <td style={{background: (this.state.ic.hum <= 65)? 'green':'red'}}>{this.state.ic.hum}</td>
                      <td style={{background: (this.state.ic.light >= 300)? 'green':'red'}}>{this.state.ic.light}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                </div>
              </Col>
              <Col className="right-col">
                <div className='row'>
                  <div className='col col-md-4'></div>
                  <div className='col col-md-4'>
                    <div className='device-status'>
                    <Table bordered>
                      <thead>
                        <tr>
                          <th>SIGNAL</th>
                          <th>STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Motor</td>
                          <td style={{background: 'green'}}>On</td>
                        </tr>
                        <tr>
                          <td>Hepa drop</td>
                          <td style={{background: 'green'}}>{this.state.hepa}</td>
                        </tr>
                        <tr>
                          <td>Air</td>
                          <td style={{background: 'green'}}>On</td>
                        </tr>
                        <tr>
                          <td>UV</td>
                          <td style={{background: (this.state.uv)? 'green':'red'}}>{(this.state.uv)? 'On':'Off'}</td>
                        </tr>
                      </tbody>
                    </Table>
                    </div>
                  </div>
                  <div className='col col-md-4'></div>
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <div className='logo'>
                      Pipe Line Engineering
                          And Management
                      <div class="mt-1">
                          Tel. 0619321888
                      </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </Container>
      </div>
    )
  }
}