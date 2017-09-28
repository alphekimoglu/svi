angular.module("myApp", ["ngTable"]);
.controller('ngTableCtrl',[function(ngTableParams,simpleList){
var self = this;
//var data = [{name: "Moroni", age: 50} /*,*/];
//self.tableParams = new NgTableParams({}, { dataset: data});
   // this.tableParams= new NgTableParams({
      self.cols = [
      { field: "name", title: "Name", sortable: "name", sortDirection: "desc" },
      { field: "age", title: "Age", sortable: "age", sortDirection: "desc" },
      { field: "money", title: "Money", sortable: false, sortDirection: "asc" }
    ];
    self.sortables = _.indexBy(self.cols, "field");
    self.tableParams = new NgTableParams({ sorting: { name: "asc"}}, {
      dataset: simpleList
    });

    self.applySelectedSort = applySelectedSort;

    function applySelectedSort(){
      self.tableParams.sorting(self.newSort, self.isSortDesc ? 'desc' : 'asc');
      self.newSort = "";
      self.newSortForm.$setPristine();
    }
    })
}]);
