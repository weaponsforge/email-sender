const PlayGround = function() {
  const btnRef = React.createRef()
  const authRef = React.createRef()
  const [sending, setSending] = React.useState(false)
  const [form, setForm] = React.useState({
    authurl: '',
    code: '',
  })

  React.useEffect(() => {
    let text = btnRef.current.innerText
    btnRef.current.innerText = (sending) ? `${text}...` : text.replace('...', '')
  })

  const updateForm = (e) => {
    const { id, value } = e.target
    setForm({...form, [id]:value })
  }

  // Get authorization URL
  const getAuthUrl = () => {
    const authfield = authRef.current
    setSending(true)

    axios.post('/authurl')
      .then(({ data }) => {
        setSending(false)
        authfield.value = data
      })
      .catch((error) => {
        setSending(false)
      })
  }

  const getAccessToken = () => {
    console.log(form.code)
    axios.post('/accesstoken', { code: form.code })
      .then(({ data }) => {
        const { access_token, scope, token_type, expiry_date } = data
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <form action="#">
      <h3>Local Google OAuth2 Playground</h3>
      {/** To field */}
      <div>
        <label>AuthURL</label>
        <input id="authurl" type="text" ref={authRef} onChange={updateForm} placeholder="Press the Get Auth URL button. Open the url to another tab." />
        {/** Auth URL button */}
        <button ref={btnRef} onClick={getAuthUrl}>Get Auth URL</button>
      </div>
 
      <div>
        {/** From field */}
        <label>Code</label>
        <input id="code" type="text" onChange={updateForm} placeholder="Enter Code Here" />      
        <button ref={btnRef} onClick={getAccessToken}>Get Access Token</button>
      </div>
    </form>    
  )
}

const loadApp = function() {
  ReactDOM.render(<PlayGround />, document.querySelector('#root'))
}