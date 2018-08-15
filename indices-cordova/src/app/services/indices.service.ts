import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';


@Injectable({
  providedIn: 'root'
})
export class IndicesService {
  
  constructor(private http: HttpClient, private config: ConfigService) { }

  getIndex(type_id, date) {
    let uri = this.config.getParam('backend_uri');
    return this.http.get(`${uri}/indices/indices.values/${type_id}/${date}`);
  }

  getIndices(type_id) {
    let uri = this.config.getParam('backend_uri');
    return this.http.get(`${uri}/indices/indices.values/${type_id}`);
  }

  saveIndex(index) {
    let uri = this.config.getParam('backend_uri');
    return this.http.post(`${uri}/indices/indices.values/save`, index);
  }

}
