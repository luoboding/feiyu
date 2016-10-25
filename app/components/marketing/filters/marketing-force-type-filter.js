module.exports = function(ngModule) {
  ngModule.filter('marketingForceTypeFilter', function() {
    return {
      mapper: {
        0: "不强制",
        1: "强制"
      },
      searchOptions: [
        {
          value: 0,
          label: "不强制"
        },
        {
          value: 1,
          label: "强制"
        }
      ]
    }
  });
};
