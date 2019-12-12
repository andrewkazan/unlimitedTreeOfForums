import React from 'react'
import { observer } from 'mobx-react'
import { EntityType } from './../interfaces/interfaces'

interface IProps {
	inputFunc: (value: React.FormEvent<HTMLInputElement>, type: string) => void
	cancelSaveTheme: () => void
	saveTheme: (parentId: string) => void
	parentId: string
}

@observer
export class ThemeAdd extends React.Component<IProps> {
	render() {
		return (
			<div>
				<h2>Add new Theme</h2>
				<input
					type="text"
					name="title"
					placeholder="Enter theme title"
					onChange={ (e) => this.props.inputFunc(e, EntityType.THEME) }
				/>
				<input
					type="text"
					name="description"
					placeholder="Enter theme description"
					onChange={ (e) => this.props.inputFunc(e, EntityType.THEME) }
				/>
				<button onClick={ this.props.cancelSaveTheme }>Cancel</button>
				<button onClick={ () => this.props.saveTheme(this.props.parentId) }>Save</button>
			</div>
		)
	}
}
