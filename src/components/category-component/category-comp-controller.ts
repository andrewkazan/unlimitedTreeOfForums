import { BaseComponentController } from './../common/base-component-controller'

export class CategoryComponentController extends BaseComponentController {

	constructor(parentComponent: any) {
		super(parentComponent)
		this.parentComponent = parentComponent
	}
}
