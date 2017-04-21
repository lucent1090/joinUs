import React from 'react'

import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { List, ListItem } from 'material-ui/List'

import { connect } from 'react-redux'
import { addSentence } from './../actions/actions'

//--------------
// chats = [{id: groupId, speaker: speaker, sentence: sentence, time: time}, {}...]
//--------------

class Chat extends React.Component{

	constructor (props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);

		this.state = {
			sentence: ''
		};
	}

	handleChange (e) {
		this.setState({sentence: e.target.value});
	}

	handleClick (e) {
		let { dispatch, showingGroup, user } = this.props;
		let time = new Date();
		
		dispatch( addSentence(showingGroup, user, this.state.sentence, time) );
		this.setState({sentence: ''});
	}

	render(){
		let dialog = this.props.chats.map((val, idx) => {
			return (
				<ListItem key={idx} 
						  primaryText={val.speaker} 
						  secondaryText={val.sentence} />
			);
		});
		return(
			<div className='ChatRoom'>
				<List>
					{dialog}
				</List>
				<TextField id='ChatRoom-input'
						   type='text' 
						   hintText='Say Something...'
					       value={this.state.sentence} 
					   	   onChange={this.handleChange}
					   	   underlineFocusStyle={{display: 'none'}} />
				<FlatButton label='Send' 
							onTouchTap={this.handleClick}
							disableTouchRipple={true} />
			</div>
		);
	}
}

function getChats (state) {
	let id = state.status.showingGroup;
	let chats = [];
	
	state.chats.map((val) => {
		if( val.id == id ){
			chats.push(val);
		}
	});
	
	return {
		user: state.status.user,
		showingGroup: id,
		chats: chats
	}
}

export default connect(getChats)(Chat);