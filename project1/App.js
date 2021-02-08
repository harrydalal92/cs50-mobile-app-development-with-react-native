import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import {vibrate} from './utils'

// App class starts
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      workMins: 2,
      workSecs: 0,
      restMins: 1,
      restSecs: 0,
      timeToWork: true,
      isPaused: true,
      showResume: false,
    }
  }

  delay = (time) => {
    var currTime = new Date().getTime()
    var stopTime = currTime + time*1000
    while(currTime < stopTime) {
      currTime = new Date().getTime()
    }
  }

  pause = () => {
    clearInterval(this.interval)
    this.setState({
      isPaused: true,
    })
  }

  start = () => {
    this.setState({
      isPaused: false,
      showResume: true,
    })
    if (this.state.timeToWork) this.interval = setInterval(this.decWork, 1000)
    else this.interval = setInterval(this.decRest, 1000)
  }

  reset = () => {
    this.setState({
      workMins: 2,
      workSecs: 0,
      restMins: 1,
      restSecs: 0,
      timeToWork: true,
      isPaused: true,
      showResume: false,
    })
    clearInterval(this.interval)
  }

  decWork = () => {
    if (this.state.workSecs === 0 && this.state.workMins != 0) {
      this.setState(prevState => ({
        workSecs: 9,
        workMins: prevState.workMins - 1,
      }))
    } else if (this.state.workSecs === 0 && this.state.workMins === 0) {
      vibrate()
      clearInterval(this.interval)
      this.setState(prevState => ({
        workMins: 2,
        workSecs: 0,
        timeToWork: !prevState.timeToWork,
      }))
      this.delay(1)
      this.start()
    } else {
      this.setState(prevState => ({
        workSecs: prevState.workSecs - 1,
      }))
    }
  }

  decRest = () => {
    if (this.state.restSecs === 0 && this.state.restMins != 0) {
      this.setState(prevState => ({
        restSecs: 9,
        restMins: prevState.restMins - 1,
      }))
    } else if (this.state.restSecs === 0 && this.state.restMins === 0) {
      vibrate()
      clearInterval(this.interval)
      this.setState(prevState => ({
        restMins: 1,
        restSecs: 0,
        timeToWork: !prevState.timeToWork,
      }))
      this.delay(1)
      this.start()
    } else {
      this.setState(prevState => ({
        restSecs: prevState.restSecs - 1,
      }))
    }
  }

  render() {
    return (
      <View style={[styles.container, {flex: 1}]}>
        {/* <Text style={styles.textPaddingStyle}>For my cutie pie {'\u2764'}</Text> */}
        <Text style={styles.pomodoroStyle}>Great Harry's</Text>
        <Text style={styles.pomodoroStyle}>Pomodoro Timer</Text>
        <TimerText // {...this.state}
          workMins={this.state.workMins}
          workSecs={this.state.workSecs}
          restMins={this.state.restMins}
          restSecs={this.state.restSecs}
          timeToWork={this.state.timeToWork}
        /> 
        {this.state.isPaused && !this.state.showResume && <Button title="Start" onPress={this.start}/>}
        {this.state.isPaused && this.state.showResume && <Button title="Resume" onPress={this.start}/>}
        {!this.state.isPaused && <Button title="Pause" onPress={this.pause}/>}
        <Button title="Reset" onPress={this.reset}/>
      </View>
    )
  }
}
// App class ends

const TimerText = (props) => {
  let workMinsText = props.workMins
  let workSecsText = props.workSecs
  let restMinsText = props.restMins
  let restSecsText = props.restSecs

  if (props.timeToWork) {
    if (props.workMins<10) workMinsText = "0" + props.workMins.toString()
    if (props.workSecs<10) workSecsText = "0" + props.workSecs.toString()
  } else {
    if (props.restMins<10) restMinsText = "0" + props.restMins.toString()
    if (props.restSecs<10) restSecsText = "0" + props.restSecs.toString()
  }
  
  return (
    <View style={styles.container}>
      {props.timeToWork && <Text style={styles.textPaddingStyle}>It's time to Work</Text>}
      {props.timeToWork && <Text style={styles.timerStyle}>
        {workMinsText + ':' + workSecsText}
      </Text>}
      {!props.timeToWork && <Text style={styles.textPaddingStyle}>It's time to Rest</Text>}
      {!props.timeToWork && <Text style={styles.timerStyle}>
        {restMinsText + ':' + restSecsText}
      </Text>}
    </View>
  )
} 

// Styles are here:
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DAFCFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pomodoroStyle: {
    fontSize:50,
    color:'#458eff',
  },
  timerStyle: {
    fontSize: 80,
    paddingBottom: 10,
  },
  textPaddingStyle: {
    fontSize: 42,
    padding: 20,
  }
})
