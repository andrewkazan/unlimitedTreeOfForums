import React, { Component } from 'react'
import './App.scss'
import { observer } from 'mobx-react'
import { AppController } from './App-controller'
import { Board } from './components/board/board'
import { CategoryComponent } from './components/category-component'
import { ForumComponent } from './components/forum-component'
import { ThemeComponent } from './components/theme-component'
import './index.scss'
import { Route, Switch, withRouter } from 'react-router-dom'


interface Props {
  appController: InstanceType<typeof AppController>
  location: { pathname: string }
}

@observer
class App extends Component<Props> {

  private appController!: AppController

  public initAppController() {
    this.appController = new AppController(this.props.location)
  }

  constructor(props: Props) {
    super(props)
    this.initAppController()
  }

  public render() {
    return (
      <div className="App">
        <div>
          <Switch>
            <Route path="/" exact>
              <Board manager={ this.appController.boardController }/>
            </Route>
            <Route path="/category/:id">
              <CategoryComponent manager={ this.appController.categoryComponentController }/>
            </Route>
            <Route path="/forum/:id">
              <ForumComponent
                key={ this.props.location.pathname }
                manager={ this.appController.forumComponentController }
              />
            </Route>
            <Route path="/theme/:id">
              <ThemeComponent
                key={ this.props.location.pathname }
                manager={ this.appController.themeComponentController }
              />
            </Route>
          </Switch>
        </div>
      </div>
    )
  }
}

export default withRouter((App) as any)
