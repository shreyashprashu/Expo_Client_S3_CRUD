import React from 'react';
import {View, Text, Image, StyleSheet,TouchableOpacity} from 'react-native';
import axios from 'axios';

class Product extends React.Component{
    constructor(props) {
	super(props);
	this.state={
		propvar:this.props.data._id,
	};
		this.deleteMethod=this.deleteMethod.bind(this);
    }

    deleteMethod(){ 
	axios.delete(`http://192.168.0.177:5000/products/${this.state.propvar}`).catch(err => console.log(err));
	return console.log("Delete Operation Completed!");
	}

 	isUrl(s) {
	var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
	return regexp.test(s);
	}

	render() {
	return (
		<View style={ styles.ProductItem }>

			{ this.isUrl(this.props.data.productImage) ? 

			<Image
				style={ styles.ProductImageStyle }
				source={{uri:this.props.data.productImage}}
			></Image>
			 : 
			 <View 
			   style={{width: 60,height:60,borderRadius:30,marginRight: 10,backgroundColor:'white'}}
			></View> }

			<View style={ styles.ProductContent }>
				<Text style={ styles.ProductTitle }>{ this.props.data.name }</Text>
				<Text style={ styles.ProductAuthor }>{ this.props.data.price }</Text>
                <Text style={ styles.ProductAuthor }>{this.props.data._id}</Text>
			</View>

			<View style={ styles.parentDelEditStyle }> 
				<TouchableOpacity onPress={this.deleteMethod} style={ styles.delStyle }></TouchableOpacity>
				<TouchableOpacity style={ styles.editStyle }></TouchableOpacity>
			</View>
		</View>
	)
}
}

const styles = StyleSheet.create({
	ProductItem: {
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
		padding: 10,
		flexDirection: "row",
	},
	ProductImageStyle: {
		width: 60,
		height: 60,
		borderRadius:30,
		marginRight: 10,
	},
	ProductContent:{
		width:180,
		height:50
	},
	ProductTitle: {
		fontSize: 14,
		fontWeight: 'bold',
		marginBottom: 5,
	},
	parentDelEditStyle:{
		flexDirection: 'column',
		justifyContent:'space-between'
	},
	delStyle:{
		width: 22,
		height: 22,
		borderRadius:11,
		backgroundColor:'red',
	},
	editStyle:{
		width: 22,
		height: 22,
		borderRadius:11,
		backgroundColor:'grey',
	}
 });

 export default Product;