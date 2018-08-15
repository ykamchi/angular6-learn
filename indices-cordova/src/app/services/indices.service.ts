import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class IndicesService {
  
  constructor(private http: HttpClient) { }

  getIndex(type_id, date) {
    
    return this.http.get(`${environment.backend_uri}/indices/indices.values/${type_id}/${date}`);
  }

  getIndices(type_id) {
    return this.http.get(`${environment.backend_uri}/indices/indices.values/${type_id}`);
  }

  saveIndex(index) {
    return this.http.post(`${environment.backend_uri}/indices/indices.values/save`, index);
  }

}
