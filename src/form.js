const Form = function() {
  const [form, setForm] = React.useState({ subject: '', message: '', to: '', from: ''})
  const [sending, setSending] = React.useState(false)
  const btnRef = React.createRef()

  React.useEffect(() => {
    btnRef.current.innerText = (sending) ? 'Sending...' : 'Send'
  })

  const updateForm = (e) => {
    const { id, value } = e.target
    setForm({...form, [id]: value })
  }

  const sendMail = (e) => {
    e.preventDefault()
    setSending(true)
    console.log(`subject: ${form.subject}, message: ${form.message}`)

    console.log(form)
    axios.post('/send', form)
      .then(({ data }) => {
        console.log('done')
        console.log(data)
        setSending(false)
        alert('Email sent.')
      })
      .catch(error => {
        console.log('error!')
        console.log(error)
        setSending(false)
        alert('Error sending email')
      })
  }

  return (
    <form action="#">
      <h3>Send Email</h3>
      {/** To field */}
      <label>To</label>
      <input id="to" type="text" onChange={updateForm} />
      {/** From field */}
      <label>From</label>
      <input id="from" type="text" onChange={updateForm} value="hvullc.bot@gmail.com" disabled />      
      {/** Subject/Title field */}
      <label>Subject</label>
      <input id="subject" type="text" onChange={updateForm} />
      {/** Message content field */}
      <label>Message</label>
      <textarea id="message"
        cols="10"
        rows="10"
        onChange={updateForm}></textarea>
      {/** Submit button */}
      <button ref={btnRef} onClick={sendMail}>Send</button>
    </form>
  )
}

const loadApp = function() {
  ReactDOM.render(<Form />, document.querySelector('#root'))
}