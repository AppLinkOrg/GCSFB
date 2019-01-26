// pages/createtask/createtask.js
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
    
    if (data.type == "") {
      this.Base.info("填写默认关联部位类型");
      return;
    }

    if (data.type_num == "") {
      this.Base.info("请输入部位类型编号");
      return;
    }

    if (data.remarks == "") {
      this.Base.info("请填写备注");
      return;
    }

    // if (data.scdate == "") {
    //   this.Base.info("上传照片");
    //   return;
    // }
    var type = data.type;
    //var date=this.Base.getMyData().date;
    var type_num = data.type_num;
    var remarks = data.remarks;
    //var description = data.description;
    wx.showModal({
      title: '',
      content: '您是否确认提交？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function (res) {
        var engapi = new EngineeringApi();
        if (res.confirm) {
          engapi.addbasicswork({ status: "A", type: type, type_num: type_num, remarks: remarks }, (addbasicswork) => {
            that.Base.setMyData({ addbasicswork })
          })
        }
        wx.showToast({
          title: '提交成功',
        })
      }
    })
    
    

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