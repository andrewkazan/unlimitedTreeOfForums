import React from 'react'
import './styles.scss'

interface IPropsInput {
	type: string
	name: string
	placeholder: string
	onChangeFunc: (value: React.FormEvent<HTMLInputElement>) => string | number
}

export class InputComponent extends React.Component<IPropsInput> {
	render() {
		return (
			<div>
				<input
					type={ this.props.type }
					name={ this.props.name }
					placeholder={ this.props.placeholder }
					onChange={ this.props.onChangeFunc }
				/>
			</div>
		)
	}
}

