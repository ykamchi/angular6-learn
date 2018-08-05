import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { IndicesService } from '../../services/indices.service';
import { SpeechService } from 'ngx-speech';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  private nbCols: number = 2;
  indices : any[];
  msg: string;
  context: string;
  started = false;
  
  constructor(private router: Router /*,public speech: SpeechService, */, private indicesService : IndicesService) { }

  ngOnInit() {
    
    this.indicesService.getIndicesTypes().subscribe((data: any[]) => {
      this.indices = data;
      
    });
    /*
    //this.speech.start();
    this.speech.message.subscribe(msg => {
        this.msg = msg.message;
        console.log('got msg: ' + this.msg);
    });
    this.speech.context.subscribe(context => {
      this.context = context;
      console.log('got context: ' + this.context);
    });
    this.speech.started.subscribe(started => this.started = started);
    */
  }
  /*order() {
        console.log('context: ' + this.context + " - msg: " + this.msg);
    }
    toggleVoiceRecognition() {
      if (this.started) {
          this.speech.stop();
      } else {
          this.speech.start();
      }
  }*/
  addIndex(index_type) {
    let navigationExtras: NavigationExtras = { queryParams: index_type };
    this.router.navigate(["indices/add"], navigationExtras);  
  }
}
