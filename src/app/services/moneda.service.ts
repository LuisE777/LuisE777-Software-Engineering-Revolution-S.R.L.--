import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/env';
@Injectable({
  providedIn: 'root'
})
export class MonedaService {
  linkApi = environment.baseUrl;
  constructor(private http: HttpClient) { }

  API_URL='https://free.currconv.com/api/v7/convert?q=USD_BOB&compact=ultra&apiKey=5b5df85485ac635ca6dc';
  dollarABoliviano(){
    return this.http.get<any[]>(this.API_URL);
  }
}
