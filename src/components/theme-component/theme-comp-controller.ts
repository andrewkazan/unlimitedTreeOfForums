import { observable } from 'mobx'
import { IParentProps } from './../interfaces/interfaces'
import { BaseComponentController } from './../common/base-component-controller'

export class ThemeComponentController extends BaseComponentController {

	@observable
	public parentComponent!: IParentProps

	constructor(parentComponent: any) {
		super(parentComponent)
		this.parentComponent = parentComponent
	}
}
