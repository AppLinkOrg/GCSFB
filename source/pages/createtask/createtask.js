// pages/createtask/createtask.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({today: this.Base.util.FormatDate(new Date())})
  }
  onMyShow() {
    var that = this;
  }
  binddate(e) {
    console.log(e);
    var that = this;
    this.setData({
      date: e.detail.value
    })
  }
  confirm(e){
    var that = this;
    var data = e.detail.value;
    if (data.person == "") {
      this.Base.info("填写联系人");
      return;
    }
    if (data.date == "") {
      this.Base.info("选择日期");
      return;
    }
    if (data.name == "") {
      this.Base.info("填写工程名称");
      return;
    }
    if (data.address == "") {
      this.Base.info("填写工程地址");
      return;
    }
    if (data.description == "") {
      this.Base.info("填写工程描述");
      return;
    }
    // if (data.scdate == "") {
    //   this.Base.info("上传照片");
    //   return;
    // }
    var person = data.person;
    var date=this.Base.getMyData().date;
    var name=data.name;
    var address=data.address;
    var description = data.description;
  }
  
  toimgupload(e){
    wx.navigateTo({
     url: '/pages/imgupload/imgupload',
    })
  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.confirm = content.confirm;
body.binddate = content.binddate;
body.toimgupload = content.toimgupload;
Page(body)