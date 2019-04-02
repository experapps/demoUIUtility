import { BrowserModule } from '@angular/platform-browser';
import { TooltipModule } from 'ng2-tooltip-directive';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './app.routing';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppComponent } from './app.component';
import { DashboardComponent } from './routingcomponents/dashboard/dashboard.component';
import { PendingBillerComponent } from './routingcomponents/pendingbiller/pendingbiller.component';
import {MatDialogModule} from '@angular/material/dialog';
//import {  } from './routingcomponents/checker-approve-biller/checker-approve-biller.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
// import * as $ from 'jquery';
import { BillerUnitaryComponent } from './routingcomponents/billerunitary/billerunitary.component';
import { BillerlistComponent } from './routingcomponents/billerlist/billerlist.component';
import { HeaderComponent } from './supportingcomponents/header/header.component';
import {DataTableModule} from "angular2-datatable";
import { PaymentListComponent } from './routingcomponents/paymentlist/paymentlist.component';
import { MakePaymentComponent } from './routingcomponents/makepayment/makepayment.component';
import { MatRadioModule, MatCheckboxModule, MatSelectModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
//import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import { PendingPaymentsComponent } from './routingcomponents/pendingpayments/pendingpayments.component';
import { MakerBillerBulkComponent } from './routingcomponents/maker-biller-bulk/maker-biller-bulk.component';
// import { OwlModule } from 'ngx-owl-carousel';
import { LoginComponent } from './authentication/login/login.component';
import { OtpComponent } from './authentication/otp/otp.component';
import { StartpageComponent } from './startpage/startpage.component';
import {AutoTabDirective} from './directives/autotab.directive';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OtpapprovePaymentComponent } from './routingcomponents/otpapprovepayment/otpapprovepayment.component';
import { OtpapproveBillerComponent } from './routingcomponents/otpapprovebiller/otpapprovebiller.component';
import { ToastrModule } from 'ngx-toastr';
import { NgDatepickerModule } from 'ng2-datepicker';
import { CardviewComponent } from './routingcomponents/cardview/cardview.component';
import { MyprofileComponent } from './supportingcomponents/myprofile/myprofile.component';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { UserunitaryComponent } from './routingcomponents/userunitary/userunitary.component';
import { CardunitaryComponent } from './routingcomponents/cardunitary/cardunitary.component';
import { UserbulkComponent } from './routingcomponents/userbulk/userbulk.component';
import { UnitarygroupComponent } from './routingcomponents/unitarygroup/unitarygroup.component';
import { UnitaryruleComponent } from './routingcomponents/unitaryrule/unitaryrule.component';
import { UserviewComponent } from './routingcomponents/userview/userview.component';
import { GroupviewComponent } from './routingcomponents/groupview/groupview.component';
import { RuleviewComponent } from './routingcomponents/ruleview/ruleview.component';
import { AccountsetupComponent } from './routingcomponents/accountsetup/accountsetup.component';
import { LoaderService } from './api/loader.service';
import { SuccessComponent } from './supportingcomponents/success/success.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { OrganisationComponent } from './routingcomponents/organisation/organisation.component';
import { PendingusersComponent } from './routingcomponents/pendingusers/pendingusers.component';
import { PendinggroupsComponent } from './routingcomponents/pendinggroups/pendinggroups.component';
import { PendingrulesComponent } from './routingcomponents/pendingrules/pendingrules.component';
import { PendingcardsComponent } from './routingcomponents/pendingcards/pendingcards.component';
import { ExcelService } from './excelservice/excel.service';
import { DataFilterPipeUser } from './routingcomponents/userview/data-filter-user.pipe';
import { OtpuserComponent } from './routingcomponents/otpuser/otpuser.component';
import {AspendingusersFilterPipe} from './routingcomponents/pendingusers/Aspendingusers-filter.pipe';
import { RejectmsgComponent } from './supportingcomponents/rejectmsg/rejectmsg.component';
import { OtpCardComponent } from './routingcomponents/otp-card/otp-card.component';
import { OtpRuleComponent } from './routingcomponents/otp-rule/otp-rule.component';
import { OtpGroupComponent } from './routingcomponents/otp-group/otp-group.component';
import { EmailValidator } from './directives/emailValidator.directive';
import { NumberOnlyDirective } from './directives/numbers.directive';
import { DatePipe } from '@angular/common';
import { NotificationmatrixComponent } from './supportingcomponents/notificationmatrix/notificationmatrix.component';
import { RepositoryComponent } from './supportingcomponents/repository/repository.component';
import { SamplebillsComponent } from './supportingcomponents/samplebills/samplebills.component';
import { TemplatesComponent } from './supportingcomponents/templates/templates.component';
import { BillerBulkComponent } from './routingcomponents/billerbulk/billerbulk.component';
import {AuthService} from './api/auth.service'
import{UserserviceService} from './api/userservice.service'
import{CardserviceService} from './api/cardservice.service'
import{GroupserviceService} from './api/groupservice.service'
import{RuleserviceService} from './api/ruleservice.service'
import { AuthinterceptorService} from './api/authinterceptor.service'
import { SetupserviceService} from './api/setupservice.service'
import { LightboxModule } from 'ngx-lightbox';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CustomCurrencyPipe } from './routingcomponents/paymentlist/currency.pipe';
import { PaymentFilterPipe } from './routingcomponents/paymentlist/payment-filter.pipe';
import { PenPayFilterPipe } from './routingcomponents/pendingpayments/pendingpay-filter.pipe';
import { BillerFilterPipe } from './routingcomponents/billerlist/biller-filter.pipe';
import { PenBillerFilterPipe } from './routingcomponents/pendingbiller/penbiller-filter.pipe';
import { FrenchDecimalPipe } from './pipes/currency.filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PendingBillerComponent,
    BillerUnitaryComponent,
    BillerlistComponent,
    HeaderComponent,
    PaymentListComponent,
    MakePaymentComponent,   
    PendingPaymentsComponent,
    MakerBillerBulkComponent,
    LoginComponent,
    OtpComponent,
    StartpageComponent,
    AutoTabDirective,
  
    OtpapprovePaymentComponent,
    OtpapproveBillerComponent,
    CardviewComponent,
    MyprofileComponent,
    UserunitaryComponent,
    CardunitaryComponent,
    UserbulkComponent,
    UnitarygroupComponent,
    UnitaryruleComponent,
    UserviewComponent,
    GroupviewComponent,
    RuleviewComponent,
    AccountsetupComponent,
    SuccessComponent,
    UserhomeComponent,
    OrganisationComponent,
    PendingusersComponent,
    PendinggroupsComponent,
    PendingrulesComponent,
    PendingcardsComponent ,
    DataFilterPipeUser,
    CustomCurrencyPipe,
    PaymentFilterPipe,
    PenPayFilterPipe,
    BillerFilterPipe,
    PenBillerFilterPipe,
    OtpuserComponent ,
    AspendingusersFilterPipe,
    RejectmsgComponent,
    OtpCardComponent,
    OtpRuleComponent,
    OtpGroupComponent,
    EmailValidator,
    NumberOnlyDirective,
    NotificationmatrixComponent,
    RepositoryComponent,
    SamplebillsComponent,
    TemplatesComponent,
    BillerBulkComponent,
    FrenchDecimalPipe
  ],

  imports: [
    TooltipModule,
    BrowserModule,
    RouterModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    //MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    // MatRadioModule,
    // MatSelectModule,
    MatDialogModule,
    CarouselModule ,
    HttpClientModule,
    AngularDateTimePickerModule,
    MatNativeDateModule,
    NgMultiSelectDropDownModule.forRoot(),
    DataTableModule,
    ToastrModule.forRoot(),
    NgDatepickerModule,
    LightboxModule ,
    Ng2OrderModule,
    Ng2SearchPipeModule

  ],
 
  providers: [LoaderService,ExcelService,DatePipe,AuthService,UserserviceService,CardserviceService,GroupserviceService,RuleserviceService,SetupserviceService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthinterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
