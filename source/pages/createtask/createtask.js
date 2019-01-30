// pages/createtask/createtask.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";
import {
  EngineeringApi
} from "../../apis/engineering.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.part_id = 1;
    super.onLoad(options);
    wx.getStorage({
      key: 'isedit',
      success: (res)=>{
        this.Base.setMyData({isedit:res});
      },
    })
    this.Base.setMyData({
      worklist:[],
      workinfolist:[],
      today: this.Base.util.FormatDate(new Date())
    })
  }
  onMyShow() {
    var that = this;
    var api = new EngineeringApi();
    api.partinfo({
      id: this.Base.options.part_id
    }, (partinfo) => {
      this.Base.setMyData({
        partinfo
      });
    });
    this.loadworklist();
    if (this.Base.options.workdata_id){
      api.workdatainfo({
        id: this.Base.options.workdata_id
      }, (workdatainfo) => {
        this.Base.setMyData({
          no: workdatainfo.no,
          remark: workdatainfo.remark,
          worklist: workdatainfo.worklist
        });
        this.loadworklist();
      });
    }
  }
  loadworklist() {
    var api = new EngineeringApi();
    var worklist = this.Base.getMyData().worklist;
    if (worklist.length > 0) {
      console.log(worklist.join(","));
      api.workinfolist({
        idlist: worklist.join(",")
      }, (workinfolist) => {
        this.Base.setMyData({
          workinfolist
        });
      });
    }
  }
  binddate(e) {
    console.log(e);
    var that = this;
    this.setData({
      date: e.detail.value
    })
  }
  confirm(e) {
    var that = this;
    var data = e.detail.value;

    if (data.no == "") {
      this.Base.info("请输入部位类型编号");
      return;
    }

    if (data.remark == "") {
      this.Base.info("请填写备注");
      return;
    }

    var workinfolist=this.Base.getMyData().workinfolist;
    if(workinfolist.length==0){
      this.Base.info("请添加收方数据");
      return;
    }
    var worklist = this.Base.getMyData().worklist ;
    data.part_id=this.Base.options.part_id;
    data.idlist= worklist.join(",");
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
      success: function(res) {
        var engapi = new EngineeringApi();
        if (res.confirm) {
          engapi.addbasicswork(data, (res) => {
            if(res.code==0){

              wx.showToast({
                title: '提交成功',
              })
              wx.navigateBack({

              })
            }else{
              that.info(res.result);
            }
          })
        }
      }
    })



  }

  toimgupload(e) {
    var work_id = e.currentTarget.id;
    console.log(work_id);
    wx.navigateTo({
      url: '/pages/imgupload/imgupload?part_id=' + this.Base.options.part_id + (work_id == "" ? "" : "&work_id=" + work_id),
      fail:function(e){
        console.log(e);
      }
    })
  }
  dataReturnCallback(callbackid, data) {
    console.log(data);
    var worklist=this.Base.getMyData().worklist;
    worklist.push(data.work_id);
   
    // var api = new EngineeringApi();
    // api.workinfo({
    //   id: data.work_id
    // }, (workinfo) => {
    //   this.Base.setMyData({
    //     workinfo
    //   });
    // }); 
  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.confirm = content.confirm;
body.binddate = content.binddate;
body.loadworklist = content.loadworklist;
body.toimgupload = content.toimgupload;
Page(body)