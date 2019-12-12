import React from 'react'
import { observer } from 'mobx-react'
import { AiFillCloseCircle, AiFillEdit } from 'react-icons/ai'
import { EditItemComponent } from './../common/edit-item-component'
import { EntityType } from './../interfaces/interfaces'
import './styles.scss'

interface IProps {
	id: string
	title: string
	parentId: string
	deleteFunc: (event: any, selfId: string, parentId: string) => void
	inputFunc: (value: React.FormEvent<HTMLInputElement>, type: string) => void
	saveChangesEditItems: (event: any, id: string, parentId: string) => void
}

@observer
export class MessageItem extends React.Component<IProps> {

	public state = { isEditing: false }

	public toggleIsEdit = (e: any) => {
		e.preventDefault()
		this.setState({ isEditing: !this.state.isEditing })
	}

	render() {

		const {
			id, title, parentId, deleteFunc,
			inputFunc, saveChangesEditItems
		} = this.props

		return !this.state.isEditing ? (
			<div className="messageItemWrapper">
				<div className="message">
					<div className="crossDelete">
						<AiFillEdit onClick={ (e) => { this.toggleIsEdit(e) } } />
						<AiFillCloseCircle onClick={ (e) => { deleteFunc(e, id, parentId) } } />
					</div>
					<span>Message:  <span className="boldText">{ title }</span></span>
				</div>
			</div>
		) : (
			<EditItemComponent
				id={ id }
				title={ title }
				description={ '' }
				isEditing={ this.state.isEditing }
				toggleIsEdit={ this.toggleIsEdit }
				inputFunc={ inputFunc }
				saveChangesEditItems={ saveChangesEditItems }
				typeOfEntity={ EntityType.MESSAGE }
				parentId={ parentId }
			/>
		)
	}
}
