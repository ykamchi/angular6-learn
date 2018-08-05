import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IndicesTypesService {
  uri = 'http://10.0.0.12:4000';

  constructor(private http: HttpClient, private authenticationService: AuthService) { 
  }

  getIndices(category, sub_category) {
    console.log("getIndices: "   + localStorage + " options: " + this.authenticationService.httpOptions());
    
    return this.http.get(`${this.uri}/indices/indices.types/indices/${category}/${sub_category}`, this.authenticationService.httpOptions());
  }

  getCategories() {
    console.log("getCategories: " + localStorage + " options: " + this.authenticationService.httpOptions());
    return this.http.get(`${this.uri}/indices/indices.types/categories`, this.authenticationService.httpOptions());
  }

  getSubCategories(category) {
    console.log("getSubCategories: " + localStorage + " options: " + this.authenticationService.httpOptions());
    return this.http.get(`${this.uri}/indices/indices.types/sub-categories/${category}`, this.authenticationService.httpOptions());
  }

  cloneIndex(index_type) {
    console.log("cloneIndex: " + localStorage + " options: " + this.authenticationService.httpOptions(), this.authenticationService.httpOptions());
    return this.http.post(`${this.uri}/indices/indices.types/clone`, index_type, this.authenticationService.httpOptions());
  }

  deleteIndex(index_type) {
    console.log("deleteIndex: " + localStorage);
    return this.http.post(`${this.uri}/indices/indices.types/delete/${index_type._id}`, index_type, this.authenticationService.httpOptions());
  }

  updateIndex(index_type) {
    console.log("updateIndex: " + localStorage);
    return this.http.post(`${this.uri}/indices/indices.types/update/${index_type._id}`, index_type, this.authenticationService.httpOptions());
  }

}
