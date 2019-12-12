import React from 'react'
import { observer } from 'mobx-react'
import { MessageAdd } from './../message-add'
import { ThemeComponentController } from './theme-comp-controller'
import { MessageItem } from './../message-item'
import { EntityType } from './../interfaces/interfaces'

interface IProps {
	manager: InstanceType<typeof ThemeComponentController>
}

@observer
export class ThemeComponent extends React.Component<IProps> {

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

		const { addItem, saveItem, deleteItemHandler, isAddMessage,
			changeInputField, cancelSaveItem, saveChangesEditItems,
			getPathToEntity
		} = this.props.manager

		return (
			<div className="container">
				<h2>Theme component</h2>
				{
					(entity.id !== '') ?
						(
							<div>
								<p><span className="boldText">Entity ID:</span> { entity.id }</p>
								<p><span className="boldText">Path to entity from root:</span> { getPathToEntity }</p>
								<p>
									<span><span className="boldText">Type of entity:</span> { entity.type }</span>
									<span><span className="boldText"> Title: </span>{ entity.title } </span>
									<span><span className="boldText">Description: </span>{ entity.description }</span>
								</p>
								<div>
									<button onClick={ () => addItem(EntityType.MESSAGE) }>Add Message</button>
									{
										isAddMessage && (
											<MessageAdd
												inputFunc={ changeInputField }
												saveMessage = { saveItem }
												cancelSaveMessage={ cancelSaveItem }
												parentId={ entity.id }
											/>
										)
									}
								</div>
								{
									(entity.children.length !== 0) ?
										<div>
											{
												entity.children.map((item: { id: string, title: string }) => {
													return (
														<MessageItem
															key={item.id}
															id={item.id}
															title={item.title}
															parentId={ parentId }
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
						)
						:
						(
							<span>No such theme</span>
						)
				}
			</div>
		)
	}
}
