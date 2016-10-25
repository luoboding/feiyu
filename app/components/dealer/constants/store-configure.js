module.exports = function(ngModule) {
  ngModule.constant('StoreDecrationStatus', {
    default: 0,
    start: 1,
    mapper: [
      "默认",
      "发起装修"
    ],
    searchOptions: [
      {
        value: 0,
        label: "默认"
      },
      {
        value: 0,
        label: "发起装修"
      }
    ]
  });
};
