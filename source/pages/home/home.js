// pages/content/content.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
  }

  bindtocreat(e) {
    wx.navigateTo({
      url: '/pages/createtask/createtask',
    })
  }
  bindtomine(e) {
    wx.navigateTo({
      url: '/pages/mine/mine',
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindtocreat = content.bindtocreat;
body.bindtomine = content.bindtomine;
Page(body)