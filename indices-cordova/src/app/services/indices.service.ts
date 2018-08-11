import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class IndicesService {
  uri = 'http://10.0.0.12:4000';

  constructor(private http: HttpClient) { }

  getIndex(type_id, date) {
    return this.http.get(`${this.uri}/indices/indices.values/${type_id}/${date}`);
  }

  getIndices(type_id) {
    return this.http.get(`${this.uri}/indices/indices.values/${type_id}`);
  }

  saveIndex(index) {
    return this.http.post(`${this.uri}/indices/indices.values/save`, index);
  }

}
