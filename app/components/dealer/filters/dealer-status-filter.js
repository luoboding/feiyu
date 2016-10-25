"use strict";
module.exports = function(ngModule) {
  ngModule.filter('dealerStatusFilter', function() {
    return {
        mapper:  [
            "默认",
            "平面图",
            "样品图",
            "施工图",
            "施工",
            "报账",
            "完结"
        ],
        //装修状态 0默认1平面图2样品图3施工图4施工5报账6完结
        searchOptions: [
            {value: "0", label: "默认"},
            {value: "1", label: "平面图"},
            {value: "2",label: "样品图"},
            {value: "3", label: "施工图"},
            {value: "4", label: "施工"},
            {value: "5", label: "报账"},
            {value: "6", label: "完结"}
        ]
      };
  });
};
