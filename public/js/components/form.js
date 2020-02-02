const Form = function() {
  const [form, setForm] = React.useState({ title: '', message: ''})

  const updateForm = (e) => {
    const { id, value } = e.target
    setForm({...form, [id]: value })
  }

  const sendMail = (e) => {
    e.preventDefault()
    console.log(`title: ${form.title}, message: ${form.message}`)

    axios.post('/send', {
      title: title.value,
      message: message.value
    })
      .then(({data}) => {
        console.log('done')
        console.log(data)
      })
      .catch(error => {
        console.log('error!')
        console.log(error)
      })
  }

  return (
    <form action="#">
      <label>Title</label>
      <input id="title" type="text" onChange={updateForm} />
      <label>Message</label>
      <textarea id="message" onChange={updateForm}></textarea>
      <button onClick={sendMail}>Send</button>
    </form>
  )
}

const loadApp = function() {
  ReactDOM.render(<Form />, document.querySelector('#root'))
}