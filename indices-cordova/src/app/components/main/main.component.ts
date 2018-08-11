import { Component } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { IndicesTypesService } from '../../services/indices-types.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../../ui/controls/confirm-modal/confirm-modal.component';
import { WindowRefService } from '../../services/Window-ref.service';
//import SpeechToText from 'speech-to-text'
//import { WindowRefService } from '../../services/Window-ref.service';

@Pipe({ name: 'indices_filter' })
export class IndicesFilterPipe implements PipeTransform {   
    transform(indices: any[], show_hidden:boolean, category:string , sub_category:string) {
      console.log('filter called');
      if (!indices) return indices;
      return indices.filter((index) => {
        let ret = false;         
        if ((category == 'All' || category == index.category) &&
            (sub_category == 'All' || sub_category == index['sub-category']) &&
            (show_hidden || !index.hidden)) {
              return index;
            }
      });
    }
} 

@Pipe({ name: 'indices_sort' })
export class IndicesSortPipe implements PipeTransform {
  transform(indices: any[]) {
    console.log('sort called');
    if (!indices) return indices;
    return indices.sort((a,b) => a.caption.localeCompare(b.caption));
  }
} 

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent {
  indices_types: any[];
  categories: string[];
  sub_categories: string[]; 
  selected_category: string = 'All';
  selected_sub_category: string = 'All';
  show_hidden: boolean = false;
  show_head_panel: boolean = false;

  constructor(  private router: Router
                ,private route: ActivatedRoute
                ,private indicesTypesService : IndicesTypesService
                ,private modalService: NgbModal
                ,private winRef: WindowRefService
                
              ) { 
    /*
    if (window.hasOwnProperty('webkitSpeechRecognition')) {
  
      const recognition = new  winRef.nativeWindow['webkitSpeechRecognition'];

      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.lang = "en-US";
      recognition.start();

      recognition.onresult = function(e) {
        console.log(e.results[0][0].transcript);
        recognition.stop();
        
      };

      recognition.onerror = function(e) {
        recognition.stop();
      }
    }
    */
    //this.innerWidth = winRef.nativeWindow.innerWidth;
    //this.innerHeight = winRef.nativeWindow.innerHeight-185;
    console.log("MAIN");
    this.indicesTypesService.getCategories().subscribe((data: string[]) => {
      this.categories = data;
      this.categories.unshift('All');
      this.sub_categories = ['All'];
      this.getIndices();
    });
  }

  onResize(event) {
    //this.innerWidth = event.target.innerWidth;
    //this.innerHeight = event.target.innerHeight-185;
  } 

  toggle_filter() {
    this.show_head_panel = !this.show_head_panel;
  }

  navigate(index_type) {
    let navigationExtras: NavigationExtras = { queryParams: index_type };
    this.router.navigate(["index"], navigationExtras);
  }

  edit_index(index_type) {
    let navigationExtras: NavigationExtras = { queryParams: {index_type: JSON.stringify(index_type)} };
    this.router.navigate(["newindex"], navigationExtras);
  }

  new_index() {
    
    this.router.navigate(["newindex"]);
  }

  category_changed() {
    this.indicesTypesService.getSubCategories(this.selected_category).subscribe((data: string[]) => {
      this.sub_categories = data;
      this.sub_categories.unshift('All');
      this.selected_sub_category = 'All';
    });
    
  }

  getIndices() {
    this.indicesTypesService.getIndices(this.selected_category, this.selected_sub_category).subscribe((data: any[]) => {
      this.indices_types = data;
      console.log('getIndices called');
      
    });
  }

  hide_index(index_type) {
    index_type.hidden = !index_type.hidden;
    this.indicesTypesService.updateIndex(index_type).subscribe((data: string[]) => {
      this.getIndices();
    });

  }

  update_index(index_type) {
    this.indicesTypesService.updateIndex(index_type).subscribe((data: string[]) => {
      this.getIndices();
    }); 
  }
 
  clone_index(index_type) {
    const modalRef = this.modalService.open(ConfirmModalComponent, {ariaLabelledBy: 'modal-basic-title'});
    modalRef.componentInstance.header = 'Clone Index: ' + index_type.caption;
    modalRef.componentInstance.msg = 'Select name for the new Index and press OK';
    modalRef.componentInstance.type = 'INPUT';
    modalRef.componentInstance.val = 'Copy Of - ' + index_type.name;
    modalRef.result.then((result) => {
      if (result.state === 'OK') {
        console.log('Closed with result: OK'); 
        index_type.name = result.val;
        index_type.caption = result.val;
        delete index_type['_id'];
        this.indicesTypesService.cloneIndex(index_type).subscribe((data: string[]) => {
          this.getIndices();
        });
      } 
    });
  }
 
  select_emoji(index_type) {
    const modalRef = this.modalService.open(ConfirmModalComponent, {ariaLabelledBy: 'modal-basic-title'});
    modalRef.componentInstance.header = 'Select Emoji for Index: ' + index_type.caption;
    modalRef.componentInstance.msg = 'Select Emoji from the list and press OK';
    modalRef.componentInstance.type = 'EMOJI';
    modalRef.componentInstance.val = index_type.emoji;
    modalRef.result.then((result) => {
      if (result.state === 'OK') {
        index_type.emoji = result.val;
        this.update_index(index_type);
      } 
    });
  }
    
  delete_index(index_type) {
    const modalRef = this.modalService.open(ConfirmModalComponent, {ariaLabelledBy: 'modal-basic-title'});
    modalRef.componentInstance.header = 'Delete Index: ' + index_type.caption;
    modalRef.componentInstance.msg = 'Are you sure you want to delete Index: ' + index_type.caption;
    modalRef.result.then((result) => {
      if (result.state === 'OK') {
        this.indicesTypesService.deleteIndex(index_type).subscribe((data: string[]) => {
          this.getIndices();
        });
      }
    });
    
  }

}
