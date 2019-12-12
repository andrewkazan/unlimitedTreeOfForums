import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { BoardController } from './board-controller'
import { CategoryAdd } from './../category-add'
import { CategoryItem } from '../category-item'
import './styles.scss'

interface IProps {
	manager: InstanceType<typeof BoardController>;
}

@observer
export class Board extends Component<IProps> {

	render() {

		const { addCategory, isAddCategory, changeInputField,
			saveCategory, deleteCategoryHandler, cancelSaveCategory, getStore,
			saveChangesEditCategory
		} = this.props.manager

		return (
			<div className="container">
				<h1>Main board</h1>
				<button onClick={ addCategory }>Add Category</button>
					{
						isAddCategory && (
							<CategoryAdd
								inputFunc={ changeInputField }
								saveCategory = { saveCategory }
								cancelSaveCategory={ cancelSaveCategory }
							/>
						)
					}
				<div className="categoryWrapper">
					{
						getStore.map((item) => {
								return (
									<CategoryItem
										key={ item.id }
										id={ item.id }
										title={ item.title }
										description={ item.description }
										children={ item.children }
										deleteFunc={ deleteCategoryHandler }
										inputFunc={ changeInputField }
										saveChangesEditCategory={ saveChangesEditCategory }
									/>
								)
							}
						)
					}
				</div>
			</div>
		)
	}
}

