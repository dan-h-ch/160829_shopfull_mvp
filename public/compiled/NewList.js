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
      this.hideNewList();
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
        display: this.props.createDisplayed
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
          this.props.createDisplayed
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9OZXdMaXN0LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sTzs7O0FBRUosbUJBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLGtIQUNYLEtBRFc7O0FBR2pCLFVBQUssS0FBTCxHQUFhLEVBQWI7QUFIaUI7QUFJbEI7Ozs7aUNBRVksQyxFQUFHO0FBQ2QsUUFBRSxjQUFGO0FBQ0EsVUFBSSxPQUFPLElBQUksSUFBSixFQUFYO0FBQ0EsVUFBSSxpQkFBaUI7QUFDbkIsa0JBQVUsS0FBSyxLQUFMLENBQVcsY0FERjtBQUVuQjtBQUNBLHVCQUFlLEtBQUssS0FBTCxDQUFXLE1BSFA7QUFJbkIsb0JBQVksSUFBSSxJQUFKLEVBSk87QUFLbkIsb0JBQVksSUFBSSxJQUFKO0FBTE8sT0FBckI7QUFPQTtBQUNBLFdBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsY0FBbkI7QUFDQSxXQUFLLFFBQUwsQ0FBYztBQUNaLHdCQUFnQixFQURKO0FBRVoscUJBQWEsQ0FGRDtBQUdaLG9CQUFZO0FBSEEsT0FBZDtBQUtBLFdBQUssV0FBTDtBQUNEOzs7bUNBRWMsQyxFQUFHO0FBQ2hCLFdBQUssUUFBTCxDQUFjO0FBQ1osd0JBQWdCLEVBQUUsTUFBRixDQUFTO0FBRGIsT0FBZDtBQUdEOzs7a0NBRWE7QUFDWixXQUFLLEtBQUwsQ0FBVyxXQUFYO0FBQ0Q7Ozs2QkFFUTtBQUFBOztBQUNQLFVBQUksUUFBUTtBQUNWLGlCQUFTLEtBQUssS0FBTCxDQUFXO0FBRFYsT0FBWjtBQUdBLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxpQkFBZixFQUFpQyxPQUFPLEtBQXhDO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQURGO0FBRUU7QUFBQTtBQUFBO0FBQUE7QUFBWSxlQUFLLEtBQUwsQ0FBVztBQUF2QixTQUZGO0FBR0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBLGNBQU0sV0FBVSxZQUFoQixFQUE2QixVQUFVLEtBQUssWUFBTCxDQUFrQixJQUFsQixDQUF1QixJQUF2QixDQUF2QztBQUNFLDJDQUFPLE1BQUssTUFBWixFQUFtQixhQUFZLFlBQS9CLEVBQTRDLE9BQU8sS0FBSyxLQUFMLENBQVcsY0FBWCxJQUE2QixFQUFoRixFQUFvRixVQUFVLGtCQUFDLENBQUQ7QUFBQSx1QkFBTyxPQUFLLGNBQUwsQ0FBb0IsQ0FBcEIsQ0FBUDtBQUFBLGVBQTlGLEdBREY7QUFFRSwyQ0FBTyxNQUFLLFFBQVosRUFBcUIsT0FBTSxXQUEzQjtBQUZGO0FBREYsU0FIRjtBQVNFO0FBQUE7QUFBQSxZQUFLLFNBQVMsaUJBQUMsQ0FBRDtBQUFBLHFCQUFPLE9BQUssV0FBTCxFQUFQO0FBQUEsYUFBZDtBQUFBO0FBQUE7QUFURixPQURGO0FBZUQ7Ozs7RUF6RG1CLE1BQU0sUyIsImZpbGUiOiJOZXdMaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgTmV3TGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge307XG4gIH1cblxuICBoYW5kbGVTdWJtaXQoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgdGltZSA9IG5ldyBEYXRlKCk7XG4gICAgdmFyIHByZXBhcmVkU3VibWl0ID0ge1xuICAgICAgbGlzdG5hbWU6IHRoaXMuc3RhdGUuc3VibWl0TGlzdE5hbWUsXG4gICAgICAvLyBsaW50aW5nIGVycm9yIHNpbmNlIHdlIGFyZSBwYXNzaW5nIGRpcmVjdGx5IHRvIGRiXG4gICAgICBjcmVhdGVfdXNlcmlkOiB0aGlzLnByb3BzLnVzZXJpZCxcbiAgICAgIGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKCksXG4gICAgICB1cGRhdGVkX2F0OiBuZXcgRGF0ZSgpXG4gICAgfTtcbiAgICAvLyBjb25zb2xlLmxvZyhwcmVwYXJlZFN1Ym1pdClcbiAgICB0aGlzLnByb3BzLmFkZExpc3QocHJlcGFyZWRTdWJtaXQpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc3VibWl0TGlzdE5hbWU6ICcnLFxuICAgICAgc3VibWl0UXVhbnQ6IDEsXG4gICAgICBzdWJtaXRDb3N0OiAxXG4gICAgfSk7XG4gICAgdGhpcy5oaWRlTmV3TGlzdCgpO1xuICB9XG5cbiAgdXBkYXRlTGlzdE5hbWUoZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc3VibWl0TGlzdE5hbWU6IGUudGFyZ2V0LnZhbHVlXG4gICAgfSk7XG4gIH1cblxuICBoaWRlTmV3TGlzdCgpIHtcbiAgICB0aGlzLnByb3BzLmhpZGVOZXdMaXN0KCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdmFyIHN0eWxlID0ge1xuICAgICAgZGlzcGxheTogdGhpcy5wcm9wcy5jcmVhdGVEaXNwbGF5ZWRcbiAgICB9O1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nc3VibWl0LW5ldy1saXN0JyBzdHlsZT17c3R5bGV9PlxuICAgICAgICA8ZGl2PkFkZCBOZXcgTGlzdDwvZGl2PlxuICAgICAgICA8ZGl2PnByb3BzIHt0aGlzLnByb3BzLmNyZWF0ZURpc3BsYXllZH08L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJzdWJtaXRGb3JtXCIgb25TdWJtaXQ9e3RoaXMuaGFuZGxlU3VibWl0LmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJuZXdsaXN0Li4uXCIgdmFsdWU9e3RoaXMuc3RhdGUuc3VibWl0TGlzdE5hbWUgfHwgJyd9IG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy51cGRhdGVMaXN0TmFtZShlKX0gLz5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJOZXcgTGlzdCFcIiAvPlxuICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgb25DbGljaz17KGUpID0+IHRoaXMuaGlkZU5ld0xpc3QoKX0+XG4gICAgICAgICAgY2xvc2VcbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59Il19