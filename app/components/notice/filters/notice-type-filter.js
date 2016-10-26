module.exports = function (ngModule) {
  ngModule.filter('noticeTypeFilter', function() {
      return {
        mapper: {
          "1": "消息",
          "2": "公告",
          "3": "政策",
          "4": "培训通知"
        },
        searchOptions: [
            {value: "1", label: "消息"},
            {value: "2", label: "公告"},
            {value: "3", label: "政策"},
            {value: "4", label: "培训通知"}
        ]
      };
  });
};
