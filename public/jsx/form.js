"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Form = function Form() {
  var _React$useState = React.useState({
    subject: '',
    message: '',
    to: '',
    from: ''
  }),
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
    setForm(_objectSpread(_objectSpread({}, form), {}, _defineProperty({}, id, value)));
  };

  var sendMail = function sendMail(e) {
    e.preventDefault();
    setSending(true);
    console.log("subject: ".concat(form.subject, ", message: ").concat(form.message));
    axios.post('/send', form).then(function (_ref) {
      var data = _ref.data;
      setSending(false);
      alert('Email sent.');
    })["catch"](function (error) {
      setSending(false);
      alert(error.response.data);
    });
  };

  return /*#__PURE__*/React.createElement("form", {
    action: "#"
  }, /*#__PURE__*/React.createElement("h3", null, "Send Email"), /*#__PURE__*/React.createElement("label", null, "To"), /*#__PURE__*/React.createElement("input", {
    id: "to",
    type: "text",
    onChange: updateForm
  }), /*#__PURE__*/React.createElement("label", null, "From"), /*#__PURE__*/React.createElement("input", {
    id: "from",
    type: "text",
    onChange: updateForm,
    value: "hvullc.bot@gmail.com",
    disabled: true
  }), /*#__PURE__*/React.createElement("label", null, "Subject"), /*#__PURE__*/React.createElement("input", {
    id: "subject",
    type: "text",
    onChange: updateForm
  }), /*#__PURE__*/React.createElement("label", null, "Message"), /*#__PURE__*/React.createElement("textarea", {
    id: "message",
    cols: "10",
    rows: "10",
    onChange: updateForm
  }), /*#__PURE__*/React.createElement("button", {
    ref: btnRef,
    onClick: sendMail
  }, "Send"));
};

var loadApp = function loadApp() {
  ReactDOM.render( /*#__PURE__*/React.createElement(Form, null), document.querySelector('#root'));
};