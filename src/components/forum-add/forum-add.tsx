import React from 'react'
import { observer } from 'mobx-react'
import { EntityType } from './../interfaces/interfaces'

interface IProps {
	inputFunc: (value: React.FormEvent<HTMLInputElement>, type: string) => void
	cancelSaveForum: () => void
	saveForum: (parentId: string) => void
	parentId: string
}

@observer
export class ForumAdd extends React.Component<IProps> {
	render() {
		return (
			<div>
				<h2>Add new Forum</h2>
				<input
					type="text"
					name="title"
					placeholder="Enter forum title"
					onChange={ (e) => this.props.inputFunc(e, EntityType.FORUM) }
				/>
				<input
					type="text"
					name="description"
					placeholder="Enter forum description"
					onChange={ (e) => this.props.inputFunc(e, EntityType.FORUM) }
				/>
				<button onClick={ this.props.cancelSaveForum }>Cancel</button>
				<button onClick={ () => this.props.saveForum(this.props.parentId) }>Save</button>
			</div>
		)
	}
}
