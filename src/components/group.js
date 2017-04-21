import React from 'react'
import Chat from './chat'
import Order from './order'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ActionHome from 'material-ui/svg-icons/action/home'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import {Tabs, Tab} from 'material-ui/Tabs'

import { connect } from 'react-redux'
import { changeShowing } from './../actions/actions'
//--------------
// group = {id: groupId, name: name, status: status, 
//			website: website, due: due, money: money}
//--------------
const styleCard = {
	marginBottom: 10,
};

const styleHome = {
	position: 'absolute',
	top: 14,
	right: 10,
};

class Group extends React.Component{

	constructor (props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleHome = this.handleHome.bind(this);

		this.state = {
			value: 'order'
		};
	}

	handleChange (value) {
		this.setState({value: value});
	}

	handleHome () {
		let { dispatch } = this.props;

		dispatch( changeShowing('groups') );
	}

	render(){
		let { group } = this.props;

		return(
			<div className='group'>
				<Card style={styleCard}>
					<CardHeader title={group.name}
								subtitle={group.due + "  " + group.money} />
				</Card>
				<FloatingActionButton style={styleHome}>
  					<ActionHome onTouchTap={this.handleHome} />
				</FloatingActionButton>
				<Tabs value={this.state.value}
					  onChange={this.handleChange}>
					  <Tab label='Order' value='order'>
					  	<Order />
					  </Tab>
					  <Tab label='Any Question?' value='chat'>
					  	<Chat />
					  </Tab>
				</Tabs>
			</div>
		);
	}
}

function getGroup (state) {
	let group = null;

	state.groups.map((val) => {
		if( val.id == state.status.showingGroup ){
			group = val;
		}
	});

	return {
		group: group
	}
}

export default connect(getGroup)(Group);