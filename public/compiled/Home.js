'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_React$Component) {
  _inherits(Home, _React$Component);

  function Home() {
    _classCallCheck(this, Home);

    return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
  }

  _createClass(Home, [{
    key: 'componentWillMount',
    value: function componentWillMount() {

      this.lock = new Auth0Lock('eaDzLmALxb7fvxQhVKTkxW8rEDtMnGZD', 'danch.auth0.com');
    }
  }, {
    key: 'showLock',
    value: function showLock() {
      console.log("this", this);
      this.lock.show();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        null,
        React.createElement(
          'a',
          { onClick: function onClick(e) {
              return _this2.showLock();
            } },
          'Sign In'
        )
      );
    }
  }]);

  return Home;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9Ib21lLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sSTs7Ozs7Ozs7Ozs7eUNBRWlCOztBQUVuQixXQUFLLElBQUwsR0FBWSxJQUFJLFNBQUosQ0FBYyxrQ0FBZCxFQUFrRCxpQkFBbEQsQ0FBWjtBQUVEOzs7K0JBRVU7QUFDVCxjQUFRLEdBQVIsQ0FBWSxNQUFaLEVBQW9CLElBQXBCO0FBQ0EsV0FBSyxJQUFMLENBQVUsSUFBVjtBQUNEOzs7NkJBRVE7QUFBQTs7QUFDUCxhQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxZQUFHLFNBQVMsaUJBQUMsQ0FBRDtBQUFBLHFCQUFPLE9BQUssUUFBTCxFQUFQO0FBQUEsYUFBWjtBQUFBO0FBQUE7QUFERixPQURGO0FBTUQ7Ozs7RUFwQmdCLE1BQU0sUyIsImZpbGUiOiJIb21lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgSG9tZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuXG4gICAgdGhpcy5sb2NrID0gbmV3IEF1dGgwTG9jaygnZWFEekxtQUx4YjdmdnhRaFZLVGt4VzhyRUR0TW5HWkQnLCAnZGFuY2guYXV0aDAuY29tJylcblxuICB9XG5cbiAgc2hvd0xvY2soKSB7XG4gICAgY29uc29sZS5sb2coXCJ0aGlzXCIsIHRoaXMpXG4gICAgdGhpcy5sb2NrLnNob3coKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8YSBvbkNsaWNrPXsoZSkgPT4gdGhpcy5zaG93TG9jaygpfT5TaWduIEluPC9hPlxuICAgICAgPC9kaXY+XG4gICAgKVxuXG4gIH1cblxuXG59Il19