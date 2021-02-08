import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

// App class starts
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isPaused: true,
    }
  }

  togglePause = () => {
    console.log(this.state.isPaused)
    this.setState(prevState => ({
      isPaused: !prevState.isPaused,
    }))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>Pomodoro Timer</Text>
        <Timer isPaused={this.state.isPaused}/>
        <Button title="Start" onPress={this.togglePause}/>
        <Button title="Stop" onPress={this.togglePause}/>
        <Button title="Reset" />
      </View>
    )
  }
}
// App class ends

// Timer class starts
class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      workMins: 25,
      workSecs: 0,
      restMins: 5,
      restSecs: 0,
      timeToWork: true,
    }
  }

  shouldComponentUpdate() {
    console.log("updating")
    return (!this.props.isPaused)
  }

  render() {
    return (
        <TimerText
          workMins={this.state.workMins}
          workSecs={this.state.workSecs}
          restMins={this.state.restMins}
          restSecs={this.state.restSecs}
          timeToWork={this.state.timeToWork}
        />
    )
  }
}
// Timer class ends

const TimerText = (props) => {
  let workMinsText = props.workMins
  let workSecsText = props.workSecs
  let restMinsText = props.restMins
  let restSecsText = props.restSecs

  if (props.workMins<10) {
    workMinsText = "0" + props.workMins.toString()
  }
  if (props.workSecs<10) {
    workSecsText = "0" + props.workSecs.toString()
  } 
  if (props.restMins<10) {
    restMinsText = "0" + props.restMins.toString()
  }
  if (props.restSecs<10) {
    restSecsText = "0" + props.restSecs.toString()
  }

  if (props.timeToWork) {
    return (
    <View style={{alignItems: 'center', justifyContent: 'center', padding: 20}}>
      <Text style={[styles.textStyle, {padding: 20}]}>It's time to Work</Text>
      <Text style={styles.textStyle}>
        {workMinsText + ':' + workSecsText}
      </Text>
    </View>
    )
  }
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', padding: 20}}>
      <Text style={[styles.textStyle, {padding: 20}]}>It's time to Rest</Text>
      <Text style={styles.textStyle}>
        {restMinsText + ':' + restSecsText}
      </Text>
    </View>
  )
} 

// Styles are here:
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 48,
  },
});
