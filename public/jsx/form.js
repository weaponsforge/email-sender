var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Form = function Form() {
  var _React$useState = React.useState({ subject: '', message: '', to: '', from: '' }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      form = _React$useState2[0],
      setForm = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      sending = _React$useState4[0],
      setSending = _React$useState4[1];

  var btnRef = React.createRef();

  React.useEffect(function () {
    btnRef.current.innerText = sending ? 'Sending...' : 'Send';
  });

  var updateForm = function updateForm(e) {
    var _e$target = e.target,
        id = _e$target.id,
        value = _e$target.value;

    setForm(Object.assign({}, form, _defineProperty({}, id, value)));
  };

  var sendMail = function sendMail(e) {
    e.preventDefault();
    setSending(true);
    console.log('subject: ' + form.subject + ', message: ' + form.message);

    console.log(form);
    axios.post('/send', form).then(function (_ref) {
      var data = _ref.data;

      console.log('done');
      console.log(data);
      setSending(false);
      alert('Email sent.');
    }).catch(function (error) {
      console.log('error!');
      console.log(error);
      setSending(false);
      alert('Error sending email');
    });
  };

  return React.createElement(
    'form',
    { action: '#' },
    React.createElement(
      'h3',
      null,
      'Send Email'
    ),
    React.createElement(
      'label',
      null,
      'To'
    ),
    React.createElement('input', { id: 'to', type: 'text', onChange: updateForm }),
    React.createElement(
      'label',
      null,
      'From'
    ),
    React.createElement('input', { id: 'from', type: 'text', onChange: updateForm, value: 'hvullc.bot@gmail.com', disabled: true }),
    React.createElement(
      'label',
      null,
      'Subject'
    ),
    React.createElement('input', { id: 'subject', type: 'text', onChange: updateForm }),
    React.createElement(
      'label',
      null,
      'Message'
    ),
    React.createElement('textarea', { id: 'message',
      cols: '10',
      rows: '10',
      onChange: updateForm }),
    React.createElement(
      'button',
      { ref: btnRef, onClick: sendMail },
      'Send'
    )
  );
};

var loadApp = function loadApp() {
  ReactDOM.render(React.createElement(Form, null), document.querySelector('#root'));
};