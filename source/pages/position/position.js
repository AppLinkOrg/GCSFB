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
    engapi.psnlist({ eng_id: this.Base.options.eng_id,orderby:'r_main.seq'}, (psnlist) => {
      this.Base.setMyData({ psnlist })
    })
  }

  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: "部位列表",
    })
  }
  
  totypelist(e) {
    wx.navigateTo({
      url: '/pages/typelist/typelist?position_id='+e.currentTarget.id,
    })
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.totypelist = content.totypelist;
Page(body)