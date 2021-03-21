import * as React from 'react';
import {
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity
} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class app extends React.Component{
  constructor(){
    super();
    this.state={
      hasPermissionGranted:null,
      scanned:false,
      scannedData:'',
      buttonState:'normal'
    }
  }
  getPermissions=async()=>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasPermissionGranted:status==="granted",
      buttonState:'clicked'
    })
  }
  handleScanedData=async({type, data})=>{
    this.setState({
      scannedData:data,
      scanned:true,
      buttonState:'normal'
    })
  }
  render(){
    const hasPermissionGranted = this.state.hasPermissionGranted;
    const buttonState = this.state.buttonState;
    const scanned = this.state.scanned;
    if(buttonState==="clicked" && hasPermissionGranted){
      return(
        <BarCodeScanner
          onBarCodeScanned={
            scanned?undefined:this.handleScanedData
          }
          style={StyleSheet.absoluteFillObject}
        ></BarCodeScanner>
      );
    }else{
      return(
        <View>
          <Text style={styles.displaytext}>{
            hasPermissionGranted?this.state.scannedData:"Click on scan button"
          }</Text>
          <TouchableOpacity style={styles.buttonstyle} onPress={
            ()=> this.getPermissions()
          }>
            <Text style={styles.buttontext}> Scan </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  displaytext:{
    textAlign:'center',
    alignItems:'center',
    marginTop:100,
    fontSize:30
  },
  buttontext:{
    textAlign:'center',
    alignItems:'center',
    color:'white',
    fontSize:20
  },
  buttonstyle:{
    marginTop:80,
    backgroundColor:'blue',
    textAlign:'center',
    alignItems:'center',
  }
})