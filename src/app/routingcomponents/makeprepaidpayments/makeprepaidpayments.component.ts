import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import{CardserviceService} from '../../api/cardservice.service'
import {BillerserviceService} from  '../../api/billerservice.service'
import {UserserviceService} from '../../api/userservice.service'
import{LoaderService} from '../../api/loader.service'
import { Router } from '@angular/router';
import {PaymentserviceService} from  '../../api/paymentservice.service'
import { ToastrService } from 'ngx-toastr'
import {ExcelService} from '../../excelservice/excel.service'
import { DatePipe } from '@angular/common'
import {Config} from '../../config'
const path = new Config().getutilityBaseUrl();
@Component({
  selector: 'app-makeprepaidpayments',
  templateUrl: './makeprepaidpayments.component.html',
  styleUrls: ['./makeprepaidpayments.component.css']
})
export class MakeprepaidpaymentsComponent implements OnInit {
  select=false;
  billertype:boolean=false;
  billdetails:boolean=true;
  conf:boolean=false;
  currenCard :number=-1;
  success:boolean=false;
  reviewCard:boolean=false;
  cardHolder:string=""
  cardNumber:string="";
  cardExpiry:string="";
  cardinitiatedby:string="";
  cardinitiatedon:string="";
  cardapprovedby:string="";
  cardapprovedon:string="";
  selectedcard:any={}
  public checkedValueArray: any = [];
  public additionaldetails: any = [];
  selectall:boolean=false;
  public temp: any;
  public cntChk: number=0;
  public flag: any;
  display='none'; 
  states:any;
  paymentData : any={};
  billers:any;
  billerlist:any=[];
  bills :any = [];
  payments:any=[];
  filterQuery = "";
  rowsOnPage = 300;
  sortBy = "email";
  filename:string;
  sortOrder = "asc";
  activeElement :number;
  amountpay: number=0;
  totalamount: any=0;
  late_pay_charges:any;
  meter_reading:any;
  promt_pay_incentives:any;
  remarks:any;
  attachment_url:any;
  payment_id:any;
  cardid:any;
  public currentCard: any=0;
  pendingPayments:any=[]
  approvedcard:any=[]
  cardData:any=[];
  paymentdata:any={}
  downloadArray:any=[];
  filteredbills:any=[];
  editamtmodal:string='none';
  newamount:string;
  date:Date;
  paymentid:any;
  userdata:any=[];
  public progress: number;
  public message: string;
  public downloadFileName:string;
  fileUpload:File;
  constructor(private httpService: HttpClient,private cards:CardserviceService,private billservice: BillerserviceService, private loader: LoaderService, private users: UserserviceService,private router: Router,private paymentservice: PaymentserviceService,private toaster:ToastrService,private excelservice : ExcelService,public datepipe: DatePipe) { }

  ngOnInit() {
    this.billrdetails();
    this.loadApprovedCards();
    this.getuserdetails();
  }

  private getuserdetails(){
    this.users.getUserDetails().subscribe(resp=>{
     
      this.userdata=resp['Data']
      console.log(this.userdata)
    },error=>{
      console.log(error)
    })
  }

  getActivecard(id:any){
   
    this.activeElement = id;

    this.cards.getCardById(id).subscribe(resp=>{
      console.log("This Card List by Id")
      console.log(resp)
      this.cardHolder=resp['data'][0]['cardholder']
     this.cardNumber=resp['data'][0]['digits']
     this.cardExpiry=resp['data'][0]['expirydate']
     this.cardinitiatedby=resp['data'][0]['initiatedby']
     this.cardinitiatedon=resp['data'][0]['initiateddate']
     this.cardapprovedby=resp['data'][0]['approvedby']
     this.cardapprovedon=resp['data'][0]['aproveddate']
    })
    
    this.selectedcard=this.approvedcard[0]
    console.log(this.selectedcard)
    console.log(this.selectedcard['id'])
  }



  getBiller(stateid){  
    this.httpService.get('./assets/billers.json').subscribe(
      data=>{
        this.billers=data;
        for(var i=0;i<this.billers.length;i++){
          if(this.billers[i]['code']==stateid){
            this.billerlist=[];
            this.billerlist=this.billers[i]['billers']
          }
        }
        console.log(this.billerlist)       
      }
    )
  }

  openModalDialog(){
    this.display=''; //Set block css
  }
  closeModalDialog(id){
    this.display='block'; //set none css after close dialog
    this.payment_id=id;
  }

