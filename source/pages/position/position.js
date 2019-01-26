// pages/position/position.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { EngineeringApi } from "../../apis/engineering.api.js";

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
    var engapi = new EngineeringApi();
    engapi.psnlist({orderby:'r_main.id'}, (psnlist) => {
      this.Base.setMyData({ psnlist })
    })
  }

  totypelist(e) {
    wx.navigateTo({
      url: '/pages/typelist/typelist',
    })
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.totypelist = content.totypelist;
Page(body)