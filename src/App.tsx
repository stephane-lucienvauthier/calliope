import React from 'react'
import './App.css'
import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import { LoginApi } from './services/Api'
import Login from './components/Login'
import User from './models/User'


function Alert(props: any) {
  return (<MuiAlert elevation={6} variant="filled" {...props} />)
}

interface Props {
  title: string
  loginApi: LoginApi
}

interface State {
  connected: boolean
  snackbarMessage: string
  snackbarSeverity: string
}

export default class App extends React.Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props)
    this.state = {
      connected: false,
      snackbarMessage: '',
      snackbarSeverity: ''
    }
    this.onLogin = this.onLogin.bind(this)
    this.onCloseSnackbar = this.onCloseSnackbar.bind(this)
  }

  onCloseSnackbar(): void {
    this.setState({
      snackbarMessage: ''
    })
  }

  async onLogin(username: string, password: string): Promise<void> {
    const user: User = await this.props.loginApi.authenticate(username, password)
    if (user) {
      this.setState({ connected: true })
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      this.setState({
        snackbarMessage: 'The login / Username does not exist.',
        snackbarSeverity: 'error'
      })
    }
  }

  render(): JSX.Element {
    return (
      <div className="App">
        {
          !this.state.connected && <Login login={this.onLogin} title={this.props.title} />
        }
        <Snackbar open={this.state.snackbarMessage !== ''} autoHideDuration={6000} onClose={this.onCloseSnackbar}>
          <Alert onClose={this.onCloseSnackbar} severity={this.state.snackbarSeverity}>{this.state.snackbarMessage}</Alert>
        </Snackbar>
      </div>
    )
  }
}
