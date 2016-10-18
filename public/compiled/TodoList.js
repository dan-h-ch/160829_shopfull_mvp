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
        { className: "centered-table" },
        React.createElement(
          "table",
          { className: "table-list" },
          React.createElement(
            "thead",
            null,
            React.createElement(
              "tr",
              null,
              React.createElement(
                "th",
                { className: "header-name" },
                "Item"
              ),
              React.createElement(
                "th",
                null,
                "Qty"
              ),
              React.createElement(
                "th",
                null,
                "  +  "
              ),
              React.createElement(
                "th",
                null,
                "  -  "
              ),
              React.createElement(
                "th",
                null,
                "Cost/Unit"
              ),
              React.createElement(
                "th",
                null,
                "Total Cost"
              ),
              React.createElement(
                "th",
                null,
                "Del"
              )
            )
          ),
          React.createElement(
            "tbody",
            null,
            this.props.todoList.map(function (item) {
              return React.createElement(TodoListItem, { key: item.id, todoListItem: item, deleteItem: _this2.props.deleteItem, updateQuant: _this2.props.updateQuant });
            })
          )
        )
      );
    }
  }]);

  return TodoList;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9Ub2RvTGlzdC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLFE7OztBQUNKLG9CQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSwrR0FDWCxLQURXO0FBRWxCOzs7OzZCQUdRO0FBQUE7O0FBQ1AsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGdCQUFmO0FBQ0U7QUFBQTtBQUFBLFlBQU8sV0FBVSxZQUFqQjtBQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxrQkFBSSxXQUFVLGFBQWQ7QUFBQTtBQUFBLGVBREY7QUFFRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRkY7QUFHRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBSEY7QUFJRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBSkY7QUFLRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBTEY7QUFNRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBTkY7QUFPRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUEY7QUFERixXQURGO0FBWUk7QUFBQTtBQUFBO0FBQ0csaUJBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsR0FBcEIsQ0FBd0IsVUFBQyxJQUFEO0FBQUEscUJBQVUsb0JBQUMsWUFBRCxJQUFjLEtBQUssS0FBSyxFQUF4QixFQUE0QixjQUFjLElBQTFDLEVBQWdELFlBQVksT0FBSyxLQUFMLENBQVcsVUFBdkUsRUFBbUYsYUFBYSxPQUFLLEtBQUwsQ0FBVyxXQUEzRyxHQUFWO0FBQUEsYUFBeEI7QUFESDtBQVpKO0FBREYsT0FERjtBQW9CRDs7OztFQTNCb0IsTUFBTSxTIiwiZmlsZSI6IlRvZG9MaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgVG9kb0xpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICB9XG5cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2VudGVyZWQtdGFibGVcIj5cbiAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlLWxpc3RcIj5cbiAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJoZWFkZXItbmFtZVwiPkl0ZW08L3RoPlxuICAgICAgICAgICAgICA8dGg+UXR5PC90aD5cbiAgICAgICAgICAgICAgPHRoPiAgKyAgPC90aD5cbiAgICAgICAgICAgICAgPHRoPiAgLSAgPC90aD5cbiAgICAgICAgICAgICAgPHRoPkNvc3QvVW5pdDwvdGg+XG4gICAgICAgICAgICAgIDx0aD5Ub3RhbCBDb3N0PC90aD5cbiAgICAgICAgICAgICAgPHRoPkRlbDwvdGg+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHt0aGlzLnByb3BzLnRvZG9MaXN0Lm1hcCgoaXRlbSkgPT4gPFRvZG9MaXN0SXRlbSBrZXk9e2l0ZW0uaWR9IHRvZG9MaXN0SXRlbT17aXRlbX0gZGVsZXRlSXRlbT17dGhpcy5wcm9wcy5kZWxldGVJdGVtfSB1cGRhdGVRdWFudD17dGhpcy5wcm9wcy51cGRhdGVRdWFudH0gLz4pfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgPC90YWJsZT5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuIl19