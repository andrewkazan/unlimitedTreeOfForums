import React from 'react'
import { observer } from 'mobx-react'
import { ForumAdd } from './../forum-add'
import { ThemeAdd } from './../theme-add'
import { ForumComponentController } from './forum-comp-controller'
import { ForumItem } from './../forum-item'
import { ThemeItem } from './../theme-item'
import { EntityType } from './../interfaces/interfaces'

interface IProps {
	manager: InstanceType<typeof ForumComponentController>
}

@observer
export class ForumComponent extends React.Component<IProps> {

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
			addItem, isAddForum, isAddTheme,
			changeInputField, saveItem, cancelSaveItem, deleteItemHandler,
			getEntityChildrenForum, getEntityChildrenTheme, saveChangesEditItems,
			getPathToEntity
		} = this.props.manager

		return (
			<div className="container">
				<h2>Forum component</h2>
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
									<button onClick={ () => addItem(EntityType.THEME) }>Add Theme</button>
									{
										isAddTheme && (
											<ThemeAdd
												inputFunc={ changeInputField }
												saveTheme = { saveItem }
												cancelSaveTheme={ cancelSaveItem }
												parentId={ entity.id }
											/>
										)
									}
								</div>
								{
									(getEntityChildrenForum.length !== 0) ?
										<div>
											{
												getEntityChildrenForum.map((item: { id: string, title: string, description: string, children: [] }) => {
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
										<p>No Forum</p>
								}
								{
									(getEntityChildrenTheme.length !== 0) ?
										<div>
											{
												getEntityChildrenTheme.map((item: { id: string, title: string, description: string, children: [] }) => {
													return (
														<ThemeItem
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
										<p>No Theme</p>
								}
							</div>
						)
						:
						(
							<span>No such forum</span>
						)
				}
			</div>
		)
	}
}
