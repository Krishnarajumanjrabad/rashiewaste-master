import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import {FeedbackPage} from "../feedback/feedback";
import {NavigateToPage} from "../navigate-to/navigate-to";
import {EnquiryFormPage} from "../enquiry-form/enquiry-form";

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  public tab1Root: any;
  public tab2Root: any;
  public tab3Root: any;
  public tab4Root: any;
  public tab5Root: any;
  public tab6Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = HomePage;
    this.tab2Root = ContactPage;
    this.tab3Root = FeedbackPage;
    this.tab4Root = NavigateToPage;
    this.tab5Root = EnquiryFormPage;
   // this.tab6Root = BrochurePage;
  }
}
