module.exports = function (ngModule) {
  ngModule.filter('PropertyTypeFilter', function() {
      return {
        mapper: {
          1: "文字",
          2: "颜色编码"
        },
        //装修状态 0默认1平面图2样品图3施工图4施工5报账6完结
        searchOptions: [
            {value: "1", label: "文字"},
            {value: "2", label: "颜色编码"},
        ]
      };
  });
};
