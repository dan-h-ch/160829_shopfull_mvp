"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TodoList = function (_React$Component) {
  _inherits(TodoList, _React$Component);

  function TodoList(props) {
    _classCallCheck(this, TodoList);

    return _possibleConstructorReturn(this, (TodoList.__proto__ || Object.getPrototypeOf(TodoList)).call(this, props));
  }

  _createClass(TodoList, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        "div",
        { className: "list-container" },
        React.createElement(
          "div",
          { className: "centered-list" },
          React.createElement(
            "div",
            { className: "header-name" },
            this.props.listname
          ),
          React.createElement(TodoForm, { addItem: this.props.addItem, userid: this.props.userid, listid: this.props.listid }),
          React.createElement(
            "ul",
            null,
            this.props.todoList.map(function (item) {
              return React.createElement(TodoListItem, { key: item.id, todoListItem: item, deleteItem: _this2.props.deleteItem, updateQuant: _this2.props.updateQuant, userid: _this2.props.userid });
            })
          )
        )
      );
    }
  }]);

  return TodoList;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9Ub2RvTGlzdC5qc3giXSwibmFtZXMiOlsiVG9kb0xpc3QiLCJwcm9wcyIsImxpc3RuYW1lIiwiYWRkSXRlbSIsInVzZXJpZCIsImxpc3RpZCIsInRvZG9MaXN0IiwibWFwIiwiaXRlbSIsImlkIiwiZGVsZXRlSXRlbSIsInVwZGF0ZVF1YW50IiwiUmVhY3QiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTUEsUTs7O0FBQ0osb0JBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSwrR0FDWEEsS0FEVztBQUVsQjs7Ozs2QkFHUTtBQUFBOztBQUNQLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxnQkFBZjtBQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsZUFBZjtBQUNFO0FBQUE7QUFBQSxjQUFLLFdBQVUsYUFBZjtBQUNHLGlCQUFLQSxLQUFMLENBQVdDO0FBRGQsV0FERjtBQUlFLDhCQUFDLFFBQUQsSUFBVSxTQUFTLEtBQUtELEtBQUwsQ0FBV0UsT0FBOUIsRUFBdUMsUUFBUSxLQUFLRixLQUFMLENBQVdHLE1BQTFELEVBQWtFLFFBQVEsS0FBS0gsS0FBTCxDQUFXSSxNQUFyRixHQUpGO0FBS0U7QUFBQTtBQUFBO0FBQ0csaUJBQUtKLEtBQUwsQ0FBV0ssUUFBWCxDQUFvQkMsR0FBcEIsQ0FBd0IsVUFBQ0MsSUFBRDtBQUFBLHFCQUFVLG9CQUFDLFlBQUQsSUFBYyxLQUFLQSxLQUFLQyxFQUF4QixFQUE0QixjQUFjRCxJQUExQyxFQUFnRCxZQUFZLE9BQUtQLEtBQUwsQ0FBV1MsVUFBdkUsRUFBbUYsYUFBYSxPQUFLVCxLQUFMLENBQVdVLFdBQTNHLEVBQXdILFFBQVEsT0FBS1YsS0FBTCxDQUFXRyxNQUEzSSxHQUFWO0FBQUEsYUFBeEI7QUFESDtBQUxGO0FBREYsT0FERjtBQWFEOzs7O0VBcEJvQlEsTUFBTUMsUyIsImZpbGUiOiJUb2RvTGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFRvZG9MaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gIH1cblxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaXN0LWNvbnRhaW5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNlbnRlcmVkLWxpc3RcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlci1uYW1lXCI+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5saXN0bmFtZX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8VG9kb0Zvcm0gYWRkSXRlbT17dGhpcy5wcm9wcy5hZGRJdGVtfSB1c2VyaWQ9e3RoaXMucHJvcHMudXNlcmlkfSBsaXN0aWQ9e3RoaXMucHJvcHMubGlzdGlkfSAvPlxuICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLnRvZG9MaXN0Lm1hcCgoaXRlbSkgPT4gPFRvZG9MaXN0SXRlbSBrZXk9e2l0ZW0uaWR9IHRvZG9MaXN0SXRlbT17aXRlbX0gZGVsZXRlSXRlbT17dGhpcy5wcm9wcy5kZWxldGVJdGVtfSB1cGRhdGVRdWFudD17dGhpcy5wcm9wcy51cGRhdGVRdWFudH0gdXNlcmlkPXt0aGlzLnByb3BzLnVzZXJpZH0vPil9XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59Il19