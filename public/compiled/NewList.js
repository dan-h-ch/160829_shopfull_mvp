'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NewList = function (_React$Component) {
  _inherits(NewList, _React$Component);

  function NewList(props) {
    _classCallCheck(this, NewList);

    var _this = _possibleConstructorReturn(this, (NewList.__proto__ || Object.getPrototypeOf(NewList)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(NewList, [{
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      e.preventDefault();
      var time = new Date();
      console.log(time);
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
    }
  }, {
    key: 'updateListName',
    value: function updateListName(e) {
      this.setState({
        submitListName: e.target.value
      });
    }
  }, {
    key: 'hideNewList',
    value: function hideNewList() {
      this.props.hideNewList();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var style = {
        display: this.props.displayed
      };
      return React.createElement(
        'div',
        { className: 'submit-new-list', style: style },
        React.createElement(
          'div',
          null,
          'Add New List'
        ),
        React.createElement(
          'div',
          null,
          'props ',
          this.props.displayed
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
              return _this2.hideNewList();
            } },
          'close'
        )
      );
    }
  }]);

  return NewList;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9OZXdMaXN0LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sTzs7O0FBRUosbUJBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLGtIQUNYLEtBRFc7O0FBR2pCLFVBQUssS0FBTCxHQUFhLEVBQWI7QUFIaUI7QUFJbEI7Ozs7aUNBRVksQyxFQUFHO0FBQ2QsUUFBRSxjQUFGO0FBQ0EsVUFBSSxPQUFPLElBQUksSUFBSixFQUFYO0FBQ0EsY0FBUSxHQUFSLENBQVksSUFBWjtBQUNBLFVBQUksaUJBQWlCO0FBQ25CLGtCQUFVLEtBQUssS0FBTCxDQUFXLGNBREY7QUFFbkI7QUFDQSx1QkFBZSxLQUFLLEtBQUwsQ0FBVyxNQUhQO0FBSW5CLG9CQUFZLElBQUksSUFBSixFQUpPO0FBS25CLG9CQUFZLElBQUksSUFBSjtBQUxPLE9BQXJCO0FBT0E7QUFDQSxXQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLGNBQW5CO0FBQ0EsV0FBSyxRQUFMLENBQWM7QUFDWix3QkFBZ0IsRUFESjtBQUVaLHFCQUFhLENBRkQ7QUFHWixvQkFBWTtBQUhBLE9BQWQ7QUFLRDs7O21DQUVjLEMsRUFBRztBQUNoQixXQUFLLFFBQUwsQ0FBYztBQUNaLHdCQUFnQixFQUFFLE1BQUYsQ0FBUztBQURiLE9BQWQ7QUFHRDs7O2tDQUVhO0FBQ1osV0FBSyxLQUFMLENBQVcsV0FBWDtBQUNEOzs7NkJBRVE7QUFBQTs7QUFDUCxVQUFJLFFBQVE7QUFDVixpQkFBUyxLQUFLLEtBQUwsQ0FBVztBQURWLE9BQVo7QUFHQSxhQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsaUJBQWYsRUFBaUMsT0FBTyxLQUF4QztBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FERjtBQUVFO0FBQUE7QUFBQTtBQUFBO0FBQVksZUFBSyxLQUFMLENBQVc7QUFBdkIsU0FGRjtBQUdFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxjQUFNLFdBQVUsWUFBaEIsRUFBNkIsVUFBVSxLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBdkM7QUFDRSwyQ0FBTyxNQUFLLE1BQVosRUFBbUIsYUFBWSxZQUEvQixFQUE0QyxPQUFPLEtBQUssS0FBTCxDQUFXLGNBQVgsSUFBNkIsRUFBaEYsRUFBb0YsVUFBVSxrQkFBQyxDQUFEO0FBQUEsdUJBQU8sT0FBSyxjQUFMLENBQW9CLENBQXBCLENBQVA7QUFBQSxlQUE5RixHQURGO0FBRUUsMkNBQU8sTUFBSyxRQUFaLEVBQXFCLE9BQU0sV0FBM0I7QUFGRjtBQURGLFNBSEY7QUFTRTtBQUFBO0FBQUEsWUFBSyxTQUFTLGlCQUFDLENBQUQ7QUFBQSxxQkFBTyxPQUFLLFdBQUwsRUFBUDtBQUFBLGFBQWQ7QUFBQTtBQUFBO0FBVEYsT0FERjtBQWVEOzs7O0VBekRtQixNQUFNLFMiLCJmaWxlIjoiTmV3TGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIE5ld0xpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHt9O1xuICB9XG5cbiAgaGFuZGxlU3VibWl0KGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIHRpbWUgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnNvbGUubG9nKHRpbWUpO1xuICAgIHZhciBwcmVwYXJlZFN1Ym1pdCA9IHtcbiAgICAgIGxpc3RuYW1lOiB0aGlzLnN0YXRlLnN1Ym1pdExpc3ROYW1lLFxuICAgICAgLy8gbGludGluZyBlcnJvciBzaW5jZSB3ZSBhcmUgcGFzc2luZyBkaXJlY3RseSB0byBkYlxuICAgICAgY3JlYXRlX3VzZXJpZDogdGhpcy5wcm9wcy51c2VyaWQsXG4gICAgICBjcmVhdGVkX2F0OiBuZXcgRGF0ZSgpLFxuICAgICAgdXBkYXRlZF9hdDogbmV3IERhdGUoKVxuICAgIH07XG4gICAgLy8gY29uc29sZS5sb2cocHJlcGFyZWRTdWJtaXQpXG4gICAgdGhpcy5wcm9wcy5hZGRMaXN0KHByZXBhcmVkU3VibWl0KTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHN1Ym1pdExpc3ROYW1lOiAnJyxcbiAgICAgIHN1Ym1pdFF1YW50OiAxLFxuICAgICAgc3VibWl0Q29zdDogMVxuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlTGlzdE5hbWUoZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc3VibWl0TGlzdE5hbWU6IGUudGFyZ2V0LnZhbHVlXG4gICAgfSk7XG4gIH1cblxuICBoaWRlTmV3TGlzdCgpIHtcbiAgICB0aGlzLnByb3BzLmhpZGVOZXdMaXN0KCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdmFyIHN0eWxlID0ge1xuICAgICAgZGlzcGxheTogdGhpcy5wcm9wcy5kaXNwbGF5ZWRcbiAgICB9O1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nc3VibWl0LW5ldy1saXN0JyBzdHlsZT17c3R5bGV9PlxuICAgICAgICA8ZGl2PkFkZCBOZXcgTGlzdDwvZGl2PlxuICAgICAgICA8ZGl2PnByb3BzIHt0aGlzLnByb3BzLmRpc3BsYXllZH08L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJzdWJtaXRGb3JtXCIgb25TdWJtaXQ9e3RoaXMuaGFuZGxlU3VibWl0LmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJuZXdsaXN0Li4uXCIgdmFsdWU9e3RoaXMuc3RhdGUuc3VibWl0TGlzdE5hbWUgfHwgJyd9IG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy51cGRhdGVMaXN0TmFtZShlKX0gLz5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJOZXcgTGlzdCFcIiAvPlxuICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgb25DbGljaz17KGUpID0+IHRoaXMuaGlkZU5ld0xpc3QoKX0+XG4gICAgICAgICAgY2xvc2VcbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59Il19