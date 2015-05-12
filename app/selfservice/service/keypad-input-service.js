var selfservice = angular.module('kiosk-ui.selfservice');

common.service('KeypadInputService', ['AppConfig',
  function(AppConfig) {

    // Reference to the current scope
    var current_scope = null;

    // Translation of numeric key codes to literals
    var KeyCodes = {
    	48: '0',
    	49: '1',
    	50: '2',
    	51: '3',
    	52: '4',
    	53: '5',
    	54: '6',
    	55: '7',
    	56: '8',
    	57: '9',
    	96: '0',
    	97: '1',
    	98: '2',
    	99: '3',
    	100: '4',
    	101: '5',
    	102: '6',
    	103: '7',
    	104: '8',
    	105: '9',
    	65: 'A',
    	66: 'B',
    	67: 'C',
    	68: 'D',
    	69: 'E',
    	70: 'F',
    	71: 'G',
    	72: 'H',
    	73: 'I',
    	74: 'J',
    	75: 'K',
    	76: 'L',
    	77: 'M',
    	78: 'N',
    	79: 'O',
    	80: 'P',
    	81: 'Q',
    	82: 'R',
    	83: 'S',
    	84: 'T',
    	85: 'U',
    	86: 'V',
    	87: 'W',
    	88: 'X',
    	89: 'Y',
    	90: 'Z',
    }

    document.addEventListener('keydown', function(event) {
      // Execute different actions in scope depending on pressed key

      // If no scope associated, do nothing
      if(current_scope == null) return;

      switch(event.keyCode) {
        case 13:
          // ENTER key
          current_scope.$apply(current_scope.onConfirm());
          break;
        case 107:
          // PLUS key on NUMPAD
          current_scope.$apply(current_scope.onIncrease());
          break;
        case 109:
          // MINUS key on NUMPAD
          current_scope.$apply(current_scope.onDecrease());
          break;
        case 106:
            // MULTIPLY key on NUMPAD
            current_scope.$apply(current_scope.onCancel());
            break;
        default:
          // Numbers typed by user or barcode scanner
          var character = KeyCodes[event.keyCode];
          if(character) {
            current_scope.$apply(current_scope.onInput(character));
          }
          break;
      }
    });

    this.setScope = function(scope) {
      current_scope = scope;
    };

    this.resetScope = function() {
      current_scope = null;
    }

}]);
