// pages/imgupload/imgupload.js
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
    this.Base.setMyData({
      rpttypelist: [],
      rpttype: {
        "type": ""
      },
      rptwaylist: [],
      rptway: {
        way: ""
      },
      photos:[],
      funclist:[{},{}]
    });
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
    api.sftypelist({
      id: this.Base.options.part_id
    }, (rpttypelist) => {
      this.Base.setMyData({
        rpttypelist
      });
    });

    var work_id = this.Base.options.work_id;
    if (work_id != undefined) {

      api.workinfo({
        id: work_id
      }, (workinfo) => {
        var photos=workinfo.photos;
        var ps=[];
        for(var i=0;i<photos.length;i++){
          ps.push(photos[i].img);
        }

        api.rptwaylist({
          "type": workinfo.type
        }, (rptwaylist) => {
          this.Base.setMyData({
            rptwaylist
          });
        });

        this.Base.setMyData({
          result: workinfo.result,
          remarks: workinfo.remarks,
          photos:ps,
          funclist:workinfo.funcs,
          rpttype:workinfo.rpttype,
          rptway:workinfo.rptway
        });
      });
    }


  }

  selectRPTType(e) {
    console.log(e);
    var seq = parseInt(e.detail.value);
    var rpttypelist = this.Base.getMyData().rpttypelist;
    var rpttype = rpttypelist[seq];
    this.Base.setMyData({
      rpttype
    });
    var api = new EngineeringApi();
    api.rptwaylist({
      "type": rpttype.id
    }, (rptwaylist) => {
      this.Base.setMyData({
        rptwaylist,
        rptway: {
          way: ""
        }
      });
    });

  }
  selectRPTWay(e){
    var seq = parseInt(e.detail.value);
    var rptwaylist = this.Base.getMyData().rptwaylist;
    var rptway = rptwaylist[seq];
    this.Base.setMyData({
      rptway
    });
  }
  upload(){
    this.Base.uploadImage("eng", (img)=>{
      var photos=this.Base.getMyData().photos;
      photos.push(img);
      this.Base.setMyData({photos});
    },  9)
  }
  addfunc(){
    var funclist=this.Base.getMyData().funclist;
    funclist.push({});
    this.Base.setMyData({funclist});
  }
  confirm(e){
    console.log(e);
    var data=e.detail.value;
    var rptway = this.Base.getMyData().rptway;
    var rpttype = this.Base.getMyData().rpttype;
    if(rpttype.id==undefined){
      this.Base.info("请选择收方类型");
      return;
    }
    if (rptway.id == undefined) {
      this.Base.info("请选择收方方式");
      return;
    }
    var photos=this.Base.getMyData().photos;
    if(photos.length==0){
      this.Base.info("请至少上传一张图片");
      return;
    }
    var funclist = this.Base.getMyData().funclist;
    var funccount=0;
    var funcs=[];
    for(var i=0;i<funclist.length;i++){

      var left = data["funcleft_" + i];
      var right = data["funcright_" + i];
      if (left == "" && right == ""){

      }
      else if(left == "" || right == ""){
        this.Base.info("第"+(i+1).toString()+"条公式不完整");
        return;
      }else{
        funccount++;
        funcs.push({left,right});
      }
    }
    if (funccount==0){
      this.Base.info("请至少输入一个公式");
      return;
    }
    if (data.result == "") {
      this.Base.info("请输入结果");
      return;
    }
    data.type=rpttype.id;
    data.way=rptway.id;
    data.part_id=this.Base.options.part_id;
    data.photos=photos.join(",");
    data.funcs=JSON.stringify(funcs);

    if (this.Base.options.work_id!=undefined){
      data.primary_id = this.Base.options.work_id;
    }
    var api=new EngineeringApi();
    api.addwork(data,(ret)=>{
      console.log(ret.result);
      this.dataReturn({work_id:ret.return});
    });
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow; 
body.selectRPTType = content.selectRPTType; 
body.selectRPTWay = content.selectRPTWay; 
body.upload = content.upload;
body.addfunc = content.addfunc;
body.confirm = content.confirm;
Page(body)