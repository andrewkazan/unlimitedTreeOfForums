import React from 'react'
import { observer } from 'mobx-react'
import { EntityType } from './../interfaces/interfaces'

interface IProps {
	inputFunc: (value: React.FormEvent<HTMLInputElement>, type: string) => void
	cancelSaveMessage: () => void
	saveMessage: (parentId: string) => void
	parentId: string
}

@observer
export class MessageAdd extends React.Component<IProps> {
	render() {
		return (
			<div>
				<h2>Add new Message</h2>
				<input
					type="text"
					name="title"
					placeholder="Enter text message"
					onChange={ (e) => this.props.inputFunc(e, EntityType.MESSAGE) }
				/>
				<button onClick={ this.props.cancelSaveMessage }>Cancel</button>
				<button onClick={ () => this.props.saveMessage(this.props.parentId) }>Save</button>
			</div>
		)
	}
}
