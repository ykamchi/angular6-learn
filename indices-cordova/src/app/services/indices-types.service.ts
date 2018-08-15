import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IndicesTypesService {

  constructor(private http: HttpClient) { 
  }

  getIndices(category, sub_category) {
    return this.http.get(`${environment.backend_uri}/indices/indices.types/indices/${category}/${sub_category}`);
  }

  getCategories() {
    return this.http.get(`${environment.backend_uri}/indices/indices.types/categories`);
  }

  getSubCategories(category) {
    return this.http.get(`${environment.backend_uri}/indices/indices.types/sub-categories/${category}`);
  }

  cloneIndex(index_type) {
    return this.http.post(`${environment.backend_uri}/indices/indices.types/clone`, index_type);
  }

  deleteIndex(index_type) {
    return this.http.post(`${environment.backend_uri}/indices/indices.types/delete/${index_type._id}`, index_type);
  }

  updateIndex(index_type) {
    return this.http.post(`${environment.backend_uri}/indices/indices.types/update/${index_type._id}`, index_type);
  }

}
