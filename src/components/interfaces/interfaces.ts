export enum EntityType {
	CATEGORY = 'CATEGORY',
	FORUM = 'FORUM',
	THEME = 'THEME',
	MESSAGE = 'MESSAGE'
}

export interface ITheme {
	id: string
	type: string
	title: string
	description: string
	messages: Array<{ id: string, text: string }>
}

export interface IEntityItem {
	id: string
	type: string
	title: string
	description: string
	children: Array<IEntityItem | ITheme>
}

export interface IEntityCategory {
	id: string
	type: string
	title: string
	description: string
	children: Array<IEntityItem>
}

export interface IParentProps {
	boardController: any
	init: () => void
	store: Array<IEntityCategory>,
	appLocation?: {}
}

export interface IEntityProps {
	children: []
	description: string
	id: string
	title: string
	type: string
}
