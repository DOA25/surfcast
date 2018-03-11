// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
import ListBtn from '../ListBtn';
import tableData from '../tableData';
import table_style from '../tableData/table_style';
import plane_style from '../Bottom_plane/plane_style';
import WeatherTable from '../WeatherTable';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';

export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true, displayPic: false });
	}


	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
	  // API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = 'http://magicseaweed.com/api/daed370ac44039048502a7ea5e1888d3/forecast/?spot_id=01&units=uk';
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ display: false });
	}

	accountFunction = () =>
	{window.alert("this is an Account call");}

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;

		// display all weather data
		return (
			<div class={ style.container }>
				<div class= { style_iphone.container }>
					{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchWeatherData }/ > : null }
				</div>
				<div>
				  <table class ={table_style.container}>
					<tr>
					<td>12am</td>
					<td>3am</td>
					<td>6am</td>
					<td>9am</td>
					<td>12pm</td>
					<td>3pm</td>
					<td>6pm</td>
					<td>9pm</td>
					</tr>
            <tr>
							<td>{this.state.temp0}</td>
							<td>{this.state.temp1}</td>
							<td>{this.state.temp2}</td>
							<td>{this.state.temp3}</td>
							<td>{this.state.temp4}</td>
							<td>{this.state.temp5}</td>
							<td>{this.state.temp6}</td>
							<td>{this.state.temp7}</td>
						</tr>
					</table>
				</div>
				<div class ={plane_style.container}>
				<ul>
					<ListBtn img ='../../assets/icons/star.png' text= "Favorites"/>
            		<ListBtn img ='../../assets/icons/explore.png' text ="Explore" clickFunction = {this.fetchWeatherData}/>
       	    		<ListBtn img ='../../assets/icons/surfcastbutton.png' w = "20" h = "30" clickFunction = {this.fetchWeatherData}/>
          			<ListBtn img ='../../assets/icons/feed.png' text ="Feed"/>
            		<ListBtn img ='../../assets/icons/account.png' text ="Account" clickFunction = {this.accountFunction}/>

				</ul>
				</div>
			</div>
		);
	}

	parseResponse = (parsed_json) => {
		this.setState({
		  temp0:parsed_json[0]['condition']['weather'],
			temp1:parsed_json[1]['condition']['weather'],
			temp2:parsed_json[2]['condition']['weather'],
			temp3:parsed_json[3]['condition']['weather'],
			temp4:parsed_json[4]['condition']['weather'],
			temp5:parsed_json[5]['condition']['weather'],
			temp6:parsed_json[6]['condition']['weather'],
			temp7:parsed_json[7]['condition']['weather'],
			displayPic: true
		});
	}
}
