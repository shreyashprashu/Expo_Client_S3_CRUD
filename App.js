import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button,ScrollView,Image } from 'react-native';
import axios from 'axios';
import  Product from './modules/Product'
import * as ImagePicker from 'expo-image-picker';
//import Constants from 'expo-constants';
//import * as Permissions from 'expo-permissions';
//import * as FileSystem from 'expo-file-system';
export default class App extends React.Component{
  constructor(props){
		super(props);
		this.state = {
      apidatasource: [],
      name:"somename",
      price:55,
      productImage: null,
    }
  }
  // getPermissionAsync = async () => {
  //   if (Constants.platform.ios) {
  //     const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //     if (status !== 'granted') {
  //       alert('Sorry, we need camera roll permissions to make this work!');
  //     }
  //   }
  // };
  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: false
      });
      if (!result.cancelled) {
         let imageapath = result.uri.replace('file:///', '');
        this.setState({productImage : imageapath });
      }
    } catch (E) {
      console.log("pick image error",E);
    }
  };

	componentDidMount() {
  // this.getPermissionAsync();
  axios.get("http://192.168.0.177:5000/products")
  .then(res => {
    this.setState({ apidatasource: res.data.products});
  }).catch(error=>console.log(error));
  }


  handleupload=()=>{
  const data=new FormData();
 
  data.append('productImage',  
  {
    uri:  `file:///${this.state.productImage}` ,
    type: 'image/jpeg',
    name: 'photo.jpg',
}
);
  data.append('name',this.state.name);
  data.append('price',this.state.price);
  axios.post("http://192.168.0.177:5000/products", data) .then(res => console.log("my response",res))
  .catch(error=>console.log("mypostError",error.response));
}
  render(){
    let { productImage } = this.state;
  return (
    <View style={styles.container}>
       <View style={{flexDirection:'row',backgroundColor:'lightskyblue',width:250,height:150, alignItems:'center',justifyContent:'center'}}>
        <Button title="add_image" onPress={this._pickImage}/>
        {productImage && <Image source={{ uri: `file:///${productImage}` }} style={{ width: 60, height: 60,borderRadius:30 }} />}
      </View>
      <Button title='post' onPress={()=>{this.handleupload()}}></Button>
      <StatusBar style="auto" />
      <View style={styles.child}>
        <ScrollView >
          {
            this.state.apidatasource.map((items, Id) =>
               <Product  key={Id} data={items}></Product>
            )
          }
        </ScrollView>
      </View>
    </View>
  )};
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  child: {
    //flex: 1,
   height:400,
     width:300,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:20
  },
  imagestyle: {
		width: 75,
		height: 75,
		marginRight: 10
	},
});
