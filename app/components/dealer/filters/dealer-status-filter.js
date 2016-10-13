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
            "完整"
        ],
        //装修状态 0默认1平面图2样品图3施工图4施工5报账6完结
        searchOptions: [
            {value: "0", label: "默认"},
            {value: "1", label: "平面图"},
            {value: "BID_CLOSED",label: "样品图"},
            {value: "BID_FAIL", label: "施工图"},
            {value: "ABOLISHED", label: "施工"},
            {value: "ABOLISHED", label: "报账"},
            {value: "ABOLISHED", label: "完结"}
        ]
      };
  });
};
