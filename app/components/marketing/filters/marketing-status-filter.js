module.exports = function(ngModule) {
  ngModule.filter("marketingStatusFilter", function() {
    return {
      mapper: {
        "0": "待发布",
        "1": "已发布",
        "2": "执行中",
        "3": "执行完毕"
      },
      searchOptions: [
        {
          label: "待发布",
          value: "0"
        },
        {
          label: "已发布",
          value: "1"
        },
        {
          label: "执行中",
          value: "2"
        },
        {
          label: "执行完毕",
          value: "3"
        }
      ]
    };
  });
};
