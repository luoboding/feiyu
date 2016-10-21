'use strict';
//this module is used to forma date
//if you want to extend more,you can add your code here
module.exports = function(module) {
  String.repeat = function(chr, count) {
    var str = "";
    for(var i = 0; i < count; i++) {
      str += chr;
    }
    return str;
  };

  String.prototype.padL = function(width, pad) {
    //not pad to left when width is 0
    if (!width || width < 1) {
      return this;
    }
    //if pad string is empty, pad a empty string here;
    if (!pad) {
      pad=" ";
    }
    var length = width - this.length;
    if (length < 1) {
      return this.substr(0,width);
    }
    return (String.repeat(pad,length) + this).substr(0,width);
  };

  String.prototype.padR = function(width, pad){
    //not pad to right when width is 0
    if (!width || width<1) {
      return this;
    }
    //if pad string is empty, pad a empty string here;
    if (!pad) {
      pad=" ";
    }
    var length = width - this.length;
    if (length < 1) {
      this.substr(0,width);
    }
    return (this + String.repeat(pad,length)).substr(0,width);
  };

  Date.prototype.formatDate = function(format){
    var date = this;
    //set a default formatter string
    if (!format) {
      format= "MM/dd/yyyy";
    }
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    format = format.replace("MM",month.toString().padL(2,"0"));

    if (format.indexOf("yyyy") > -1) {
      format = format.replace("yyyy",year.toString());
    } else if (format.indexOf("yy") > -1) {
      format = format.replace("yy",year.toString().substr(2,2));
    }
    format = format.replace("dd",date.getDate().toString().padL(2,"0"));
    var hours = date.getHours();
    if (format.indexOf("t") > -1) {
      if (hours > 11) {
        format = format.replace("t","pm");
      } else {
        format = format.replace("t","am");
      }
    }
    if (format.indexOf("HH") > -1) {
      format = format.replace("HH",hours.toString().padL(2,"0"));
    }
    if (format.indexOf("hh") > -1) {
      if (hours > 12) hours - 12;
      if (hours == 0) hours = 12;
      format = format.replace("hh",hours.toString().padL(2,"0"));
    }
    if (format.indexOf("mm") > -1) {
      format = format.replace("mm",date.getMinutes().toString().padL(2,"0"));
    }

    if (format.indexOf("ss") > -1) {
      format = format.replace("ss",date.getSeconds().toString().padL(2,"0"));
    }
    return format;
  };
};
