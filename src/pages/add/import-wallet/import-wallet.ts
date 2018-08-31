import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { App, Events, NavController, NavParams } from 'ionic-angular';

import { DataService } from '../../data.service';

// import { PlatformProvider } from '../../../providers/platform/platform';
// import { PopupProvider } from '../../../providers/popup/popup';
//import { ProfileProvider } from '../../../providers/profile/profile';

// import {
  // WalletOptions,
  // WalletProvider
// } from '../../../providers/wallet/wallet';

@Component({
  selector: 'page-import-wallet',
  templateUrl: 'import-wallet.html'
})
export class ImportWalletPage {
  private derivationPathByDefault: string;
  //private derivationPathForTestnet: string;
  private importForm: FormGroup;
  // private reader: FileReader;
  // private defaults;
  // private errors;

  public prettyFileName: string;
  public importErr: boolean;
  public fromOnboarding: boolean;
  public formFile;
  public showAdvOpts: boolean;
  public selectedTab: string;
  public isCordova: boolean;
  public isSafari: boolean;
  public isIOS: boolean;
  public file: File;
  public code;
  public okText: string;
  public cancelText: string;
  public myBalances: any;
  public data: any;
  public myAddress: string;
  
  constructor(
    //private app: App,
    //private navCtrl: NavController,
    //private navParams: NavParams,
    private form: FormBuilder,
	//private walletProvider: WalletProvider,
	// private popupProvider: PopupProvider,
	// private platformProvider: PlatformProvider
	//private profileProvider: ProfileProvider
	private dataService: DataService
  ) {
	 // this.okText = this.translate.instant('Ok');
	 this.okText = 'Ok';
	 this.selectedTab = 'words'; 
	 this.showAdvOpts = false;
	 
	 this.importForm = this.form.group({
      words: [null, Validators.required],
      backupText: [null],
      passphrase: [null],
      file: [null],
      filePassword: [null],
      derivationPath: [this.derivationPathByDefault, Validators.required],
      testnetEnabled: [false],
	   //http://212.237.21.74:3000/api/
       //http://120.79.171.136:3000/api/
      //bwsURL: [this.defaults.bws.url],
	  bwsURL: 'http://212.237.21.74:3000/api/' ,
      //coin: [null, Validators.required]
	  coin: ["Earthcoin (EAC)", Validators.required]
    });
  }
  
  selectTab(tab: string) {
     this.selectedTab = tab;

     switch (tab) {
       case 'words':
        // this.file = null;
        // this.formFile = null;
         this.importForm.get('words').setValidators([Validators.required]);
         this.importForm.get('coin').setValidators([Validators.required]);
         this.importForm.get('filePassword').clearValidators();
         if (this.isCordova || this.isSafari)
           this.importForm.get('backupText').clearValidators();
         else this.importForm.get('file').clearValidators();
         break;
       case 'file':
        // if (this.isCordova || this.isSafari)
          // this.importForm
            // .get('backupText')
            // .setValidators([Validators.required]);
        // else this.importForm.get('file').setValidators([Validators.required]);
        // this.importForm
          // .get('filePassword')
          // .setValidators([Validators.required]);
        // this.importForm.get('words').clearValidators();
        // this.importForm.get('coin').clearValidators();
         break;

       default:
        // this.importForm.get('words').clearValidators();
        // this.importForm.get('file').clearValidators();
        // this.importForm.get('filePassword').clearValidators();
         break;
     }
     this.importForm.get('words').updateValueAndValidity();
    // this.importForm.get('file').updateValueAndValidity();
    // this.importForm.get('filePassword').updateValueAndValidity();
     this.importForm.get('backupText').updateValueAndValidity();
     this.importForm.get('coin').updateValueAndValidity();
  }
  
  import() {
     if (this.selectedTab === 'file') {
      // this.importFromFile();
     } else {
       this.importFromMnemonic();
     }
  }
  
  public importFromMnemonic(): void {
    //if (!this.importForm.valid) {
      // let title = this.translate.instant('Error');
      // let subtitle = this.translate.instant('There is an error in the form');
	//  let title = 'Error';
    //  let subtitle = 'There is an error in the form';
      //this.popupProvider.ionicAlert(title, subtitle);
     // return;
    //}

     //let opts: Partial<WalletOptions> = {};

     //if (this.importForm.value.bwsURL)
      // opts.bwsurl = this.importForm.value.bwsURL;

     // let pathData = this.derivationPathHelperProvider.parse(
       // this.importForm.value.derivationPath
     // );

    // if (!pathData) {
      // let title = this.translate.instant('Error');
      // let subtitle = this.translate.instant('Invalid derivation path');
      // this.popupProvider.ionicAlert(title, subtitle);
      // return;
    // }

    // opts.account = pathData.account;
    // opts.networkName = pathData.networkName;
    // opts.derivationStrategy = pathData.derivationStrategy;
     //opts.coin = this.importForm.value.coin;

     let words: string = this.importForm.value.words || null;

     if (!words) {

      // let title = this.translate.instant('Error');
      // let subtitle = this.translate.instant('Please enter the recovery phrase');
      // this.popupProvider.ionicAlert(title, subtitle);
      // return;
    // } else if (words.indexOf('xprv') == 0 || words.indexOf('tprv') == 0) {
      // return this.importExtendedPrivateKey(words, opts);
     } else {
		  console.log("log : before importMnemonic b:"+words);
		 this.myAddress=words;
		 
		// read balance from the block explorer
		var request = "https://chainz.cryptoid.info/eac/?q=getinfo/api.dws?q=unspent&key=8a2802e62c32&active=" + this.myAddress;
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", request, true);
		xmlhttp.send();
		var self=this;
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
			self.myBalances = JSON.parse(this.responseText);
					self.showBalance();
			}
		}
      // let wordList = words.split(/[\u3000\s]+/);

