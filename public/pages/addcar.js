var $ = require("zepto");
var uploader = require("uploader");
var template = require("./tpl/addcar.html");
var events = require("events");
var util = require("util");
var viewSwipe = require("view-swipe");

function AddCarView(){

}

util.inherits(AddCarView,events);

AddCarView.prototype.show = function(){
  var elem = $(template);
  viewSwipe.in(elem[0],"bottom");
}

AddCarView.prototype.destory = function(){
  viewSwipe.out();
  this.emit("destory");
}

module.exports = new AddCarView();