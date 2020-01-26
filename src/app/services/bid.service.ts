import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Bid } from './bid';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BidService {

  constructor(
    private http: HttpClient
  ) { }
  //path: string = "http://localhost:5000/"
  getBids(): Observable<Bid[]> {
    return this.http.get<Bid[]>("http://localhost:5000/")
  }

  postBids(body, id) : Observable<any> {
    return this.http.post("http://localhost:5000/"+id, body);
  }
  deleteBids(): Observable<Bid[]> {
    return this.http.get<Bid[]>("http://localhost:5000/delete")
  }
  getAdd(): Observable<Bid[]> {
    return this.http.get<Bid[]>("http://localhost:5000/add")
  }
}
