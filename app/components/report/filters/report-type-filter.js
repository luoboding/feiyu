module.exports = function (ngModule) {
  ngModule.filter('reportTypeFilter', function() {
      return {
        mapper: {
          "1": "内部",
          "2": "经销商"
        },
        searchOptions: [
            {value: "1", label: "内部"},
            {value: "2", label: "经销商"}
        ]
      };
  });
};
