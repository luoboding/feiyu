module.exports = function (ngModule) {
  ngModule.filter('CustomerSexFilter', function() {
      return {
        mapper: {
          "1": "男",
          "0": "女"
        },
        //装修状态 0默认1平面图2样品图3施工图4施工5报账6完结
        searchOptions: [
            {value: "1", label: "男"},
            {value: "0", label: "女"},
        ]
      };
  });
};
