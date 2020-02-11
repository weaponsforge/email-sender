var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PlayGround = function PlayGround() {
  var btnRef = React.createRef();
  var authRef = React.createRef();
  var codeRef = React.createRef();

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      sending = _React$useState2[0],
      setSending = _React$useState2[1];

  var _React$useState3 = React.useState({
    authurl: '',
    code: ''
  }),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      form = _React$useState4[0],
      setForm = _React$useState4[1];

  React.useEffect(function () {
    var text = btnRef.current.innerText;
    btnRef.current.innerText = sending ? text + '...' : text.replace('...', '');
  });

  var updateForm = function updateForm(e) {
    var _e$target = e.target,
        id = _e$target.id,
        value = _e$target.value;

    setForm(Object.assign({}, form, _defineProperty({}, id, value)));
  };

  // Get authorization URL
  var getAuthUrl = function getAuthUrl() {
    var authfield = authRef.current;
    setSending(true);

    axios.post('/authurl').then(function (_ref) {
      var data = _ref.data;

      setSending(false);
      authfield.value = data;
    }).catch(function (error) {
      setSending(false);
      authfield.value = error.response.data;
    });
  };

  var getAccessToken = function getAccessToken() {
    var codefield = codeRef.current;
    setSending(true);

    axios.post('/accesstoken', { code: form.code }).then(function (_ref2) {
      var data = _ref2.data;

      setSending(false);
      var access_token = data.access_token,
          scope = data.scope,
          token_type = data.token_type,
          expiry_date = data.expiry_date;

      codefield.value = access_token;
      console.log(data);
    }).catch(function (error) {
      setSending(false);
      codefield.value = error.response.data;
    });
  };

  return React.createElement(
    'form',
    { action: '#' },
    React.createElement(
      'h3',
      null,
      'Local Google OAuth2 Playground'
    ),
    React.createElement(
      'div',
      null,
      React.createElement(
        'label',
        null,
        'AuthURL'
      ),
      React.createElement('input', { id: 'authurl', type: 'text', ref: authRef, onChange: updateForm, placeholder: 'Press the Get Auth URL button. Open the url to another tab.' }),
      React.createElement(
        'button',
        { ref: btnRef, onClick: getAuthUrl },
        'Get Auth URL'
      )
    ),
    React.createElement(
      'div',
      null,
      React.createElement(
        'label',
        null,
        'Code'
      ),
      React.createElement('input', { id: 'code', type: 'text', ref: codeRef, onChange: updateForm, placeholder: 'Enter Code Here' }),
      React.createElement(
        'button',
        { ref: btnRef, onClick: getAccessToken },
        'Get Access Token'
      )
    )
  );
};

var loadApp = function loadApp() {
  ReactDOM.render(React.createElement(PlayGround, null), document.querySelector('#root'));
};