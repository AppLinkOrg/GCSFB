// pages/work/work.js
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
    var engapi =new EngineeringApi();
    engapi.englist({}, (englist)=>{
      this.Base.setMyData({englist})
    })
  }

  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: "收方",
    })
  }

  tocreatetask(e){
   wx.navigateTo({
     url: '/pages/position/position?eng_id='+e.currentTarget.id,
    })
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow; 
body.tocreatetask = content.tocreatetask;
Page(body)