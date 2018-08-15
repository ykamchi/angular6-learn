import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class IndicesTypesService {

  constructor(private http: HttpClient, private config: ConfigService) { 
  }

  getIndices(category, sub_category) {
    let uri = this.config.getParam('backend_uri');
    return this.http.get(`${uri}/indices/indices.types/indices/${category}/${sub_category}`);
  }

  getCategories() {
    let uri = this.config.getParam('backend_uri');
    return this.http.get(`${uri}/indices/indices.types/categories`);
  }

  getSubCategories(category) {
    let uri = this.config.getParam('backend_uri');
    return this.http.get(`${uri}/indices/indices.types/sub-categories/${category}`);
  }

  cloneIndex(index_type) {
    let uri = this.config.getParam('backend_uri');
    return this.http.post(`${uri}/indices/indices.types/clone`, index_type);
  }

  deleteIndex(index_type) {
    let uri = this.config.getParam('backend_uri');
    return this.http.post(`${uri}/indices/indices.types/delete/${index_type._id}`, index_type);
  }

  updateIndex(index_type) {
    let uri = this.config.getParam('backend_uri');
    return this.http.post(`${uri}/indices/indices.types/update/${index_type._id}`, index_type);
  }

}
