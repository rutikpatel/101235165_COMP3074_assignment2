import React, { Component } from 'react';
import { Alert, Button } from 'react-native';
import {
    StyleSheet,
    Text,
    View,
    Switch,
    TextInput
  } from "react-native";


export default class MainScreen extends Component {
    constructor() {
      super();
      this.state = {
        size:0 ,
        flooring_price:0 ,
        installation_cost:0 ,
        show : false,
        isEnabled:false,
        isEmpty:false,
        isValid :true,
      };
      this.handleSize = this.handleSize.bind(this);
      this.handleFlooring = this.handleFlooring.bind(this);
      this.handleInstallation = this.handleInstallation.bind(this);
    }
    clearState=()=>{
      this.setState({
        size:0 ,
        flooring_price:0 ,
        installation_cost:0,
        show : false,
        isEnabled:false,
        isEmpty:false,
        isValid :true,
      })
    }
    onPress = () => {
      this.setState({
        show : true
      });

      if(this.state.size == '' || this.state.size <= 0){
        this.setState({ isEmpty: true })
      }
      else if(this.state.flooring_price == '' || this.state.flooring_price <= 0){
        this.setState({ isEmpty: true })
      }
      else if(this.state.installation_cost == '' || this.state.installation_cost <= 0){
        this.setState({ isEmpty: true })
      }
    };
    EmptyHandler=()=>{
      this.setState({
        isEmpty : false,
        isValid :false,
         //isNegative:true
      });
    }
  

    handleSize = (input) => {
      this.setState({ size: input })
    }

    handleFlooring = (input) => {
      this.setState({ flooring_price: input })
    }
    handleInstallation = (input) => {
      this.setState({ installation_cost: input })
    }


    findFlooring() {
      return parseFloat((this.state.size*this.state.flooring_price).toFixed(3));
    }

    findInstallation() {
      return parseFloat((this.state.size*this.state.installation_cost).toFixed(3));   
    }

    findTotal(){
      return parseFloat((this.findFlooring() + this.findInstallation()).toFixed(3));   
    }

    findTax(){
      return parseFloat((this.findTotal() * 0.13).toFixed(2));  
    }

    render() {

          let text,textinput,msg,msg1,msg2;
          const isEmpty = this.state.isEmpty;
          const isEnabled = this.state.isEnabled;
          const isValid = this.state.isValid;
          if(isEnabled){
            msg = <Text style={styles.text}>Switch to square feet?</Text>
            msg1 = 'per square meter'
            textinput = <TextInput style={styles.textinput} name = "size" 
                        numeric value 
                        keyboardType ={'numeric'} value = {this.state.size}
                        placeholder='squre meter'
                            onChangeText={this.handleSize}
                          />
            text =  <Text style={styles.text}>Size of room in squremeter : </Text>
          }
          else{
            msg = <Text style={styles.text}>Switch to square meter?</Text>
            msg1= 'per square feet'
            textinput = <TextInput style={styles.textinput} name = "size"
                        numeric value  
                        keyboardType ={'numeric'} value = {this.state.size}
                        placeholder='squre feet'
                            onChangeText={this.handleSize}
                          />
            text =  <Text style={styles.text}>Size of room in squrefeet : </Text>
          }

          if(isEmpty){
              msg2 = Alert.alert(
                'Error',
                'Please enter valid values (e.g. non-negative or non-zero)',
                [
                  { text: 'OK', onPress: this.EmptyHandler },
                  { text: 'RESET', onPress: this.clearState}
                ],
                { cancelable: false }
                ); 
          }

          if(!isValid && isEmpty){
            msg2 = Alert.alert('Something went wrong please try again later')
          }
          
          else if(isValid){
            msg2= 
                <>
                    <Text style={styles.text}>Rate : $ {this.findFlooring()}</Text>
                    <Text style={styles.text}>installation cost: $ {this.findInstallation()}</Text>
                    <Text style={styles.text}>Total : $ {this.findTotal()} {msg1}</Text>
                    <Text style={styles.text}>Total Tax : $ {this.findTax()}</Text>
                  </>
            
            }
          
 
      return (
        <View style={styles.container}>
          
            <View>
              {msg}
              <Switch  
                value={this.state.isEnabled}  
                onValueChange ={(isEnabled)=>this.setState({isEnabled})}/>  
            </View>

              {text}
              {textinput}
          <Text style={styles.text}>Please enter rate : </Text>
          <TextInput
            numeric value 
            style={styles.textinput} 
            name = "flooring_price"
            keyboardType={'numeric'}
            value = {this.state.flooring_price}
            placeholder="Flooring rate"
            onChangeText={this.handleFlooring}
          />
          <Text style={styles.text}>Please enter installation cost : </Text>
          <TextInput
            numeric value 
            style={styles.textinput}
            name = "installation_cost"
            keyboardType={'numeric'}
            value = {this.state.installation_cost}
            placeholder="Installation cost"
            onChangeText={this.handleInstallation}
          />
          <Button onPress={this.onPress} title="Calculate"/>
            {
              this.state.show &&
              <>
                {msg2}
              </>
            }
          <Button onPress ={this.clearState} title="Reset"/>
          
        </View>
      );
    }
  }
const styles = StyleSheet.create({
  container:{
    flex: 1 ,
    backgroundColor:'#fff',
    justifyContent: 'flex-start',
    padding: 16,

  },
  text:{
    fontSize: 20, 
    justifyContent: 'flex-start',
  },
  textinput:{
    borderWidth:1,
    borderColor:'#777',
    padding: 8,
    margin:10,
    width:200,
    justifyContent: 'flex-start',
  },
  buttonContainer:{
    marginTop: 20,
    backgroundColor:'#000',
  },
});
