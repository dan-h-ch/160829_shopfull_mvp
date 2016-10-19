"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TodoCost = function (_React$Component) {
  _inherits(TodoCost, _React$Component);

  function TodoCost(props) {
    _classCallCheck(this, TodoCost);

    return _possibleConstructorReturn(this, (TodoCost.__proto__ || Object.getPrototypeOf(TodoCost)).call(this, props));
  }

  _createClass(TodoCost, [{
    key: "render",
    value: function render() {
      var totCost = this.props.todoList.reduce(function (memo, val) {
        return memo + val.quantity * val.cost;
      }, 0);

      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "final-cost" },
          "Total Cost For This Project: $",
          totCost.toFixed(2)
        ),
        React.createElement(
          "div",
          null,
          "delete lsit "
        )
      );
    }
  }]);

  return TodoCost;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9Ub2RvQ29zdC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLFE7OztBQUVKLG9CQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSwrR0FDWCxLQURXO0FBRWxCOzs7OzZCQUVRO0FBQ1AsVUFBSSxVQUFVLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsTUFBcEIsQ0FBMkIsVUFBQyxJQUFELEVBQU8sR0FBUCxFQUFlO0FBQ3RELGVBQU8sT0FBUSxJQUFJLFFBQUosR0FBYSxJQUFJLElBQWhDO0FBQXNDLE9BRDFCLEVBQzRCLENBRDVCLENBQWQ7O0FBR0EsYUFDRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsWUFBSyxXQUFVLFlBQWY7QUFBQTtBQUEyRCxrQkFBUSxPQUFSLENBQWdCLENBQWhCO0FBQTNELFNBREY7QUFFRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRkYsT0FERjtBQU1EOzs7O0VBaEJvQixNQUFNLFMiLCJmaWxlIjoiVG9kb0Nvc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBUb2RvQ29zdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciB0b3RDb3N0ID0gdGhpcy5wcm9wcy50b2RvTGlzdC5yZWR1Y2UoKG1lbW8sIHZhbCkgPT4ge1xuICAgICAgcmV0dXJuIG1lbW8gKyAodmFsLnF1YW50aXR5KnZhbC5jb3N0KX0sIDApXG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaW5hbC1jb3N0XCI+VG90YWwgQ29zdCBGb3IgVGhpcyBQcm9qZWN0OiAke3RvdENvc3QudG9GaXhlZCgyKX08L2Rpdj5cbiAgICAgICAgPGRpdj5kZWxldGUgbHNpdCA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG5cbn1cblxuXG4iXX0=