import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DiseaseService {

  constructor(private http: HttpClient) { }

  predict(data: any) {
    return this.http.post('http://127.0.0.1:5000/predict', data);
  }
}
