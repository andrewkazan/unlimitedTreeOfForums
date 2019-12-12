import React from 'react'
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom'
import { Board } from './../board';
import { CategoryComponent } from './../category-component'
import { observer } from 'mobx-react'

/* <Route path="/forum-component/:id" component={Forum} /> */
/* <Route path="/category:id/forum-component/:id" component={Theme} /> */



@observer
class Navigation extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<Switch>
						<Route path="/" exact component={Board} />
						<Route path="/category/:id" component={CategoryComponent} />
					</Switch>
				</div>
			</BrowserRouter>
		)
	}
}

export { Navigation }
