module.exports = function(ngModule) {
  ngModule.filter('marketingTypeFilter', function() {
    return {
      mapper: {
        "1": "门类",
        "2": "窗类"
      },
      searchOptions: [
        {
          value: "1",
          label: "门类"
        },
        {
          value: "2",
          label: "窗类"
        }
      ]
    }
  });
};
