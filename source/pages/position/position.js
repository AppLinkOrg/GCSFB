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
  confirm(e) {
    var that = this;
    var data = e.detail.value;

    if(this.Base.options.issub=='Y')
    {
      this.Base.info("您已提交,请不要重复提交");
      return;
    }
   data.id=this.Base.options.eng_id;
    var psnlist=this.Base.getMyData().psnlist;
    console.log(psnlist);
    var isno=true;
    for (var i = 0; i < psnlist.length;i++)
    {
     if(psnlist[i].isfav==0)
     {
       isno=false;
     }

    }
    if (isno==false)
    {
      wx.showModal({
        title: '',
        content: '所有部位必须提交',
        showCancel: false,
       
        confirmText: '确定',
        confirmColor: '#2699EC',
        success: function (res) {
     
            
          
        }
      })
      return;
    }

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
          engapi.addshoufan(data, (res) => {
            

              that  .Base.info("提交成功");
              wx.navigateBack({

              })
            
          })
        }
      }
    })



  }
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: "部位列表",
    })
  }
  
  totypelist(e) {
    wx.navigateTo({
      url: '/pages/typelist/typelist?position_id=' + e.currentTarget.id + '&eng_id=' + this.Base.options.eng_id + '&issub=' + this.Base.options.issub,
    })
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.totypelist = content.totypelist;
body.confirm = content.confirm;
Page(body)