  editamount(id){
    this.editamtmodal='block'; //set none css after close dialog
    console.log("Edit Amount")
    this.paymentid=id;
    console.log(this.paymentid)
  }
  submitamount(){
    this.editamtmodal='';
    this.loader.display(true)
    var amtdata={
      "id":this.paymentid,
      "amount":this.newamount
    }
    console.log(amtdata)
    this.paymentservice.updateprepaidamt(amtdata).then(resp=>{
      console.log(resp)
      this.billrdetails();
     
    },error=>{
      console.log(error)
    })
  }

 closeamtmodal(){
    this.editamtmodal='';
  }
  billrdetails(){
    this.totalamount=0;
    this.checkedValueArray=[];
    this.selectall=false;
    this.select=false;
    this.loader.display(true)
    this.billertype=false;
    this.billdetails=true;
    this.reviewCard=false;
    this.bills=[]
    // for(var i=0;i<this.bills.length;i++){
    //        if(this.bills[i]['amount']!=null)
    //        this.totalamount+=parseInt(this.bills[i]['amount'])
    //      }
    
   this.billservice.getbillsforpay().then(resp=>{
    this.payments=resp
    var allBills = this.payments
    if(allBills!=null){
      this.bills = allBills.filter((bill)=>{
        return (bill['status']=="Registered" && bill['biller_type']=='Prepaid')
      })
    }
    console.log(this.bills)
    for(var i=0;i<this.bills.length;i++){
      if(this.bills[i]['amount']!=null)
      this.totalamount+=parseInt(this.bills[i]['amount'])
    }
    this.loader.display(false)
   },error=>{
     console.log(error)
     this.loader.display(false)
   })
  


  }

  // filtervalidamount(){
  //   this.loader.display(true)
  //   this.totalamount=0
  //   this.billservice.getAllbillers().then(resp=>{
  //     this.filteredbills=resp
  //     var allBills = this.filteredbills
  //     if(allBills!=null){
  //       this.bills = allBills.filter((bill)=>{
  //         return (bill['status']=="Registered" && bill['amount']!=null && bill['amount']>0)
  //       })
  //     }
  //     console.log(this.bills)
  //     for(var i=0;i<this.bills.length;i++){
      
