var util = require("util");
var events = require("events");
var viewSwipe = require("view-swipe");
var $ = require("zepto");


function SwipeModal(config){
  var self = this;
  var submit = config.submit;
  var elem = this.elem = $(config.template);
  var getData = this.getData = config.getData;
  var validate = this.validate = config.validate;
  var button = this.button = config.button;
  this._show = config.show;


  function viewReturn(){
    $("body").css("position","static");
    viewSwipe.out("bottom");
    button.prop("disabled",false);
  }

  function viewCome(){
    $("body").css("position","fixed");
    viewSwipe.in(elem[0],"bottom");
    button.prop("disabled",true);
  }

  self.on("show",viewCome);
  self.on("submit",viewReturn);
  self.on("cancel",viewReturn);

  elem.find(".submit").on("touchend",function(){
    var data = self.getData();
    var isValid = self.validate(data);

    if(isValid){
      if(!submit){
        self.emit("submit",data);
      }else{
        submit(data,function(result){
          self.emit("submit",result);
        });
      }
    }
  });

  elem.find(".cancel").on("touchend", function(){
    self.emit("cancel");
  });
}

util.inherits(SwipeModal,events);

SwipeModal.prototype.show = function(){
  this.emit("show");
  this._show();
}

exports.create = function(config){
  return new SwipeModal(config);
}