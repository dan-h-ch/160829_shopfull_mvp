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
      var preparedSubmit = {
        listid: this.props.listid,
        // linting error since we are passing directly to db
        username: this.state.shareUsername
      };
      // console.log(preparedSubmit)
      this.props.shareList(preparedSubmit);
      this.setState({
        shareUsername: ''
      });
      this.hideShareList();
    }
  }, {
    key: 'hideShareList',
    value: function hideShareList() {
      this.props.hideShareList();
    }
  }, {
    key: 'updateShareUsername',
    value: function updateShareUsername(e) {
      this.setState({
        shareUsername: e.target.value
      });
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
          { className: 'top-close', onClick: function onClick(e) {
              return _this2.hideShareList();
            } },
          'close'
        ),
        React.createElement(
          'div',
          null,
          'Share This List'
        ),
        React.createElement(
          'div',
          null,
          'Enter username to share with'
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            'form',
            { className: 'share-list', onSubmit: this.handleSubmit.bind(this) },
            React.createElement('input', { className: 'share-list-form-input', type: 'text', placeholder: 'username', value: this.state.shareUsername || '', onChange: function onChange(e) {
                return _this2.updateShareUsername(e);
              } }),
            React.createElement('input', { className: 'share-list-form-button', type: 'submit', value: 'Share!' })
          )
        )
      );
    }
  }]);

  return ShareList;
}(React.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9TaGFyZUxpc3QuanN4Il0sIm5hbWVzIjpbIlNoYXJlTGlzdCIsInByb3BzIiwic3RhdGUiLCJlIiwicHJldmVudERlZmF1bHQiLCJwcmVwYXJlZFN1Ym1pdCIsImxpc3RpZCIsInVzZXJuYW1lIiwic2hhcmVVc2VybmFtZSIsInNoYXJlTGlzdCIsInNldFN0YXRlIiwiaGlkZVNoYXJlTGlzdCIsInRhcmdldCIsInZhbHVlIiwic3R5bGUiLCJkaXNwbGF5Iiwic2hhcmVEaXNwbGF5ZWQiLCJoYW5kbGVTdWJtaXQiLCJiaW5kIiwidXBkYXRlU2hhcmVVc2VybmFtZSIsIlJlYWN0IiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU1BLFM7OztBQUVKLHFCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsc0hBQ1hBLEtBRFc7O0FBR2pCLFVBQUtDLEtBQUwsR0FBYSxFQUFiO0FBSGlCO0FBSWxCOzs7O2lDQUVZQyxDLEVBQUc7QUFDZEEsUUFBRUMsY0FBRjtBQUNBLFVBQUlDLGlCQUFpQjtBQUNuQkMsZ0JBQVEsS0FBS0wsS0FBTCxDQUFXSyxNQURBO0FBRW5CO0FBQ0FDLGtCQUFVLEtBQUtMLEtBQUwsQ0FBV007QUFIRixPQUFyQjtBQUtBO0FBQ0EsV0FBS1AsS0FBTCxDQUFXUSxTQUFYLENBQXFCSixjQUFyQjtBQUNBLFdBQUtLLFFBQUwsQ0FBYztBQUNaRix1QkFBZTtBQURILE9BQWQ7QUFHQSxXQUFLRyxhQUFMO0FBQ0Q7OztvQ0FFZTtBQUNkLFdBQUtWLEtBQUwsQ0FBV1UsYUFBWDtBQUNEOzs7d0NBRW1CUixDLEVBQUc7QUFDckIsV0FBS08sUUFBTCxDQUFjO0FBQ1pGLHVCQUFlTCxFQUFFUyxNQUFGLENBQVNDO0FBRFosT0FBZDtBQUdEOzs7NkJBRVE7QUFBQTs7QUFDUCxVQUFJQyxRQUFRO0FBQ1ZDLGlCQUFTLEtBQUtkLEtBQUwsQ0FBV2U7QUFEVixPQUFaO0FBR0EsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGlCQUFmLEVBQWlDLE9BQU9GLEtBQXhDO0FBQ0U7QUFBQTtBQUFBLFlBQUssV0FBVSxXQUFmLEVBQTJCLFNBQVMsaUJBQUNYLENBQUQ7QUFBQSxxQkFBTyxPQUFLUSxhQUFMLEVBQVA7QUFBQSxhQUFwQztBQUFBO0FBQUEsU0FERjtBQUlFO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FKRjtBQUtFO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FMRjtBQU1FO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxjQUFNLFdBQVUsWUFBaEIsRUFBNkIsVUFBVSxLQUFLTSxZQUFMLENBQWtCQyxJQUFsQixDQUF1QixJQUF2QixDQUF2QztBQUNFLDJDQUFPLFdBQVUsdUJBQWpCLEVBQXlDLE1BQUssTUFBOUMsRUFBcUQsYUFBWSxVQUFqRSxFQUE0RSxPQUFPLEtBQUtoQixLQUFMLENBQVdNLGFBQVgsSUFBNEIsRUFBL0csRUFBbUgsVUFBVSxrQkFBQ0wsQ0FBRDtBQUFBLHVCQUFPLE9BQUtnQixtQkFBTCxDQUF5QmhCLENBQXpCLENBQVA7QUFBQSxlQUE3SCxHQURGO0FBRUUsMkNBQU8sV0FBVSx3QkFBakIsRUFBMEMsTUFBSyxRQUEvQyxFQUF3RCxPQUFNLFFBQTlEO0FBRkY7QUFERjtBQU5GLE9BREY7QUFlRDs7OztFQXBEcUJpQixNQUFNQyxTIiwiZmlsZSI6IlNoYXJlTGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFNoYXJlTGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge307XG4gIH1cblxuICBoYW5kbGVTdWJtaXQoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgcHJlcGFyZWRTdWJtaXQgPSB7XG4gICAgICBsaXN0aWQ6IHRoaXMucHJvcHMubGlzdGlkLFxuICAgICAgLy8gbGludGluZyBlcnJvciBzaW5jZSB3ZSBhcmUgcGFzc2luZyBkaXJlY3RseSB0byBkYlxuICAgICAgdXNlcm5hbWU6IHRoaXMuc3RhdGUuc2hhcmVVc2VybmFtZVxuICAgIH07XG4gICAgLy8gY29uc29sZS5sb2cocHJlcGFyZWRTdWJtaXQpXG4gICAgdGhpcy5wcm9wcy5zaGFyZUxpc3QocHJlcGFyZWRTdWJtaXQpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2hhcmVVc2VybmFtZTogJycsXG4gICAgfSk7XG4gICAgdGhpcy5oaWRlU2hhcmVMaXN0KCk7XG4gIH1cblxuICBoaWRlU2hhcmVMaXN0KCkge1xuICAgIHRoaXMucHJvcHMuaGlkZVNoYXJlTGlzdCgpO1xuICB9XG5cbiAgdXBkYXRlU2hhcmVVc2VybmFtZShlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzaGFyZVVzZXJuYW1lOiBlLnRhcmdldC52YWx1ZVxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciBzdHlsZSA9IHtcbiAgICAgIGRpc3BsYXk6IHRoaXMucHJvcHMuc2hhcmVEaXNwbGF5ZWRcbiAgICB9O1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nc3VibWl0LW5ldy1saXN0JyBzdHlsZT17c3R5bGV9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndG9wLWNsb3NlJyBvbkNsaWNrPXsoZSkgPT4gdGhpcy5oaWRlU2hhcmVMaXN0KCl9PlxuICAgICAgICAgIGNsb3NlXG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlNoYXJlIFRoaXMgTGlzdDwvZGl2PlxuICAgICAgICA8ZGl2PkVudGVyIHVzZXJuYW1lIHRvIHNoYXJlIHdpdGg8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJzaGFyZS1saXN0XCIgb25TdWJtaXQ9e3RoaXMuaGFuZGxlU3VibWl0LmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cInNoYXJlLWxpc3QtZm9ybS1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJ1c2VybmFtZVwiIHZhbHVlPXt0aGlzLnN0YXRlLnNoYXJlVXNlcm5hbWUgfHwgJyd9IG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy51cGRhdGVTaGFyZVVzZXJuYW1lKGUpfSAvPlxuICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cInNoYXJlLWxpc3QtZm9ybS1idXR0b25cIiB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJTaGFyZSFcIiAvPlxuICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59Il19