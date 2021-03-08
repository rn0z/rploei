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
    uv: false
  }

  componentDidMount() {
    this.getSignal()
    this.interval = setInterval(() => {
    this.getSignal()

    }, 1000)

  }

  async getSignal() {
      await axios.get('http://localhost:5000/api/room_signal/0')
      .then(res => res.data)
      .then(res => {
        if (res.uv) {
          this.setState({
            uv: (res.uv == 1)? true:false,
          })
        }
      })
      await axios.get('http://localhost:5000/api/room_signal/1')
      .then(res => res.data)
      .then(res => {
        if (res) {
          this.setState({
            room1: res
          })
        }
      })
      await axios.get('http://localhost:5000/api/room_signal/2')
      .then(res => res.data)
      .then(res => {
        if (res) {
          this.setState({
            room2: res
          })
        }
      })
      await axios.get('http://localhost:5000/api/room_signal/3')
      .then(res => res.data)
      .then(res => {
        if (res) {
          this.setState({
            room3: res
          })
        }
      })
      await axios.get('http://localhost:5000/api/name')
      .then(res => res.data )
      .then(res => {
        if (res) {
          this.setState({
            name: res
          })
        }
      })
      let door2 = {
        temp:  (this.state.room1.temp + this.state.room2.temp + this.state.room3.temp) /3,
        hum:   (this.state.room1.hum + this.state.room2.hum + this.state.room3.hum) /3,
        light: (this.state.room1.light + this.state.room2.light + this.state.room3.light) /3,
        press: (this.state.room1.press + this.state.room2.press + this.state.room3.press ) /3,
      }
      let ic = {
        temp:  (this.state.room1.temp + this.state.room2.temp + this.state.room3.temp) /3,
        hum:   (this.state.room1.hum + this.state.room2.hum + this.state.room3.hum) /3,
        light: (this.state.room1.light + this.state.room2.light + this.state.room3.light) /3,
        press: (this.state.room1.press + this.state.room2.press + this.state.room3.press) /3,
      }
      this.setState({
        door2: door2,
        ic: ic
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
            <h1>
              โรงพยาบาลจิตเวชเลยราชนครินทร์
            </h1>
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
                            <th>Paitent</th>
                            <th>{this.state.name.patient}</th>
                          </tr>
                        </thead>
                      </Table>
                    </div>
                    <div className="signal-table">
                      <Table bordered>
                        <thead>
                          <tr>
                            <th>SIGNAL</th>
                            <th>ISOLATE ROOM</th>
                            <th>ANTE ROOM</th>
                            <th>TOILET</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Pressure</td>
                            <td style={{background: (this.state.room1.press > 10)? 'green':'red'}}>{this.state.room1.press}</td>
                            <td style={{background: (this.state.room2.press > 10)? 'green':'red'}}>{this.state.room2.press}</td>
                            <td style={{background: (this.state.room3.press > 10)? 'green':'red'}}>{this.state.room3.press}</td>
                          </tr>
                          <tr>
                            <td>Temperature</td>
                            <td style={{background: (this.state.room1.temp > 10)? 'green':'red'}}>{this.state.room1.temp}</td>
                            <td style={{background: (this.state.room2.temp > 10)? 'green':'red'}}>{this.state.room2.temp}</td>
                            <td style={{background: (this.state.room3.temp > 10)? 'green':'red'}}>{this.state.room3.temp}</td>
                          </tr>
                          <tr>
                            <td>Humidity</td>
                            <td style={{background: (this.state.room1.hum > 10)? 'green':'red'}}>{this.state.room1.hum }</td>
                            <td style={{background: (this.state.room2.hum > 10)? 'green':'red'}}>{this.state.room2.hum }</td>
                            <td style={{background: (this.state.room3.hum > 10)? 'green':'red'}}>{this.state.room3.hum }</td>
                            </tr>
                          <tr>
                            <td>Light</td>
                            <td style={{background: (this.state.room1.light > 10)? 'green':'red'}}>{this.state.room1.light}</td>
                            <td style={{background: (this.state.room2.light > 10)? 'green':'red'}}>{this.state.room2.light}</td>
                            <td style={{background: (this.state.room3.light > 10)? 'green':'red'}}>{this.state.room3.light}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                </div>
              </Col>
              <Col className="right-col">
                <Table className='tablemock-data' bordered>
                  <thead>
                    <tr>
                      <th>SIGNAL</th>
                      <th>Double Door</th>
                      <th>IC. Room</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Pressure</td>
                      <td style={{background: (this.state.door2.press > 10)? 'green':'red'}}>{this.state.door2.press}</td>
                      <td style={{background: (this.state.ic.press > 10)? 'green':'red'}}>{this.state.ic.press}</td>
                    </tr>
                    <tr>
                      <td>Temperature</td>
                      <td style={{background: (this.state.door2.temp > 10)? 'green':'red'}}>{this.state.door2.temp}</td>
                      <td style={{background: (this.state.ic.temp> 10)? 'green':'red'}}>{this.state.ic.temp}</td>
                    </tr>
                    <tr>
                      <td>Humidity</td>
                      <td style={{background: (this.state.door2.hum > 10)? 'green':'red'}}>{this.state.door2.hum}</td>
                      <td style={{background: (this.state.ic.hum > 10)? 'green':'red'}}>{this.state.ic.hum}</td>
                    </tr>
                    <tr>
                      <td>Light</td>
                      <td style={{background: (this.state.door2.light > 10)? 'green':'red'}}>{this.state.door2.light}</td>
                      <td style={{background: (this.state.ic.light > 10)? 'green':'red'}}>{this.state.ic.light}</td>
                    </tr>
                  </tbody>
                </Table>
                <Table bordered className='uv-table'>
                  <tbody>
                    <tr>
                      <td>UV</td>
                      <td style={{background: (this.state.uv)? 'green':'red'}}>{(this.state.uv)? 'On':'Off'}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </Container>
      </div>
    )
  }
}