      // if (wordList.length % 3 != 0) {
        // let title = this.translate.instant('Error');
        // let subtitle = this.translate.instant(
          // 'Wrong number of recovery words:'
        // );
        // this.popupProvider.ionicAlert(title, subtitle + ' ' + wordList.length);
        // return;
      // }
     }

	 console.log("log : before importMnemonic a:"+words);
	 
    // opts.passphrase = this.importForm.value.passphrase || null;
     //this.importMnemonic(words, opts);
  }
  
	  
	private showBalance(): void {
		var total = Number("0.00000000");
		var confirmed = total;
		var unconfirmed = total
		// var element = document.getElementById("insertTx");
		// element.innerHTML = "";
		for (var i in this.myBalances.unspent_outputs) {
			var amount = Number(this.myBalances.unspent_outputs[i].value)/(1e+8);
			var confs = this.myBalances.unspent_outputs[i].confirmations;
			var txid = this.myBalances.unspent_outputs[i].tx_hash;
			var nout = this.myBalances.unspent_outputs[i].tx_ouput_n;
			var isConfirmed = (Number(confs) >= 6);
			total += amount;
			if (isConfirmed)
				confirmed += amount;
			else 
			unconfirmed += amount;
			// fill advanced balance details 
			//isDissabled = isConfirmed ? 'checked' : 'disabled';
			// element.innerHTML += '<input name="'+i+'" id="checkBox_' + i + '" onInput="recalcSelection()" type="checkbox" ' + isDissabled + ' value="' +  amount + '"><B>' + amount + ' EAC</B> {txid: ' +  txid + ', conf: ' + confs + '} </input><BR>'; 
		}
		//mySelected = confirmed;
		
		this.data = this.myBalances;
		this.data.lastTotalOwed = total.toFixed(8) + ' EAC';
		this.dataService.currentWallet.balence = total;
		this.dataService.currentWallet.walletAddress = this.myAddress;
		
		console.log("log : before importMnemonic a1:" + this.dataService.currentWallet.balence + ' EAC' + ',walletAddress:' + this.dataService.currentWallet.walletAddress );
		
		// document.getElementById("spTotal").innerHTML = total.toFixed(8) + ' EAC';
		// document.getElementById("spReceiving").innerHTML = unconfirmed.toFixed(8) + ' EAC';
		// document.getElementById("spAvaiable").innerHTML = confirmed.toFixed(8) + ' EAC';
		// document.getElementById("spSelected").innerHTML = mySelected.toFixed(8) + ' EAC';
	}

    private importMnemonic(words: string, opts): void {
    // this.onGoingProcessProvider.set('importingWallet');
     setTimeout(() => {
		 // this.profileProvider
         // .importMnemonic(words, opts)
		 // .then(wallet => {
			 // this.finish(wallet);
		 // });
		 // .catch(err => {
			// return;
		// });
		console.log("log : before importMnemonic b");
        // this.profileProvider
         // .importMnemonic(words, opts)
         // .then(wallet => {
          // // this.onGoingProcessProvider.clear();
		  // console.log("log : before importMnemonic finish");
           // this.finish(wallet);
         // })
         // .catch(err => {
          // // if (err instanceof this.errors.NOT_AUTHORIZED) {
            // // this.importErr = true;
          // // } else {
            // // let title = this.translate.instant('Error');
            // // this.popupProvider.ionicAlert(title, err);
          // // }
          // // this.onGoingProcessProvider.clear();
           // return;
         // });
     }, 100);
   }

  
    private finish(wallet): void {
    // this.walletProvider
      // .updateRemotePreferences(wallet)
      // .then(() => {
        // // this.profileProvider.setBackupFlag(wallet.credentials.walletId);
        // // this.events.publish('status:updated');
        // // this.pushNotificationsProvider.updateSubscription(wallet);
        // // if (this.fromOnboarding) {
          // // this.profileProvider.setOnboardingCompleted();
          // // this.navCtrl.push(DisclaimerPage);
        // // } else {
          // // this.app.getRootNavs()[0].setRoot(TabsPage);
        // // }
      // })
      // .catch(err => {
        // //this.logger.error('Import: could not updateRemotePreferences', err);
      // });
  }
  
  public toggleShowAdvOpts(): void {
    this.showAdvOpts = !this.showAdvOpts;
  }
  

  
}