var statistics = angular.module('kiosk-ui.statistics');

statistics.service('AggregationService', ['TransactionService',
  function(TransactionService) {

    this.getSumPerHour = function() {

      var start = Date();
      var end = Date();
      start.setHours(start.getHours() - 24);
      end.setHours(end.getHours() - 23);

      for(var i=0;i<24;i++) {
        var ta = TransactionService.getTransactionsByTime(start, end);
        var sum = 0;
        for(var j=0;j<ta.length;j++) {
          sum += ta.amount;
        }
      }
    }


}]);
