import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
  grid: {
    width: '100%',
    height: '100%'
  },
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '1em',
    '& > *': {
      margin: '0 auto'
    }
  },
  form: {
    width: '90%',
    margin: '0 auto'
  },
  formcontrol: {
    margin: '1em 0'
  },
  actions: {
    width: '100%',
    margin: '1em auto',
    textAlign: 'center'
  }
}))

export default function Login(props: any) {
  const classes = useStyles()
  const { login, title } = props
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')

  const onLogin = () => {
    if (username === '') {
      setUsernameErrorMessage('The username cannot be empty.')
    }

    if (password === '') {
      setPasswordErrorMessage('The password cannot be empty.')
    }

    if (username !== '' && password !== '') {
      login(username, password)
    }
  }

  const onChange = (event: any) => {
    if (event.keyCode === 13) {
      onLogin()
    } else {
      switch (event.target.name) {
        case 'username':
          setUsername(event.target.value)
          setUsernameErrorMessage('')
          break;
        case 'password':
          setPassword(event.target.value)
          setPasswordErrorMessage('')
          break;
        default:
      }
    }
  }

  return (
    <Grid className={classes.grid}
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={3}>
        <Paper className={classes.paper} elevation={3}>
          <h1>{title}</h1>
          <form className={classes.form} noValidate autoComplete="off">
            <FormControl className={classes.formcontrol} fullWidth>
              <InputLabel htmlFor="username" required>Username</InputLabel>
              <Input id="username" name="username" value={username} onChange={onChange} onKeyDown={onChange} error={usernameErrorMessage !== ''} aria-describedby="username-error" />
              <FormHelperText id="username-error">{usernameErrorMessage}</FormHelperText>
            </FormControl>
            <FormControl className={classes.formcontrol} fullWidth>
              <InputLabel htmlFor="password" required>Password</InputLabel>
              <Input id="password" name="password" type="password" value={password} onChange={onChange} onKeyDown={onChange} error={passwordErrorMessage !== ''} />
              <FormHelperText id="password-error">{passwordErrorMessage}</FormHelperText>
            </FormControl>
            <div className={classes.actions}>
              <Button variant="contained" color="primary" onClick={onLogin}>Log in</Button>
            </div>
          </form>
        </Paper>
      </Grid>
    </Grid>
  )
}
