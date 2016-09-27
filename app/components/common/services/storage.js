"use strict";
module.exports = function (ngModule) {
    ngModule.service('Storage', function ($window) {

        var getStorageByType = function (type) {
            var storageTypeMapper = {
                "local": "localStorage",
                "session": "sessionStorage"
            };
            return storageTypeMapper[type];
        };

        return {

            set: function (type, key, value) {
                var storeType = getStorageByType(type);
                var storage = $window[storeType];
                storage.setItem(key, angular.toJson(value));
            },

            get: function (type, key) {
                var storageType = getStorageByType(type);
                try {
                    return JSON.parse($window[storageType].getItem(key));
                } catch (e) {
                    return $window[storageType].getItem(key);
                }
            },

            remove: function (type, key) {
                var storageType = getStorageByType(type);
                $window[storageType].removeItem(key);
            }

        };
    });
};
