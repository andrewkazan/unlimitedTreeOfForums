import { action, computed, observable, toJS } from 'mobx'
import { EntityType, IEntityCategory, IEntityItem, IEntityProps, IParentProps } from './../interfaces/interfaces'

const uuidv1 = require('uuid/v1')

/*
*  This controller contains same logic for:
*  - category component
*  - forum component
*  - theme component
*  - message component
* *
* */

export class BaseComponentController {

	@observable
	public deliveredEntity: IEntityProps = {
		children: [],
		description: '',
		id: '',
		title: '',
		type: ''
	}

	@observable
	public deliveredEntityForChange: IEntityProps = {
		children: [],
		description: '',
		id: '',
		title: '',
		type: ''
	}

	@observable
	public parentComponent: IParentProps

	@observable
	public isAddForum: boolean = false

	@observable
	public isAddTheme: boolean = false

	@observable
	public isAddMessage: boolean = false

	@observable
	public formInputItem: IEntityItem = {
		id: '',
		type: '',
		title: '',
		description: '',
		children: []
	}

	@observable
	public foundedNestedObj: any = {}

	@observable
	public pathToNestedObj: any = []

	constructor(parent: any) {
		this.parentComponent = parent
	}

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

	// Adding Item
	@action
	public addItem = (type: EntityType) => {
		switch (type) {
			case EntityType.FORUM:
				this.isAddForum = true
				this.isAddTheme = false
				this.isAddMessage = false
				break
			case EntityType.THEME:
				this.isAddForum = false
				this.isAddTheme = true
				this.isAddMessage = false
				break
			case EntityType.MESSAGE:
				this.isAddForum = false
				this.isAddTheme = false
				this.isAddMessage = true
				break
		}
	}

	// Clearing Forum, Theme, Item
	@action
	public clearFormInput = () => {
		this.formInputItem = {
			id: '',
			type: '',
			title: '',
			description: '',
			children: []
		}
	}

	//	save changes in localStorage
	/*	TODO we can't set deep nested obj to localStorage, because it's string.
			We set new array to localStorage, it's over writing all state in localStorage
	*/
	@action
	public saveAnyItemToLocalStorage = (store: Array<IEntityCategory>) => {

		localStorage.setItem('ForumApp', JSON.stringify(store))
	}

	// Saving Forum, Theme, Message
	@action
	public saveItem = (parentId: string) => {
		this.isAddForum = false
		this.isAddTheme = false
		this.isAddMessage = false

		const keyId = uuidv1()

		this.formInputItem.id = keyId
		let value = toJS(this.formInputItem)

		const store = this.parentComponent.store
		let findParentForAddChildren = this.findNested(store, parentId)

		findParentForAddChildren.children.push(value)

		this.saveAnyItemToLocalStorage(store)

		this.clearFormInput()
		this.getEntityFromUrl(parentId)
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

	// Delete Forum, Theme, Message
	@action
	public deleteItemHandler = (e: any, selfId: string, parentId: string) => {
		e.preventDefault()
		this.deleteNestedItem(this.parentComponent.store, selfId)
		this.getEntityFromUrl(parentId)

		let middleObj = (JSON.parse(localStorage.getItem('ForumApp') as any))
		this.deleteToLocalStorage(middleObj, this.getStore)
	}

	@action
	public cancelSaveItem = () => {
		this.clearFormInput()
		this.isAddForum = false
		this.isAddTheme = false
		this.isAddMessage = false
	}

	// Push nested item after edit save
	@action
	public pushNestedItemAfterEdit = (arr: any, id: string) => {
		arr.findIndex((item: any, index: number) => {
			for (let key in item) {
				if (item[key] === id) {
					if (this.formInputItem.title !== '') {
						this.deliveredEntityForChange.title = this.formInputItem.title
					}
					if (this.formInputItem.description !== '') {
						this.deliveredEntityForChange.description = this.formInputItem.description
					}
					arr.splice(index, 1, this.deliveredEntityForChange)
				} else if (typeof item[key] === 'object') {
					this.pushNestedItemAfterEdit(item[key], id)
				}
			}
		})
	}

	// Save edit changes Items
	@action
	public saveChangesEditItems = (event: any, id: string, parentId: string) => {
		this.deliveredEntityForChange = this.findNested(this.getStore, id)
		this.pushNestedItemAfterEdit(this.parentComponent.store, id)
		let newStoreToLocalStorage = toJS(this.parentComponent.store)
		localStorage.setItem('ForumApp', JSON.stringify(newStoreToLocalStorage))
		this.clearFormInput()
		this.getEntityFromUrl(parentId)
	}

	@action
	public changeInputField = (event: React.FormEvent<HTMLInputElement>, type: string ) => {
		this.formInputItem.type = type
		if (event.currentTarget.name === 'title') {
			this.formInputItem.title = event.currentTarget.value
		} else if (event.currentTarget.name === 'description') {
			this.formInputItem.description = event.currentTarget.value
		}
	}

	@action
	public getEntityFromUrl = (url: string) => {
		const regEx = /[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/
		const entityId: any = url.match(regEx)
		const store = toJS(this.parentComponent.store)
		const findItem = this.findNested(store, entityId[0])

		if (!!toJS(findItem).id) {
			this.deliveredEntity = findItem
		}
	}

	@action
	public buildPathToNestedObj = (store: any, id: string) => {
		const item = (p: any) => (a: any) => {
			if (a.id === id) {
				this.pathToNestedObj = p.concat(a.title);
				return true;
			}
			return Array.isArray(a.children) && a.children.some(item(p.concat(a.title)))
		};

		store.some(item([]));
	}

	@action
	public clearPathWhenUnmount = () => {
		this.pathToNestedObj = []
	}

	@computed
	public get getItemFromStore() {
		return toJS(this.deliveredEntity)
	}

	@computed
	public get getParentId() {
		return toJS(this.deliveredEntity.id)
	}

	@computed
	public get getStore() {
		return toJS(this.parentComponent.store)
	}

	@computed
	public get getPathToEntity() {
		const path = this.pathToNestedObj.join('/')
		return path
	}
}
