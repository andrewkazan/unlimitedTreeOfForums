import React from 'react'
import { observer } from 'mobx-react'
import { CategoryComponentController } from './category-comp-controller'
import { ForumAdd } from './../forum-add'
import { ForumItem } from './../forum-item'
import { EntityType } from './../interfaces/interfaces'

interface IProps {
	manager: InstanceType<typeof CategoryComponentController>
}

@observer
export class CategoryComponent extends React.Component<IProps> {

	public componentDidMount(): void {
		this.props.manager.getEntityFromUrl(window.location.href)
		this.props.manager.buildPathToNestedObj(this.props.manager.getStore, this.props.manager.deliveredEntity.id)
	}

	public componentWillUnmount(): void {
		this.props.manager.clearPathWhenUnmount()
	}

	render() {

		const entity = this.props.manager.getItemFromStore

		const parentId: any = this.props.manager.getParentId
		const {
			getItemFromStore,
			addItem, isAddForum, saveItem, deleteItemHandler,
			changeInputField, cancelSaveItem, saveChangesEditItems,
			getPathToEntity
		} = this.props.manager

		return (
			<div className="container">
				<h2>Category component</h2>
				{
					(getItemFromStore.id !== '') ?
						(
							<div>
								<div>
									<p><span className="boldText">Entity ID:</span> { entity.id }</p>
									<p><span className="boldText">Path to entity from root:</span> { getPathToEntity }</p>
									<p>
										<span><span className="boldText">Type of entity:</span> { entity.type }</span>
										<span><span className="boldText"> Title: </span>{ entity.title } </span>
										<span><span className="boldText">Description: </span>{ entity.description }</span>
									</p>
								</div>
								<div>
									<button onClick={ () => addItem(EntityType.FORUM) }>Add Forum</button>
									{
										isAddForum && (
											<ForumAdd
												inputFunc={ changeInputField }
												saveForum = { saveItem }
												cancelSaveForum={ cancelSaveItem }
												parentId={ entity.id }
											/>
										)
									}
								</div>
								<div>
									{
										(getItemFromStore.children.length !== 0) ?
											<div className="forumWrapper">
												{
													getItemFromStore.children.map((item: { id: string, title: string, description: string, children: [] }) => {
														return (
															<ForumItem
																key={item.id}
																id={item.id}
																title={item.title}
																description={item.description}
																parentId={ parentId }
																children={ item.children }
																deleteFunc={ deleteItemHandler }
																inputFunc={ changeInputField }
																saveChangesEditItems={ saveChangesEditItems }
															/>
														)
													})
												}
											</div>
											:
											<p>No children</p>
									}
								</div>
							</div>
						)
						:
						(
							<span>No such category</span>
						)
				}
			</div>
		)
	}
}
