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
    //options.id = 1;
    super.onLoad(options);
    
  }
  onMyShow() {
    var that = this;
    var api = new EngineeringApi();
    api.getworkdatafull({id:this.Base.options.id},(info)=>{
      this.Base.setMyData(info);
    });
    
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