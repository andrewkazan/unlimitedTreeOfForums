import React from 'react'
import { observer } from 'mobx-react'
import { EntityType } from './../interfaces/interfaces'

interface IProps {
	inputFunc: (value: React.FormEvent<HTMLInputElement>, type: string) => void
	cancelSaveCategory: () => void
	saveCategory: () => void
}

@observer
export class CategoryAdd extends React.Component<IProps> {
	render() {
		return (
			<div>
				<h2>Add new category</h2>
				<input
					type="text"
					name="title"
					placeholder="Enter category title"
					onChange={ (e) => this.props.inputFunc(e, EntityType.CATEGORY) }
				/>
				<input
					type="text"
					name="description"
					placeholder="Enter category description"
					onChange={ (e) => this.props.inputFunc(e, EntityType.CATEGORY) }
				/>
				<button onClick={ this.props.cancelSaveCategory }>Cancel</button>
				<button onClick={ this.props.saveCategory }>Save</button>
			</div>
		)
	}
}
