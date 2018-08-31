import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// Pages
import { AddPage } from '../add/add';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  public goToAddView(): void {
    this.navCtrl.push(AddPage);
  }
}
