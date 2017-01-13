'use strict';

var Header = function Header(_ref) {
  var username = _ref.username;
  var logOut = _ref.logOut;
  var email = _ref.email;
  return React.createElement(
    'div',
    { className: 'header-container' },
    React.createElement(
      'div',
      { className: 'header-items' },
      'Hi ',
      email
    ),
    React.createElement(
      'div',
      { id: 'top-banner' },
      'Listify'
    ),
    React.createElement(
      'div',
      { onClick: logOut, className: 'header-items' },
      'Logout'
    )
  );
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9IZWFkZXIuanN4Il0sIm5hbWVzIjpbIkhlYWRlciIsInVzZXJuYW1lIiwibG9nT3V0IiwiZW1haWwiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsU0FBUyxTQUFUQSxNQUFTO0FBQUEsTUFBRUMsUUFBRixRQUFFQSxRQUFGO0FBQUEsTUFBWUMsTUFBWixRQUFZQSxNQUFaO0FBQUEsTUFBb0JDLEtBQXBCLFFBQW9CQSxLQUFwQjtBQUFBLFNBQ1g7QUFBQTtBQUFBLE1BQUssV0FBVSxrQkFBZjtBQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsY0FBZjtBQUFBO0FBQ0lBO0FBREosS0FERjtBQUlFO0FBQUE7QUFBQSxRQUFLLElBQUcsWUFBUjtBQUFBO0FBQUEsS0FKRjtBQU9FO0FBQUE7QUFBQSxRQUFLLFNBQVNELE1BQWQsRUFBc0IsV0FBVSxjQUFoQztBQUFBO0FBQUE7QUFQRixHQURXO0FBQUEsQ0FBYiIsImZpbGUiOiJIZWFkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgSGVhZGVyID0gKHt1c2VybmFtZSwgbG9nT3V0LCBlbWFpbH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9J2hlYWRlci1jb250YWluZXInPlxuICAgIDxkaXYgY2xhc3NOYW1lPSdoZWFkZXItaXRlbXMnPlxuICAgIEhpIHtlbWFpbH1cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGlkPSd0b3AtYmFubmVyJz5cbiAgICBMaXN0aWZ5XG4gICAgPC9kaXY+XG4gICAgPGRpdiBvbkNsaWNrPXtsb2dPdXR9IGNsYXNzTmFtZT0naGVhZGVyLWl0ZW1zJz5cbiAgICBMb2dvdXRcbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4pO1xuIl19