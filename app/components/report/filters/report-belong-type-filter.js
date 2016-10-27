module.exports = function (ngModule) {
  ngModule.filter('reportBelongTypeFilter', function() {
      return {
        mapper: {
          "1": "计划",
          "2": "活动"
        },
        searchOptions: [
            {value: "1", label: "计划"},
            {value: "2", label: "活动"}
        ]
      };
  });
};
