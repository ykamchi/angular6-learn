import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IndicesService {
  uri = 'http://10.0.0.12:4000';

  constructor(private http: HttpClient, private authenticationService: AuthService) { }

  getIndex(type_id, date) {
    console.log("Get ====>"+type_id+" " +date + " " + this.authenticationService.httpOptions());
    
    return this.http.get(`${this.uri}/indices/indices.values/${type_id}/${date}`, this.authenticationService.httpOptions());
  }

  getIndices(type_id) {
    console.log("Get ====>"+type_id+" " + this.authenticationService.httpOptions());
    
    return this.http.get(`${this.uri}/indices/indices.values/${type_id}`, this.authenticationService.httpOptions());
  }

  saveIndex(index) {
    console.log("Save ====>"+index.date+" _id: "+index._id);
    return this.http.post(`${this.uri}/indices/indices.values/save`, index, this.authenticationService.httpOptions());
  }

  /*
  getIndicesTypes(parent) {
    return this.http.get(`${this.uri}/indices/indices.types/${parent}`);
  }

  getById(id) {
    return this.http.get(`${this.uri}/indices/${id}`);
  }
  
  update(id, index) {
    return this.http.post(`${this.uri}/indices/update/${id}`, index);
  }

  delete(id) {
    return this.http.get(`${this.uri}/indices/delete/${id}`);
  }
  */
}