  //       this.totalamount+=parseInt(this.bills[i]['amount'])
  //     }
  //     this.loader.display(false)
  //     this.toaster.success("Please Relaod the page to fetch all the bills again!","Alert",{
  //       timeOut:3000,
  //       positionClass:'toast-top-center'
  //       })
  //    },error=>{
  //      console.log(error)
  //      this.loader.display(false)
  //    })
  // }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  getCardDetails(card:any){
    this.selectedcard=card;
    //this.approvedcard[this.currentCard]=card
    console.log(this.selectedcard)
    this.cardHolder=card['cardholder']
    this.cardNumber=card['digits']
    this.cardExpiry=card['expirydate']
    this.cardinitiatedby=card['initiatedby']
    this.cardinitiatedon=card['initiateddate']
    this.cardapprovedby=card['approvedby']
    this.cardapprovedon=card['aproveddate']
    
  }

  private loadApprovedCards(){

    this.currenCard=-1;
    this.cards.getAll().subscribe(data=>{
      //console.log(data["data"])
     this.cardData=data["data"]
      console.log(this.cardData)
      for(let i = 0; i < this.cardData.length; i++){
        if(this.cardData[i].status == "Approved"){
            this.approvedcard.push(this.cardData[i]);
        }
    }

    console.log(this.approvedcard)
    console.log(this.approvedcard[0])
      if(this.currenCard ==-1){
        this.activeElement=this.approvedcard[0]["id"]
        this.getActivecard(this.approvedcard[0]["id"]);
      }
    },error=>{
      console.log(error)
    })
  }

  changeAll(pendingbillerpage): void {    
    if(this.checkedValueArray.length==this.bills.length){
    this.cntChk=1
    }else{
    this.checkedValueArray = [];
    this.amountpay=0
    this.cntChk=0
    }
    console.log(this.selectall)
    if (this.cntChk == 0) {
      this.cntChk = 1;
      this.temp = true;
      this.selectall=true;
      this.select=true;
      this.amountpay=0
      for (var i = 0; i < pendingbillerpage.length; i++) {
        var obj ={
          bill_id:pendingbillerpage[i]['id'],
          amount:pendingbillerpage[i]['amount'],
          billdate:pendingbillerpage[i]['fetch_bill_date'],
          duedate:pendingbillerpage[i]['fetch_due_date'],
          billnumber:pendingbillerpage[i]['fetch_bill_no'],
          attachment_url:pendingbillerpage[i]['attachment_url'],
          reading:pendingbillerpage[i]['reading'],
          remark:pendingbillerpage[i]['remark'],
          pay_incentive:pendingbillerpage[i]['pay_incentive'],
          late_pay_charge:pendingbillerpage[i]['late_pay_charge']
        }
        this.checkedValueArray.push(obj);
        if(pendingbillerpage[i]['amount']!=null)
        this.amountpay+=parseInt(pendingbillerpage[i]['amount'])
      }
      this.cntChk = 0;
    }
   
    else {
      this.cntChk = 0;
      this.temp = false;
      this.checkedValueArray = [];
      this.select=false;
      this.amountpay=0
    }
    console.log(this.checkedValueArray)
   // console.log(pendingbillerpage)
    
  }

  change(payment): void {
    this.flag = 0;
    for (var i = 0; i < this.checkedValueArray.length; i++) {

      if (this.checkedValueArray[i]["bill_id"] == payment["id"]) {
        this.checkedValueArray.splice(i, 1);
        this.flag = 1;
      }
    }
    if (this.flag == 0) {
      var obj={
        bill_id:payment['id'],
        amount:payment['amount'],
        billdate:payment['fetch_bill_date'],
        duedate:payment['fetch_due_date'],
        billnumber:payment['fetch_bill_no'],
        attachment_url:payment['attachment_url'],
        reading:payment['reading'],
        remark:payment['remark'],
        pay_incentive:payment['pay_incentive'],
        late_pay_charge:payment['late_pay_charge']
      }
      this.checkedValueArray.push(obj);     
    }
    for(var i=0;i<this.bills.length;i++){
      if(this.bills[i]['id'] == payment["id"]){
        if(this.flag==0){
          if(this.bills[i]['amount']!=null)
          this.amountpay+=parseInt(this.bills[i]['amount'])
        }else{
          if(this.bills[i]['amount']!=null)
          this.amountpay-=parseInt(this.bills[i]['amount'])
        }
      }
    }
    if (this.checkedValueArray.length > 0) {
      this.temp = true;
      if(this.checkedValueArray.length<this.bills.length){
        this.selectall=false
      }else{
        this.selectall=true;
        this.cntChk = 1;
      }
      console.log(this.selectall)     
    }
    else {
      this.temp = false;
      if(this.checkedValueArray.length<this.bills.length){
        this.selectall=false
      }else{
        this.selectall=true;
      }
      console.log(this.selectall)     
    }
    console.log(this.checkedValueArray)
    //console.log(this.payments)
  }  

  UploadFile(files): void {
    this.loader.display(true);
    console.log("File Upload Started")
    if (files.length === 0) {
        return;
      }
      let fileToUpload =  files.target.files[0];
      const formData = new FormData();
      this.downloadFileName=fileToUpload['name']
      formData.append('file', fileToUpload, fileToUpload.name);
      this.httpService.post(path+`api/v2/upload_bill_attachment/${this.payment_id}`, formData, {reportProgress: true, observe: 'events'})
        .subscribe(event => {
            this.loader.display(false);
          //this.route.navigate(['/main/dashboard']);
        },error=>{
          this.loader.display(false);
            this.toaster.error(error['error']['msg'],"Alert",{
                timeOut:3000,
                positionClass:'toast-top-center'
                })
        });
   }

  cnfsend(){
    if(this.checkedValueArray.length>0){
    this.billdetails=false;
    this.conf=true;
    this.billertype=false;   
    this.reviewCard=true;

    for(var i=0;i<this.payments.length;i++){
      for(var j=0;j<this.checkedValueArray.length;j++){
        if(this.payments[i].id == this.checkedValueArray[j]){
          this.pendingPayments.push(this.payments[i]);
        }
      }
    }
  }else{
    this.toaster.warning("Please Select Bills first!","Alert",{
      timeOut:3000,
      positionClass:'toast-top-center'
      })
  }
  }

  succesadd(){
    var d = new Date();
    var nd = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
    console.log(nd)
    var d = new Date();
    var weekday = new Array(7);
      weekday[0] = "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";
    var n = weekday[d.getDay()];
    if(nd<'13:58:00' && nd>'08:00:00'){
      console.log("Time for initiate transaction")
    }else{
      console.log("Transaction time passed")
    }
    if(n=='Saturday' || n=='Sunday'){
      this.toaster.error("You can't initiate payments on Satrurday and Sunday, please try to initiate between Monday and Friday !","Alert",{
        timeOut:8000,
        positionClass:'toast-top-center'
        })
    }else{
    if(nd<'13:58:00' && nd>'08:00:00'){
    this.loader.display(true);
    this.paymentData={
      "card_id":this.selectedcard['id'],
      "bills":this.checkedValueArray,
      "count":this.checkedValueArray.length,
      "totalamount":this.amountpay
    }
    if(this.userdata['isseq']==0){
    if(this.amountpay>0){
    console.log(this.paymentData)
    
    this.paymentservice.makepayment(this.paymentData).then(resp=>{
      console.log(resp)
      this.router.navigate(['/main/successmsg'],{queryParams:{msg:'paymentsuccess'}});
      this.loader.display(false);
    },error=>{
      this.toaster.error("Failed to register bill payment!","Alert",{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
      console.log(error)
      this.loader.display(false);
    })
  }else{
    this.toaster.error("Total Amount Should be greater than 0!","Alert",{
      timeOut:3000,
      positionClass:'toast-top-center'
      })
   
    this.loader.display(false);
  }
}else if(this.userdata['isseq']==1){
  if(this.amountpay>0){
    console.log(this.paymentData)
    
    this.paymentservice.makeseqpayment(this.paymentData).then(resp=>{
      console.log(resp)
      this.router.navigate(['/main/successmsg'],{queryParams:{msg:'paymentsuccess'}});
      this.loader.display(false);
    },error=>{
      this.toaster.error("Failed to register bill payment!","Alert",{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
      console.log(error)
      this.loader.display(false);
    })
  }else{
    this.toaster.error("Total Amount Should be greater than 0!","Alert",{
      timeOut:3000,
      positionClass:'toast-top-center'
      })
   
    this.loader.display(false);
  }
}else{
  this.toaster.error("Internal Server error!","Alert",{
    timeOut:3000,
    positionClass:'toast-top-center'
    })
}
  }else{
    this.toaster.error("Todays batch has passed now, you cannot initiate payment now. Please fetch the bills tomorrow between 08:00 AM and 01:58 PM and initiate the payments !","Alert",{
      timeOut:8000,
      positionClass:'toast-top-center'
      })
  }
}
    
   
   
    // var tempPendingPayments = this.pendingPayments.map((payment)=>{
    //   var card = this.selectedcard
    //   console.log(card)
    //   payment['status']='Pending';
    //   payment['paymentstatus']='Pending';
    //   payment['card']=card;
    //   return payment;
    // });
    // localStorage.setItem('payments' , JSON.stringify(tempPendingPayments));
  }

  backbilltype(){
    this.billdetails=false;
    this.billertype=true;
    this.conf=false;
    this.success=false;
    this.reviewCard=false;
  }

  

  backbilldetails(){
    this.billdetails=true;
    this.billertype=false;
    this.conf=false;
    this.success=false;
    this.reviewCard=false;
  }
  review(){
    this.billdetails=false;
    this.billertype=false;
    this.conf=false;
    this.success=false;
    this.reviewCard=true;
  }
  submitextradetails(){
    this.display=''; 
    var extradata={
      "reading":this.meter_reading,
      "late_pay_charge":this.late_pay_charges,
      "pay_incentive":this.promt_pay_incentives,
      "remark":this.remarks
    }
    this.paymentservice.updextradetail(extradata,this.payment_id).then(resp=>{
      console.log(resp)
    },error=>{
      console.log(error)
    })

  }

  onItemSelectDown(){
    
    
      for(let data of this.bills){
        var obj={
          Biller:data['biller_name'],
          Amount:data['amount'],
          Consumer_No:data['consumer_no'],
         
          Status:data['transaction_status'],
          Payment_Status:data['payment_status'],
          Short_Name:data['short_name'],
          GL_Expense_Code:data['gl_expense_code'],
        
          State:data['state'],
          Bill_Number:String(data['fetch_bill_no']),
          Card_Number:data['card_last_digits'],
          Order_Id:data['order_id'],
          Contact:data['contact_no'],
          Bill_Address:data['contact_address'],
          Email:data['email'],
         
          Initiated_by:data['initiated_by'],
          Initiated_On:data['initiated_date'],
       Due_date:data['fetch_due_date'],
       Bill_date:data['fetch_bill_date'],
      
  
        }
        this.downloadArray.push(obj)
      }
      this.excelservice.exportAsExcelFile( this.downloadArray, 'Payment List');
    
  }


}
