import { Component, OnInit } from '@angular/core';
import {UserserviceService} from '../../api/userservice.service'
import { Users } from '../../models/users';
@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  userdata:any={};
  isOrg:boolean;
  isUser:boolean;
  isCard:boolean;
  isGroup:boolean;
  isRule:boolean;
  isSupplier:boolean;
  isPayment:boolean;
  isViewuser:boolean;
  isUniuser:boolean;
  isBulkuser:boolean;
  isAppruser:boolean;
  isViewcard:boolean;
  isUnicard:boolean;
  isApprcard:boolean;
  isViewgroup:boolean;
  isUnigroup:boolean;
  isApprgroup:boolean;
  isRuleValidate:boolean;
  isUnirule:boolean;
  isRuleappr:boolean;
  isViewsup:boolean;
  isUnisup:boolean;
  isBulksup:boolean;
  isApprsup:boolean;
  isViewpay:boolean;
  isUnipay:boolean;
  isApprpay:boolean;
  isBulkpay:boolean;
  isAuthmatrix:boolean;
  isRm:boolean;
  constructor(private usrservice:UserserviceService) { }

  ngOnInit() {
    this.getUserDetail();
  }

  private getUserDetail(){
    this.usrservice.getUserDetails().subscribe(res=>{
      //console.log(res)
      this.userdata=res['Data'];
      //this.currentUser = users['Data']; 
         if(this.userdata.tabpermissionids !=null){
          var str = this.userdata.tabpermissionids;
          str = str.replace("pid=" ,"");
          str = str.replace(";cid=",",");
          str = str.replace(";","");
          str = str.replace(" ","");
          var tab_arr = str.split(",");
          // this.isOrg = this.checkValInArray("2",tab_arr)
          // this.isUser = this.checkValInArray("4",tab_arr)
          // this.isCard = this.checkValInArray("22",tab_arr)
          // this.isGroup = this.checkValInArray("52",tab_arr)
          // this.isRule = this.checkValInArray("38",tab_arr)
          // this.isSupplier = this.checkValInArray("26",tab_arr)
          // this.isPayment = this.checkValInArray("18",tab_arr)
          this.isViewuser = this.checkValInArray("17",tab_arr)
          //console.log(tab_arr);
          this.isUniuser = this.checkValInArray("6",tab_arr)
          this.isBulkuser = this.checkValInArray("7",tab_arr)
          this.isAppruser = this.checkValInArray("76",tab_arr)
          this.isViewcard = this.checkValInArray("23",tab_arr)
          this.isUnicard = this.checkValInArray("24",tab_arr)
          //console.log(this.isUnicard);
          this.isApprcard = this.checkValInArray("77",tab_arr)
          this.isViewgroup = this.checkValInArray("54",tab_arr)
          this.isUnigroup = this.checkValInArray("53",tab_arr)
          this.isApprgroup = this.checkValInArray("80",tab_arr)
          this.isRuleValidate = this.checkValInArray("39",tab_arr)
          this.isUnirule = this.checkValInArray("40",tab_arr)
          this.isRuleappr = this.checkValInArray("79",tab_arr)
          this.isViewsup = this.checkValInArray("28",tab_arr)
          this.isUnisup = this.checkValInArray("27",tab_arr)
          this.isBulksup = this.checkValInArray("51",tab_arr)
          this.isApprsup = this.checkValInArray("74",tab_arr)
          this.isViewpay = this.checkValInArray("19",tab_arr)
          this.isUnipay = this.checkValInArray("20",tab_arr)
          this.isApprpay = this.checkValInArray("75",tab_arr)
          this.isBulkpay = this.checkValInArray("21",tab_arr)
          console.log("Group view:"+this.isViewgroup);
        }
        this.isAuthmatrix=false;
      this.isRm=false;
      if(res['Data']['orgid']!=null){
        if(res['Data']['authmtrix']=="Complex"){
          this.isAuthmatrix=true;
        }else{
          this.isAuthmatrix=false;
        }
      }
      if(res['Data']['roleid']==1){
        this.isRm=true;
      }else{
        this.isRm=false;
      }

         console.log(this.userdata);
    
    },error=>{
      console.log(error)
    })
      }

      checkValInArray(tabid:string , tab_array:string[]){
        return (tab_array.indexOf(tabid)==-1)?false:true;
    }

}
