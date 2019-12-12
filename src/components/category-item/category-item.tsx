import React from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { AiFillCloseCircle, AiFillEdit } from 'react-icons/ai'
import { EditItemComponent } from './../common/edit-item-component'
import { EntityType } from './../interfaces/interfaces'
import './styles.scss'

interface IProps {
	id: string
	title: string
	description: string
	children: any
	deleteFunc: (event: any, selfId: string) => void
	inputFunc: (value: React.FormEvent<HTMLInputElement>, type: string) => void
	saveChangesEditCategory: (event: any, id: string) => void
}

@observer
export class CategoryItem extends React.Component<IProps> {

	public state = { isEditing: false }

	public toggleIsEdit = (e: any) => {
		e.preventDefault()
		this.setState({ isEditing: !this.state.isEditing })
	}

	render() {
		const {
			id, title, description, children, deleteFunc, inputFunc, saveChangesEditCategory
		} = this.props
		return !this.state.isEditing ?
						(
							<Link to={`/category/${id}`} id={ id }>
								<div className="categoryItemWrapper">
									<div className="category">
										<div className="crossDelete">
											<AiFillEdit onClick={ (e) => { this.toggleIsEdit(e) } } />
											<AiFillCloseCircle onClick={ (e) => { deleteFunc(e, id) } } />
										</div>
										<span>Category:  <span className="boldText">{ title }</span></span>
										<div>
											<span>Description: <span className="boldText">{ description }</span></span>
												{
													(children.length !== 0) &&
													<span>
															<span>, Have a forums:
															<span className="boldText"> { children[0] && children[0].title }</span>
															<span className="boldText"> { children[1] && children[1].title }</span>
															<span className="boldText"> { children[2] && children[2].title }</span>
														</span>
													</span>
												}
										</div>
									</div>
								</div>
							</Link>
						) : (
							<EditItemComponent
								id={ id }
								title={ title }
								description={ description }
								isEditing={ this.state.isEditing }
								toggleIsEdit={ this.toggleIsEdit }
								inputFunc={ inputFunc }
								saveChangesEditCategory={ saveChangesEditCategory }
								typeOfEntity={ EntityType.CATEGORY }
								parentId={ '' }
							/>
						)
	}

}
