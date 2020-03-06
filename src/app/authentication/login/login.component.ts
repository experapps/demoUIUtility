import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'
import { Routes, RouterModule,Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { AuthService} from '../../api/auth.service'
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
username:string=""
password:string=""
display='none';
dob:any;
orgid:any;
email:any;
settings = {
  bigBanner: true,
  timePicker: false,
  format: 'MM-yyyy',
  defaultOpen: false
}
orgdata:any=[];
date:Date = new Date();
mindate:Date=new Date("1950-01-01")
maxdate:Date=new Date("2000-01-01")
multiple: boolean=false 
options:any;
config = {}
showorg:boolean=false;
  constructor(private http: HttpClient,private router: Router,private toastr: ToastrService,private auth:AuthService,public datepipe: DatePipe) { }

  ngOnInit() {
   
  
}

  openModalDialog(){
    this.display='block'; //Set block css
 }

 selectionChanged($event){
console.log($event)
 }

 orgname($event){
console.log($event)
 }

getorglist(email){
this.auth.getorganisationbyemail(email).then(data=>{
  if(data['data'].length>0 && data['data']!=undefined){
    this.showorg=true
    this.orgdata=data['data']
    console.log(this.orgdata)
  }
  
})
 }

  closeModalDialog(){
    this.display='none'; //set none css after close dialog
  
   }

   validatedate(){
    var date=this.datepipe.transform(this.dob, 'yyyy-MM-dd')
    if(date<this.datepipe.transform(this.mindate, 'yyyy-MM-dd')){
      this.toastr.warning("Please Enter date after 01st Jan 1950!",'Alert',{
                timeOut:3000,
                positionClass:'toast-top-center'
                })
    }else if(date>this.datepipe.transform(this.maxdate, 'yyyy-MM-dd')){
      this.toastr.warning("Please Enter date before 31st Dec 2000!",'Alert',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }
  }

  loginpost(){
    console.log(this.username+" "+this.password)
    // this.toastr.warning("Please Enter User Name!","Alert",{
    //   timeOut:3000,
    //   positionClass:'toast-top-center'
    //   })

      if(this.username==null|| this.username==undefined || this.username==""){
        this.toastr.warning("Please Enter User Name!","Alert",{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }else if(this.password==null|| this.password==undefined || this.password==""){
        this.toastr.warning("Please Enter Password!","Alert",{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }else if((this.password==null|| this.password==undefined || this.password=="") && (this.username==null|| this.username==undefined || this.username=="")){
        this.toastr.warning("Please Enter User Details!","Alert",{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }else{
        this.auth.loginuser(this.username,this.password)
        //this.router.navigate(['/otp']);
      }
  }

  reqpwd(){
    this.auth.requestPassword(this.email,this.orgid);
  }

  selectOption(id: number){
this.orgid=id;
  }

  

}
