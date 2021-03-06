import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,NavigationEnd,RoutesRecognized   } from '@angular/router';
@Component({
  selector: 'app-rejectmsg',
  templateUrl: './rejectmsg.component.html',
  styleUrls: ['./rejectmsg.component.css']
})
export class RejectmsgComponent implements OnInit {
  previousUrl: string;
  currentUrl: string;
  params:string;
  groupreject:boolean=false;
  cardreject:boolean=false;
  rulereject:boolean=false;
  userreject:boolean=false;
  billreject:boolean=false;
  payreject:boolean=false;
  billnewreject:boolean=false;
  paynewreject:boolean=false;
  constructor(private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.params = this.activatedRoute.snapshot.queryParams["msg"];
    console.log(this.params);
    if(this.params=='groupreject'){
      this.groupreject=true;
    }else if(this.params=='cardreject'){
      this.cardreject=true;
    }else if(this.params=='rulereject'){
      this.rulereject=true;
    }else if(this.params=='userreject'){
      this.userreject=true;
    }else if(this.params=='billreject'){
      this.billreject=true;
    }else if(this.params=='payreject'){
      this.payreject=true;
    }
    else if(this.params=='billnewreject'){
      this.billnewreject=true;
    }
    else if(this.params=='paynewreject'){
      this.paynewreject=true;
    }
    else{
      this.groupreject=false;
      this.cardreject=false;
      this.rulereject=false;
      this.userreject=false;
      this.billreject=false;
      this.payreject=false;
      this.billnewreject=false;
      this.paynewreject=false;
    }
  }

}
