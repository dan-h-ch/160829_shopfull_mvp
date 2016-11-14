'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShareList = function (_React$Component) {
  _inherits(ShareList, _React$Component);

  function ShareList(props) {
    _classCallCheck(this, ShareList);

    var _this = _possibleConstructorReturn(this, (ShareList.__proto__ || Object.getPrototypeOf(ShareList)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(ShareList, [{
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      e.preventDefault();
      var time = new Date();
      var preparedSubmit = {
        listname: this.state.submitListName,
        // linting error since we are passing directly to db
        create_userid: this.props.userid,
        created_at: new Date(),
        updated_at: new Date()
      };
      // console.log(preparedSubmit)
      this.props.addList(preparedSubmit);
      this.setState({
        submitListName: '',
        submitQuant: 1,
        submitCost: 1
      });
      this.hideShareList();
    }
  }, {
    key: 'hideShareList',
    value: function hideShareList() {
      this.props.hideShareList();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var style = {
        display: this.props.shareDisplayed
      };
      return React.createElement(
        'div',
        { className: 'submit-new-list', style: style },
        React.createElement(
          'div',
          null,
          'Share List'
        ),
        React.createElement(
          'div',
          null,
          'props ',
          this.props.shareDisplayed
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            'form',
            { className: 'submitForm', onSubmit: this.handleSubmit.bind(this) },
            React.createElement('input', { type: 'text', placeholder: 'newlist...', value: this.state.submitListName || '', onChange: function onChange(e) {
                return _this2.updateListName(e);
              } }),
            React.createElement('input', { type: 'submit', value: 'New List!' })
          )
        ),
        React.createElement(
          'div',
          { onClick: function onClick(e) {
              return _this2.hideShareList();
            } },
          'close'
        )
      );
    }
  }]);

  return ShareList;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9TaGFyZUxpc3QuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTSxTOzs7QUFFSixxQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsc0hBQ1gsS0FEVzs7QUFHakIsVUFBSyxLQUFMLEdBQWEsRUFBYjtBQUhpQjtBQUlsQjs7OztpQ0FFWSxDLEVBQUc7QUFDZCxRQUFFLGNBQUY7QUFDQSxVQUFJLE9BQU8sSUFBSSxJQUFKLEVBQVg7QUFDQSxVQUFJLGlCQUFpQjtBQUNuQixrQkFBVSxLQUFLLEtBQUwsQ0FBVyxjQURGO0FBRW5CO0FBQ0EsdUJBQWUsS0FBSyxLQUFMLENBQVcsTUFIUDtBQUluQixvQkFBWSxJQUFJLElBQUosRUFKTztBQUtuQixvQkFBWSxJQUFJLElBQUo7QUFMTyxPQUFyQjtBQU9BO0FBQ0EsV0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixjQUFuQjtBQUNBLFdBQUssUUFBTCxDQUFjO0FBQ1osd0JBQWdCLEVBREo7QUFFWixxQkFBYSxDQUZEO0FBR1osb0JBQVk7QUFIQSxPQUFkO0FBS0EsV0FBSyxhQUFMO0FBQ0Q7OztvQ0FFZTtBQUNkLFdBQUssS0FBTCxDQUFXLGFBQVg7QUFDRDs7OzZCQUVRO0FBQUE7O0FBQ1AsVUFBSSxRQUFRO0FBQ1YsaUJBQVMsS0FBSyxLQUFMLENBQVc7QUFEVixPQUFaO0FBR0EsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGlCQUFmLEVBQWlDLE9BQU8sS0FBeEM7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBREY7QUFFRTtBQUFBO0FBQUE7QUFBQTtBQUFZLGVBQUssS0FBTCxDQUFXO0FBQXZCLFNBRkY7QUFHRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsY0FBTSxXQUFVLFlBQWhCLEVBQTZCLFVBQVUsS0FBSyxZQUFMLENBQWtCLElBQWxCLENBQXVCLElBQXZCLENBQXZDO0FBQ0UsMkNBQU8sTUFBSyxNQUFaLEVBQW1CLGFBQVksWUFBL0IsRUFBNEMsT0FBTyxLQUFLLEtBQUwsQ0FBVyxjQUFYLElBQTZCLEVBQWhGLEVBQW9GLFVBQVUsa0JBQUMsQ0FBRDtBQUFBLHVCQUFPLE9BQUssY0FBTCxDQUFvQixDQUFwQixDQUFQO0FBQUEsZUFBOUYsR0FERjtBQUVFLDJDQUFPLE1BQUssUUFBWixFQUFxQixPQUFNLFdBQTNCO0FBRkY7QUFERixTQUhGO0FBU0U7QUFBQTtBQUFBLFlBQUssU0FBUyxpQkFBQyxDQUFEO0FBQUEscUJBQU8sT0FBSyxhQUFMLEVBQVA7QUFBQSxhQUFkO0FBQUE7QUFBQTtBQVRGLE9BREY7QUFlRDs7OztFQW5EcUIsTUFBTSxTIiwiZmlsZSI6IlNoYXJlTGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFNoYXJlTGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge307XG4gIH1cblxuICBoYW5kbGVTdWJtaXQoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgdGltZSA9IG5ldyBEYXRlKCk7XG4gICAgdmFyIHByZXBhcmVkU3VibWl0ID0ge1xuICAgICAgbGlzdG5hbWU6IHRoaXMuc3RhdGUuc3VibWl0TGlzdE5hbWUsXG4gICAgICAvLyBsaW50aW5nIGVycm9yIHNpbmNlIHdlIGFyZSBwYXNzaW5nIGRpcmVjdGx5IHRvIGRiXG4gICAgICBjcmVhdGVfdXNlcmlkOiB0aGlzLnByb3BzLnVzZXJpZCxcbiAgICAgIGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKCksXG4gICAgICB1cGRhdGVkX2F0OiBuZXcgRGF0ZSgpXG4gICAgfTtcbiAgICAvLyBjb25zb2xlLmxvZyhwcmVwYXJlZFN1Ym1pdClcbiAgICB0aGlzLnByb3BzLmFkZExpc3QocHJlcGFyZWRTdWJtaXQpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc3VibWl0TGlzdE5hbWU6ICcnLFxuICAgICAgc3VibWl0UXVhbnQ6IDEsXG4gICAgICBzdWJtaXRDb3N0OiAxXG4gICAgfSk7XG4gICAgdGhpcy5oaWRlU2hhcmVMaXN0KCk7XG4gIH1cblxuICBoaWRlU2hhcmVMaXN0KCkge1xuICAgIHRoaXMucHJvcHMuaGlkZVNoYXJlTGlzdCgpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciBzdHlsZSA9IHtcbiAgICAgIGRpc3BsYXk6IHRoaXMucHJvcHMuc2hhcmVEaXNwbGF5ZWRcbiAgICB9O1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nc3VibWl0LW5ldy1saXN0JyBzdHlsZT17c3R5bGV9PlxuICAgICAgICA8ZGl2PlNoYXJlIExpc3Q8L2Rpdj5cbiAgICAgICAgPGRpdj5wcm9wcyB7dGhpcy5wcm9wcy5zaGFyZURpc3BsYXllZH08L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJzdWJtaXRGb3JtXCIgb25TdWJtaXQ9e3RoaXMuaGFuZGxlU3VibWl0LmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJuZXdsaXN0Li4uXCIgdmFsdWU9e3RoaXMuc3RhdGUuc3VibWl0TGlzdE5hbWUgfHwgJyd9IG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy51cGRhdGVMaXN0TmFtZShlKX0gLz5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJOZXcgTGlzdCFcIiAvPlxuICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgb25DbGljaz17KGUpID0+IHRoaXMuaGlkZVNoYXJlTGlzdCgpfT5cbiAgICAgICAgICBjbG9zZVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0iXX0=