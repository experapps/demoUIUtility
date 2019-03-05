import { Component, OnInit,ViewChild } from '@angular/core';




@Component({
  selector: 'app-dashboard-maker',
  templateUrl: './dashboard-maker.component.html',
  styleUrls: ['./dashboard-maker.component.css']
})
export class DashboardMakerComponent implements OnInit {
  public currentCard: any=0;
  billdata:any=[];
  pendingbillers:any=[];
  billerlength:number=0;
  approvedcard:any=[
    {approvedby: "Mr. K.V. HEBBAR",
    aproveddate: "28-02-2019",
    aprovedtime: "12:10:52",
    cardholder: "Test card",
    digits: "4859 xxxx xxxx 0005",
    expirydate: "09/22",
    id: 1,
    initiatedby: "Mr. Naveen Lohiya",
    initiateddate: "28-02-2019",
    initiatedtime: "12:09:38",
    orgid: 73,
    regcmt: "",
    status: 1},
    {
      approvedby: "Mr. K.V. HEBBAR",
  aproveddate: "28-02-2019",
  aprovedtime: "19:17:24",
  cardholder: "Test Card 1",
  digits: "4859 xxxx xxxx 0047",
  expirydate: "06/22",
  id: 2,
  initiatedby: "Mr. Naveen Lohiya",
  initiateddate: "28-02-2019",
  initiatedtime: "17:30:29",
  orgid: 73,
  regcmt: "",
  status: 1
    }
  ]
  constructor() { }

  ngOnInit() {
    this.billdata=JSON.parse(localStorage.getItem('billdetails'));
    console.log(this.billdata)

    this.pendingbillers = this.billdata.filter((data)=>data['status']=='Pending');
    if(this.pendingbillers==null){
      this.billerlength=0
    
    }else{
      this.billerlength=this.pendingbillers.length;
      
    }
  }

  goToNextCard() {
    if (this.approvedcard.length - 1 == this.currentCard) {
      this.currentCard = 0;
    }
    else {
      this.currentCard++;
    }

  }

  goToPrevCard() {
    if (this.currentCard == 0) {
      this.currentCard = this.approvedcard.length - 1;
    }
    else {
      this.currentCard--;
    }
  }

}
