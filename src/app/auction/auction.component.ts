import { Component, OnInit } from '@angular/core';
import { BidService } from '../services/bid.service';
import { Bid } from 'app/services/bid';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css'],
  providers: [BidService]
})
export class AuctionComponent implements OnInit {
  bidsForm: FormGroup;
  bids: Bid[];

  constructor(
    private bidService: BidService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.getBids();
    this.bidsForm = this.formBuilder.group({
      bidPrice: ['', Validators.required]
    });
  }
  //Html klasöründeki form aracına ulaşmasını sağlar.
  get f() { return this.bidsForm.controls; }
  //Proje başlatıldığında çalıştırılan fonksiyon
  getBids() {
    this.bidService.getBids().subscribe(data => {
      console.log(data)

      if (data.length == 0) {
         this.bidService.getAdd().subscribe(data => {
           console.log(data)
           this.bids = data;
         })
         this.refresh();
      }
      else{
        this.bids = data;
      }
    })
  }
  //Html'den ekle button click gerçekleştiğinde çağrılan fonksiyon
  addBids(id) {
    const body = {
      'bid_price': this.f.bidPrice.value,
    }
    this.bidService.postBids(body, id)
      .subscribe(response => {
        console.log("uloo add true ", response);
        this.refresh();
      });
    this.f.bidPrice.setValue('');
  }
  //Html'den temizle button click gerçekleştiğinde çağrılan fonksiyon
  onClickMe() {
    this.bidService.deleteBids().subscribe(data => {
      console.log(data);
      this.bids = data;

    });
    this.refresh();
  }
  //Herhangi bir işlem sonrası güncelleme
  refresh(): void {
    window.location.reload();
  }
  //İnput araçlarına yalnızca sayısal değer girilmesini sağlar.
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
}
