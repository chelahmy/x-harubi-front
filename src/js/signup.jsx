import React from 'react'
import Form from './form'
import Input from './input'

export default class SignUp extends React.Component {
  constructor(props) {
    super(props)

    this.handleOnFormMount = this.handleOnFormMount.bind(this)
    this.handleOnFormSubmit = this.handleOnFormSubmit.bind(this)
  }

  handleOnFormMount(obj) {
    this.form = obj
  }

  handleOnFormSubmit(ev,frm) {
    // Get data from the form
    let data = new FormData(ev.target)
    let request = {
      model: 'user',
      action: 'signup',
      name: data.get('name'),
      password: data.get('password'),
      email: data.get('email')
    }
    console.log($.param(request))
    // Post the data to the server
    fetch('/backend/serve.php', {
      method: 'POST',
      body: new URLSearchParams($.param(request))
    })
    // On server response
    .then((respond) => {
      if (respond.ok) { // See the fetch() documentation for details
        return respond.json() // pass to the next .then as resp_json
      }
      else
        this.form.callOut('Server Error', 'Could not process the request', 'alert')
    })
    // On server respond.ok (see above)
    .then((resp_json) => {
      // Application implemented response
      if (resp_json.status != 0) {
        //this.form.callOut('Server Response', resp_json.results, 'success')
        this.props.page.navigate(this.props.onSuccessPage)
      }
      else {
        this.form.callOut('Server Response', resp_json.error_message, 'alert')
      }
    })
    // On client or network error
    .catch((error) => {
      this.form.callOut('System Error', 'Could not deliver the request: ' + error, 'alert')
    })
  }

  render() {
    return (
      <Form
        title={this.props.title}
        onSubmit={this.handleOnFormSubmit}
        submitValue="Sign Up" wantReset
        onMount={this.handleOnFormMount}>
        <Input label="Name" name="name" type="text" placeholder="Your user name" pattern="alpha_numeric" required
          errorMessage="An alpha-numeric user name is required. Spaces and symbols are not allowed."/>
        <Input label="E-mail" name="email" type="text" placeholder="Your e-mail address" pattern="email" required
          errorMessage="A valid e-mail address is required."/>
        <Input label="Password" name="password" type="password" placeholder="Your password" required
          errorMessage="Password is required."/>
        <Input label="Re-Enter Password" name="re_password" type="password" placeholder="Re-enter your password" required
          dataEqualTo="password" errorMessage="Passwords mismatched."/>
      </Form>
    )
  }
}
