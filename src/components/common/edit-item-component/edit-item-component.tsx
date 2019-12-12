import React from 'react'
import { observer } from 'mobx-react'
import { AiFillCloseCircle, AiFillSave } from 'react-icons/ai'
import { EntityType } from './../../interfaces/interfaces'
import './styles.scss'

interface IProps {
	id: string
	title: string
	description: string
	isEditing: boolean
	toggleIsEdit: (event: any) => void
	inputFunc: (value: React.FormEvent<HTMLInputElement>, type: string, id?: string) => void
	saveChangesEditCategory?: (event: any, id: string) => void
	saveChangesEditItems?: (event: any, id: string, parentId: string) => void
	typeOfEntity: string
	parentId: string
}

@observer
export class EditItemComponent extends React.Component<IProps> {

	public returnNestedFunctionSave = (e: any, id: string, parentId: string) => {

		if (this.props.saveChangesEditCategory) {
			this.props.saveChangesEditCategory(e, id)
		} else if (this.props.saveChangesEditItems) {
			this.props.saveChangesEditItems(e, id, parentId)
		}
	}

	render() {

		const {
			id, title, description, toggleIsEdit, typeOfEntity, parentId
		} = this.props

		return (
			<div>
				<div className="editItemWrapper">
					<div className="editItem">
						<div className="crossDelete">
							<AiFillSave onClick={ (e) => { this.returnNestedFunctionSave(e, id, parentId); toggleIsEdit(e) } } />
							<AiFillCloseCircle onClick={ (e) => { toggleIsEdit(e) } } />
						</div>
						<div className="inputWrapper">
							<input
								type="text"
								name="title"
								defaultValue={ title }
								onChange={ (e) => this.props.inputFunc(e, typeOfEntity) }
							/>
							{
								typeOfEntity !== EntityType.MESSAGE && (
									<input
										type="text"
										name="description"
										defaultValue={ description }
										onChange={ (e) => this.props.inputFunc(e, typeOfEntity) }
									/>
								)
							}
						</div>
					</div>
				</div>
			</div>
		)
	}
}
