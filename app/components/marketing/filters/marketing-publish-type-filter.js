module.exports = function(ngModule) {
  ngModule.filter('marketingPublishTypeFilter', function(){
    return {
      mapper: {
        0: "不发布",
        1: "发布"
      },
      searchOptions: [{
        value: 0,
        label: "不发布"
      }, {
        value: 1,
        label: "发布"
      }]
    };
  });
};
