import { action, observable } from 'mobx'
import { BoardController } from './components/board/board-controller'
import { CategoryComponentController } from './components/category-component/category-comp-controller'
import { ForumComponentController } from './components/forum-component/forum-comp-controller'
import { ThemeComponentController } from "./components/theme-component/theme-comp-controller"
import { BaseComponentController } from './components/common'
import { IEntityCategory } from './components/interfaces/interfaces'

export class AppController {

	@observable
	public boardController!: BoardController

	@observable
	public baseComponentController!: BaseComponentController

	@observable
	public categoryComponentController!: CategoryComponentController

	@observable
	public forumComponentController!: ForumComponentController

	@observable
	public themeComponentController!: ThemeComponentController

	@observable
	public store = Array<IEntityCategory>()

	@observable
	public appLocation: {} | null = null

	@observable
	public currentLocationForKey: Array<any> = []

	public init = () => {
		this.checkLocalStorage()
		this.boardController = new BoardController(this)
		this.baseComponentController = new BaseComponentController(this)
		this.forumComponentController = new ForumComponentController(this)
		this.categoryComponentController = new CategoryComponentController(this)
		this.forumComponentController = new ForumComponentController(this)
		this.themeComponentController = new ThemeComponentController(this)
	}

	constructor(location: any) {
		this.appLocation = location
		this.init()
	}

	// Check localStorage and set data from localStorage
	@action
	public checkLocalStorage = () => {
		if (typeof Storage === null) {
			console.log('--- localStorage is not support. This app is will be not working ---')
			alert('--- localStorage is not support. This app is will be not working ---')
		} else {
			if ((JSON.parse(localStorage.getItem('ForumApp') as any)) !== null) {
				this.store = JSON.parse(localStorage.getItem('ForumApp') as any)
			}
		}
	}
}
