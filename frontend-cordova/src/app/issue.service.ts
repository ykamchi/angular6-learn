import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { File } from '@ionic-native/file';


@Injectable({
  providedIn: 'root'
})
export class IssueService {
  
  uri = 'http://localhost:4000';

  constructor(private http: HttpClient, private file: File) { }

  getIssues() {
    console.log("getIssues was called");
    this.file.checkDir(this.file.dataDirectory, 'mydir').then(_ => console.log('Directory exists')).catch(err => console.log('Directory doesn\'t exist'));
    
    return this.http.get(`${this.uri}/issues`);
  }

  getIssueById(id) {
    return this.http.get(`${this.uri}/issues/${id}`);
  }

  addIssue(title, responsible, description, severity) {
    const issue = {
      title: title, 
      responsible: responsible,
      description: description, 
      severity: severity
    }
    return this.http.post(`${this.uri}/issues/add`, issue);
  }

  updateIssue(id, title, responsible, description, severity, status) {
    
    const issue = {
      title: title, 
      responsible: responsible,
      description: description, 
      severity: severity,
      status: status
    }
    console.log('before post: ' + issue.responsible);
    return this.http.post(`${this.uri}/issues/update/${id}`, issue);
  }

  deleteIssue(id) {
    return this.http.get(`${this.uri}/issues/delete/${id}`);
  }

}
