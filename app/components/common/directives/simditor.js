'use strict';
module.exports = function(ngModel) {
    ngModel.directive('simditor', function(Storage, $upload) {
        return {
          require: '?ngModel',
          link: function (scope, elm, attr, ngModel) {

            if (!ngModel) return;

            var editor = new Simditor({
              textarea: elm,
              toolbar: [
                'title',
                'color',
                'bold',
                'italic',
                'underline',
                'strikethrough',
                '|',
                'blockquote',
                'table',
                'link',
                'image',
                'hr',
                'indent',
                'outdent'
              ],
              upload: {
                url: '',
                fileKey: 'file',
                connectionCount: 3,
                leaveConfirm: '正在上传文件，如果离开上传会自动取消'
              },
              pasteImage: true
            });

            // todo find a better way
            if (editor.uploader) {
              editor.uploader.on('beforeupload', function (e, file) {
                $upload
                  .upload({
                      url: global.ENV.remoteHost + 'resources',
                      file: file.obj
                  })
                  .xhr(function (xhr) {
                    file.xhr = xhr;
                  })
                  .success(function (data, status, headers, config) {
                      var refactoredData = {
                          success: true,
                          file_path: data.url
                      };
                    editor.uploader.trigger('uploadsuccess', [file, refactoredData]);
                  })
                  .error(function () {
                    editor.uploader.trigger('uploaderror', [file, file.xhr]);
                  });
                return false;
            });
            }

            ngModel.$render = function () {
              editor.setValue(ngModel.$viewValue);
            };

            editor.on('valuechanged', function (e, src) {
              ngModel.$setViewValue(editor.getValue());
            });

            scope.$on('$destroy', function () {
              editor.destroy();
            });

          }
        };
    });
};
