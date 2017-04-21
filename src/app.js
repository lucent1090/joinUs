import React from 'react'
import ShowGroups from './components/showGroups'
import Group from './components/group'

import { addGroup, addOrder, addSentence } from './actions/actions'

import { connect } from 'react-redux'

class App extends React.Component{

	constructor (props) {
		super(props);

		let { dispatch } = this.props;
		let { showingGroup, user } = this.props.status;

		dispatch( addGroup('q23o4ucm23op', 'KFC', 'Enough', 'http://google.com', 'due', '1500', 'Tester') );
		dispatch( addGroup('q23qwere23op', 'M', 'Going', 'http://google.com', 'due', '2000', 'AAAA') );
		dispatch( addGroup('q213cercq2op', '7-11', 'Going', 'http://google.com', 'due', '2000', 'Tester') );
		dispatch( addGroup('qqwrrrco4ert', 'Tea Fac', 'Going', 'http://google.com', 'due', '1000', 'Tester') );
		dispatch( addGroup('q22345v987bp', 'Mikasha', 'Enough', 'http://google.com', 'due', '500', 'BBB') );
		dispatch( addOrder(showingGroup, user, 'Milk Tea', 2, 'no ice', 60) );
		dispatch( addOrder(showingGroup, 'Robot', 'Milk Tea', 2, 'no ice', 60) );
		dispatch( addOrder(showingGroup, user, 'Green Tea', 1, 'no ice', 20) );
		dispatch( addSentence(showingGroup, user, 'Hi I need help', '2017-04-21 11:35') );
		dispatch( addSentence(showingGroup, user, 'helloooooo', '2017-04-21 11:36') );
		dispatch( addSentence(showingGroup, user, 'any one?????', '2017-04-21 11:37') );
		dispatch( addSentence(showingGroup, user, '??', '2017-04-21 11:38') );
	}

	render(){
		let { showing } = this.props.status;

		switch (showing) 
		{
			case 'group':
				return <Group />
				break;

			case 'groups':
				return <ShowGroups />

			default:
		}
	}
}

function getStatus (state) {
	return {
		status: state.status
	};
}

export default connect(getStatus)(App);