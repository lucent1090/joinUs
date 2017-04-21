import React from 'react'
import AddGroup from './addGroup'

import Divider from 'material-ui/Divider'
import { List, ListItem } from 'material-ui/List'
import { Tabs, Tab } from 'material-ui/Tabs'

import { connect } from 'react-redux'
import { addGroup, changeGroupId, changeShowing } from './../actions/actions'

//--------------
// groups = [ {id: groupId, name: name, status: status, 
//			   website: website, due: due, money: money}, {}... ]
//--------------

class ShowGroups extends React.Component{

	constructor (props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		
		this.state = {
			value: 'all'
		};		
	}

	handleClickGroup (id) {
		let { dispatch } = this.props;
		dispatch( changeGroupId(id) );
		dispatch( changeShowing('group') );
	}

	handleChange (value) {
		this.setState({value: value});
	}

	render () {
		let { user, groups } = this.props;
		let showAll = [];
		let showMy = [];
		groups.map((val, idx) => {

			if( val.owner == user ){
				showMy.push(
					<ListItem key={idx}
					  		  primaryText={val.name}
					  		  secondaryText={val.due + "  " + val.money}
					  		  onTouchTap={this.handleClickGroup.bind(this, val.id)} />
				);
			}
			
			showAll.push(
				<ListItem key={idx}
				  		  primaryText={val.name}
				  		  secondaryText={val.due + "  " + val.money}
				  		  onTouchTap={this.handleClickGroup.bind(this, val.id)} />
			);
			
		});
		return(
			<Tabs value={this.state.value}
				  onChange={this.handleChange}>
				<Tab label='All Groups' value='all'>
					<List>
					{showAll}
					</List>  	
				</Tab>
				<Tab label='My Group' value='my'>
					<List>
					{showMy}
					</List> 	
				</Tab>
				<Tab label='Add New Group' value='add'>
					<AddGroup />
				</Tab>
			</Tabs>
		);
	}
}

function getAllGroups (state) {
	return {
		user: state.status.user,
		groups: state.groups
	};
}

export default connect(getAllGroups)(ShowGroups);