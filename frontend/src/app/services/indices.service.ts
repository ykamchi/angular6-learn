import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class IndicesService {
  uri = 'http://10.0.0.9:4000';

  constructor(private http: HttpClient) { }
  getIndicesTypes() {
    return this.http.get(`${this.uri}/indices/indices.types`);
  }

  get() {
    return this.http.get(`${this.uri}/indices`);
  }

  getById(id) {
    return this.http.get(`${this.uri}/indices/${id}`);
  }

  addIndexValue(index) {
    return this.http.post(`${this.uri}/indices/indices.values/add`, index);
  }

  update(id, index) {
    return this.http.post(`${this.uri}/indices/update/${id}`, index);
  }

  delete(id) {
    return this.http.get(`${this.uri}/indices/delete/${id}`);
  }

}
