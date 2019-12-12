import { computed, observable } from 'mobx'
import { EntityType, IParentProps } from './../interfaces/interfaces'
import { BaseComponentController } from './../common/base-component-controller'

export class ForumComponentController extends BaseComponentController {

	@observable
	public parentComponent!: IParentProps

	constructor(parentComponent: any) {
		super(parentComponent)
		this.parentComponent = parentComponent
	}

	@computed
	public get getEntityChildrenForum() {
		return this.deliveredEntity.children.filter((item: any) => {
			return item.type === EntityType.FORUM
		})
	}

	@computed
	public get getEntityChildrenTheme() {
		return this.deliveredEntity.children.filter((item: any) => {
			return item.type === EntityType.THEME
		})
	}
}
