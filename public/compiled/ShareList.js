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
        email_phone: this.state.share_email_phone
      };
      // console.log(preparedSubmit)
      this.props.shareList(preparedSubmit);
      this.setState({
        share_email_phone: ''
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
        share_email_phone: e.target.value
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9TaGFyZUxpc3QuanN4Il0sIm5hbWVzIjpbIlNoYXJlTGlzdCIsInByb3BzIiwic3RhdGUiLCJlIiwicHJldmVudERlZmF1bHQiLCJwcmVwYXJlZFN1Ym1pdCIsImxpc3RpZCIsImVtYWlsX3Bob25lIiwic2hhcmVfZW1haWxfcGhvbmUiLCJzaGFyZUxpc3QiLCJzZXRTdGF0ZSIsImhpZGVTaGFyZUxpc3QiLCJ0YXJnZXQiLCJ2YWx1ZSIsInN0eWxlIiwiZGlzcGxheSIsInNoYXJlRGlzcGxheWVkIiwiaGFuZGxlU3VibWl0IiwiYmluZCIsInNoYXJlVXNlcm5hbWUiLCJ1cGRhdGVTaGFyZVVzZXJuYW1lIiwiUmVhY3QiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTUEsUzs7O0FBRUoscUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxzSEFDWEEsS0FEVzs7QUFHakIsVUFBS0MsS0FBTCxHQUFhLEVBQWI7QUFIaUI7QUFJbEI7Ozs7aUNBRVlDLEMsRUFBRztBQUNkQSxRQUFFQyxjQUFGO0FBQ0EsVUFBSUMsaUJBQWlCO0FBQ25CQyxnQkFBUSxLQUFLTCxLQUFMLENBQVdLLE1BREE7QUFFbkI7QUFDQUMscUJBQWEsS0FBS0wsS0FBTCxDQUFXTTtBQUhMLE9BQXJCO0FBS0E7QUFDQSxXQUFLUCxLQUFMLENBQVdRLFNBQVgsQ0FBcUJKLGNBQXJCO0FBQ0EsV0FBS0ssUUFBTCxDQUFjO0FBQ1pGLDJCQUFtQjtBQURQLE9BQWQ7QUFHQSxXQUFLRyxhQUFMO0FBQ0Q7OztvQ0FFZTtBQUNkLFdBQUtWLEtBQUwsQ0FBV1UsYUFBWDtBQUNEOzs7d0NBRW1CUixDLEVBQUc7QUFDckIsV0FBS08sUUFBTCxDQUFjO0FBQ1pGLDJCQUFtQkwsRUFBRVMsTUFBRixDQUFTQztBQURoQixPQUFkO0FBR0Q7Ozs2QkFFUTtBQUFBOztBQUNQLFVBQUlDLFFBQVE7QUFDVkMsaUJBQVMsS0FBS2QsS0FBTCxDQUFXZTtBQURWLE9BQVo7QUFHQSxhQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsaUJBQWYsRUFBaUMsT0FBT0YsS0FBeEM7QUFDRTtBQUFBO0FBQUEsWUFBSyxXQUFVLFdBQWYsRUFBMkIsU0FBUyxpQkFBQ1gsQ0FBRDtBQUFBLHFCQUFPLE9BQUtRLGFBQUwsRUFBUDtBQUFBLGFBQXBDO0FBQUE7QUFBQSxTQURGO0FBSUU7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUpGO0FBS0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUxGO0FBTUU7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBLGNBQU0sV0FBVSxZQUFoQixFQUE2QixVQUFVLEtBQUtNLFlBQUwsQ0FBa0JDLElBQWxCLENBQXVCLElBQXZCLENBQXZDO0FBQ0UsMkNBQU8sV0FBVSx1QkFBakIsRUFBeUMsTUFBSyxNQUE5QyxFQUFxRCxhQUFZLFVBQWpFLEVBQTRFLE9BQU8sS0FBS2hCLEtBQUwsQ0FBV2lCLGFBQVgsSUFBNEIsRUFBL0csRUFBbUgsVUFBVSxrQkFBQ2hCLENBQUQ7QUFBQSx1QkFBTyxPQUFLaUIsbUJBQUwsQ0FBeUJqQixDQUF6QixDQUFQO0FBQUEsZUFBN0gsR0FERjtBQUVFLDJDQUFPLFdBQVUsd0JBQWpCLEVBQTBDLE1BQUssUUFBL0MsRUFBd0QsT0FBTSxRQUE5RDtBQUZGO0FBREY7QUFORixPQURGO0FBZUQ7Ozs7RUFwRHFCa0IsTUFBTUMsUyIsImZpbGUiOiJTaGFyZUxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBTaGFyZUxpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHt9O1xuICB9XG5cbiAgaGFuZGxlU3VibWl0KGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIHByZXBhcmVkU3VibWl0ID0ge1xuICAgICAgbGlzdGlkOiB0aGlzLnByb3BzLmxpc3RpZCxcbiAgICAgIC8vIGxpbnRpbmcgZXJyb3Igc2luY2Ugd2UgYXJlIHBhc3NpbmcgZGlyZWN0bHkgdG8gZGJcbiAgICAgIGVtYWlsX3Bob25lOiB0aGlzLnN0YXRlLnNoYXJlX2VtYWlsX3Bob25lXG4gICAgfTtcbiAgICAvLyBjb25zb2xlLmxvZyhwcmVwYXJlZFN1Ym1pdClcbiAgICB0aGlzLnByb3BzLnNoYXJlTGlzdChwcmVwYXJlZFN1Ym1pdCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzaGFyZV9lbWFpbF9waG9uZTogJycsXG4gICAgfSk7XG4gICAgdGhpcy5oaWRlU2hhcmVMaXN0KCk7XG4gIH1cblxuICBoaWRlU2hhcmVMaXN0KCkge1xuICAgIHRoaXMucHJvcHMuaGlkZVNoYXJlTGlzdCgpO1xuICB9XG5cbiAgdXBkYXRlU2hhcmVVc2VybmFtZShlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzaGFyZV9lbWFpbF9waG9uZTogZS50YXJnZXQudmFsdWVcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgc3R5bGUgPSB7XG4gICAgICBkaXNwbGF5OiB0aGlzLnByb3BzLnNoYXJlRGlzcGxheWVkXG4gICAgfTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3N1Ym1pdC1uZXctbGlzdCcgc3R5bGU9e3N0eWxlfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3RvcC1jbG9zZScgb25DbGljaz17KGUpID0+IHRoaXMuaGlkZVNoYXJlTGlzdCgpfT5cbiAgICAgICAgICBjbG9zZVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5TaGFyZSBUaGlzIExpc3Q8L2Rpdj5cbiAgICAgICAgPGRpdj5FbnRlciB1c2VybmFtZSB0byBzaGFyZSB3aXRoPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwic2hhcmUtbGlzdFwiIG9uU3VibWl0PXt0aGlzLmhhbmRsZVN1Ym1pdC5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJzaGFyZS1saXN0LWZvcm0taW5wdXRcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwidXNlcm5hbWVcIiB2YWx1ZT17dGhpcy5zdGF0ZS5zaGFyZVVzZXJuYW1lIHx8ICcnfSBvbkNoYW5nZT17KGUpID0+IHRoaXMudXBkYXRlU2hhcmVVc2VybmFtZShlKX0gLz5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJzaGFyZS1saXN0LWZvcm0tYnV0dG9uXCIgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiU2hhcmUhXCIgLz5cbiAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSJdfQ==