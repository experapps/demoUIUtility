import { Component, OnInit } from '@angular/core';
import {ExcelService} from '../../excelservice/excel.service'
import {BillerserviceService} from  '../../api/billerservice.service'
import{LoaderService} from '../../api/loader.service'
import {RmservicesService} from '../../api/rmservices.service'
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import {Config} from '../../config'
const path = new Config().getutilityBaseUrl();
import {saveAs as importedSaveAs} from "file-saver";
import {Observable} from 'rxjs/Rx';
import { Http, ResponseContentType , Headers,RequestOptions} from '@angular/http';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-rmdirpaybillers',
  templateUrl: './rmdirpaybillers.component.html',
  styleUrls: ['./rmdirpaybillers.component.css']
})
export class RmdirpaybillersComponent implements OnInit {
  display='none'; 
  billdata:any=[];
  billerlength:number=0;
  noofrole="No bills available"
  filterQuery = "";
  rowsOnPage = 300;
  sortBy = "email";
  sortOrder = "asc";
  dropdownList = [];
  dropdownCat = [];
  dropdownDownload = [];
  selectedItems = [];
  selectedItems1 = [];
  selectedItems2 = [];
  dropdownSettings = {};
  dropdownSettings1 = {};
  dropdownSettings2 = {};
  key: string = 'status'; //set default
  reverse: boolean = false;
rolename:any;
settings = {
  bigBanner: true,
  timePicker: false,
  format: 'dd-MM-yyyy',
  defaultOpen: false
}
todate:Date = new Date();
fromdate:Date = new Date();
public searchText : string;
downloadArray:any=[];
approveRejBiller:any=[];
userdata:any={};
approverdetails:any=[];
selectedIndex = -1;
billparams:any={};
public id: string;
statusddSettings = {};
dropdownStatus = [];
statusselected=[];
filterstatus:any="0";
filterinterval:any="0";
filtercategory:any="6f6af57a-5c48-442e-b5b8-8b3559b10cd9";
filterorgid:any;
organisation_id:any;
selectallpara:boolean=false;
filterfromdate:any;
  filtertodate:any
  billername:boolean=false;
consumerno:boolean=false;
duedate:boolean=false;
billdate:boolean=false;
glexpensecode:boolean=false;
shortname:boolean=false;
email:boolean=false;
contactno:boolean=false;
contactaddress:boolean=false;
utilityname:boolean=false;
status:boolean=false;
location:boolean=false;
initiatedby:boolean=false;
initiatedon:boolean=false;
last:number;
start:number; 
dateformat:number=0;
totalPages:number;
startIndex:number;
endIndex:number;
pageNumber:number=1;
pageSize:number=1000;
totalsupplier:number=0;
supplyList: any = [];
supplylists: any = [];
pages:any;
orgList: any = [];
orgname:any=""
  constructor(private excelservice : ExcelService,private loaderService: LoaderService,private billservice:BillerserviceService,private rmservice:RmservicesService,private route: ActivatedRoute,private toastr: ToastrService,private http: Http,public datepipe: DatePipe) { }

  ngOnInit() {

    

    this.filterorgid = this.route.snapshot.paramMap.get('id');
    this.rmservice.getAllOrganizations().then(resp => {
      this.orgList = resp.data;
     console.log(this.orgList)
     for(let data of this.orgList){
      if(data['OrgId']==this.filterorgid){
        this.orgname=data['CompanyName']
      }else{
       // console.log("No Orgid")
      }
    }
    });

   

    this.loadPaginatedSuppliers(this.filterorgid,this.dateformat,this.pageNumber,this.pageSize);

    this.filterfromdate=this.fromdate
    this.filtertodate=this.todate;
    this.dropdownList = [
      { item_id: 0, item_text: 'All' },
      { item_id: 1, item_text: 'Today' },
      { item_id: 2, item_text: 'This Week' },
      { item_id: 3, item_text: 'This Month' },
      { item_id: 4, item_text: 'This Year' }
    ];

    this.dropdownSettings1 = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
      enableCheckAll:false
    };
    this.dropdownCat = [
      { item_id: "6f6af57a-5c48-442e-b5b8-8b3559b10cd9", item_text: 'Electricity' }
    ];
    this.dropdownSettings2 = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
      enableCheckAll:false
    };
    this.dropdownDownload = [
      { item_id: 1, item_text: 'Standard List' },
    
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
      enableCheckAll:false
    };

    this.statusddSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
      enableCheckAll:false
    };

    this.dropdownStatus = [
      { item_id: 1, item_text: 'All' },
      { item_id: 2, item_text: 'Registered' },
      { item_id: 3, item_text: 'Rejected' },
      { item_id: 4, item_text: 'Pending' }
    ];
    //this.loadallbills();
  }
  onItemSelectDown(items:any){
    this.downloadArray=[]
    console.log(items);
    if(items['item_id']==2){
      this.display='block';
    }else if(items['item_id']==1){
      for(let data of this.supplyList){
        var obj={
          UtilityName:data['utilitynmae'],
          Biller:data['name'],
          Consumer_No:data['consumerno'],
          Status:data['status'],
         Location:data['location'],
          GL_Expense_Code:data['glexpensecode'],
          Reference_no_1:data['bucode'],
          Reference_no_2:data['circle'],
          Contact:data['contact'],
          Email:data['email'],
          BankAccountNo:data['accno'],
          IFSC:data['ifsc'],
          BankName:data['bank'],
          Branch:data['branch'],
          UploadFileName:data['uploadfilename'],
          Initiated_by:data['initiatedby'],
          Initiated_On:`${data['initiateddate']}|${data['initiatedtime']}`,

  
        }
        this.downloadArray.push(obj)
      }
      this.excelservice.exportAsExcelFile( this.downloadArray, 'Biller List');
    }


  }

  getApproverDetails(id,index){
    this.selectedIndex = index;
    this.billservice.billapprlogs(id).then(resp=>{
      console.log(resp)
      if(resp!=null){
      this.approverdetails=resp['data']
      }else{
        this.approverdetails=[];
      }
    },error=>{
      console.log(error)
    })
  }
  
  loadPaginatedSuppliers(id,dateformat,pageno,pagesize){
    this.dateformat=dateformat;
    this.pageNumber=pageno;
    this.pageSize=pagesize;
    //this.spinner.show()
    this.rmservice.getFilterdNPagedData(this.filterorgid,this.dateformat,this.pageNumber,this.pageSize).then(data=>{
    this.totalsupplier=data['TotalCount'][0];
    console.log(this.totalsupplier)
    // calculate total pages
    let totalPages = Math.ceil(this.totalsupplier / this.pageSize);
    // ensure current page isn't out of range
    if (this.pageNumber < 1) {
    this.pageNumber = 1;
   // this.spinner.hide()
    return;
    } else if (this.pageNumber > totalPages) {
    this.pageNumber = totalPages;
  //  this.spinner.hide()
    return;
    }
    
    let startPage: number, endPage: number;
    if (totalPages <= 10) {
    // less than 10 total pages so show all
    startPage = 1;
    endPage = totalPages;
    } else {
    // more than 10 total pages so calculate start and end pages
    if (this.pageNumber <= 6) {
    startPage = 1;
    endPage = 10;
    } else if (this.pageNumber + 4 >= totalPages) {
    startPage = totalPages - 9;
    endPage = totalPages;
    } else {
    startPage = this.pageNumber - 5;
    endPage = this.pageNumber + 4;
    }
    }
    
    // calculate start and end item indexes
    let startIndex = (this.pageNumber - 1) * this.pageSize;
    let endIndex = Math.min(startIndex + this.pageSize - 1, this.totalsupplier - 1);
    
     // create an array of pages to ng-repeat in the pager control
            let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
    this.totalPages=totalPages;
    this.start=startPage;
    this.last=endPage;
    this.startIndex=startIndex;
    this.endIndex=endIndex;
    this.pages=pages;
    //console.log(this.totalPages+" "+this.start+" "+this.last+" "+this.startIndex+" "+this.endIndex+" "+this.pages);
    console.log(data['data']);
    this.supplyList = data['data'];
   // this.spinner.hide()
    },error=>{
    console.log("Error in fetching")
    console.log(error);
   // this.spinner.hide()
    })
    }

}
