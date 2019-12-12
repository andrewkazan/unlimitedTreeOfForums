import { action, computed, observable, toJS } from 'mobx'
import { IEntityCategory, IEntityProps } from './../interfaces/interfaces'
const uuidv1 = require('uuid/v1')

interface IParentProps {
	boardController: any
	init: () => void
	store: Array<IEntityCategory>
	categoryComponentController: any
}

export class BoardController {

	@observable
	public parentComponent: IParentProps

	@observable
	public isAddCategory: boolean = false

	@observable
	public formInputCategory: IEntityCategory = {
		id: '',
		type: '',
		title: '',
		description: '',
		children: []
	}

	@observable
	public foundedNestedObj: any = {}

	@observable
	public deliveredEntity: IEntityProps = {
		children: [],
		description: '',
		id: '',
		title: '',
		type: ''
	}

	constructor(parent: any) {
		this.parentComponent = parent
	}

	@action
	public addCategory = () => {
		this.isAddCategory = true
	}

	@action
	public clearFormInputCategory = () => {
		this.formInputCategory = {
			id: '',
			type: '',
			title: '',
			description: '',
			children: []
		}
	}

	// save changes in localStorage
	@action
	public saveToLocalStorage = (middleObj: Array<IEntityCategory>, value: IEntityCategory) => {
		if (middleObj === null) {
			middleObj = []
			middleObj.push(value)
			localStorage.setItem('ForumApp', JSON.stringify(middleObj))
		} else {
			middleObj.push(value)
			localStorage.setItem('ForumApp', JSON.stringify(middleObj))
		}
	}

	@action
	public saveCategory = () => {
		this.isAddCategory = false

		const keyId = uuidv1()

		this.formInputCategory.id = keyId

		let value = toJS(this.formInputCategory)
		let middleObj = (JSON.parse(localStorage.getItem('ForumApp') as any))
		this.saveToLocalStorage(middleObj, value)
		this.parentComponent.store.push(value)
		this.clearFormInputCategory()
	}

	// delete changes in localStorage
	@action
	public deleteToLocalStorage = (middleObj: Array<IEntityCategory>, store: Array<IEntityCategory>) => {
		middleObj = store
		localStorage.setItem('ForumApp', JSON.stringify(middleObj))
	}

	// Handler for delete deep nested obj from store
	@action
	public deleteNestedItem = (arr: any, id: string) => {
		arr.findIndex((item: any, index: number) => {
			for (let key in item) {
				if (item[key] === id) {
					arr.splice(index, 1)
				} else if (typeof item[key] === 'object') {
					this.deleteNestedItem(item[key], id)
				}
			}
		})
	}

	// Delete Category
	@action
	public deleteCategoryHandler = (e: any, selfId: string) => {
		e.preventDefault()
		this.deleteNestedItem(this.parentComponent.store, selfId)

		let middleObj = (JSON.parse(localStorage.getItem('ForumApp') as any))
		this.deleteToLocalStorage(middleObj, this.getStore)
	}

	@action
	public findNested = (arr: any, id: string): any => {
		arr.find((item: any) => {
			for (let key in item) {
				if (item[key] === id) {
					this.foundedNestedObj = item
				} else if (typeof item[key] === 'object') {
					this.findNested(item[key], id)
				}
			}
		})
		return this.foundedNestedObj;
	}

	// Push nested item after edit save
	@action
	public pushNestedItemAfterEdit = (arr: any, id: string) => {
		arr.findIndex((item: any, index: number) => {
			for (let key in item) {
				if (item[key] === id) {
					if (this.formInputCategory.title !== '') {
						this.deliveredEntity.title = this.formInputCategory.title
					}
					if (this.formInputCategory.description !== '') {
						this.deliveredEntity.description = this.formInputCategory.description
					}
					this.parentComponent.store.splice(index, 1, this.deliveredEntity)
				} else if (typeof item[key] === 'object') {
					this.pushNestedItemAfterEdit(item[key], id)
				}
			}
		})
	}

	// Save edit changes
	@action
	public saveChangesEditCategory = (event: any, id: string) => {
		this.deliveredEntity = this.findNested(this.getStore, id)
		this.pushNestedItemAfterEdit(this.getStore, id)
		let newStoreToLocalStorage = toJS(this.parentComponent.store)
		localStorage.setItem('ForumApp', JSON.stringify(newStoreToLocalStorage))
		this.clearFormInputCategory()
	}

	// Change field text
	@action
	public cancelSaveCategory = () => {
		this.clearFormInputCategory()
		this.isAddCategory = false
	}

	@action
	public changeInputField = (event: React.FormEvent<HTMLInputElement>, type: string) => {
			this.formInputCategory.type = type
			if (event.currentTarget.name === 'title') {
				this.formInputCategory.title = event.currentTarget.value
			} else if (event.currentTarget.name === 'description') {
				this.formInputCategory.description = event.currentTarget.value
			}
	}

	@computed
	public get getStore() {
		return toJS(this.parentComponent.store)
	}
}
