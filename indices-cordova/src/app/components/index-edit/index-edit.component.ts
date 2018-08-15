import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IndicesTypesService } from '../../services/indices-types.service';
import { ConfirmModalComponent } from '../../ui/controls/confirm-modal/confirm-modal.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-index-edit',
  templateUrl: './index-edit.component.html',
  styleUrls: ['./index-edit.component.css']
})
export class IndexEditComponent implements OnInit {
  index_type: {};
  categories: string[];
  sub_categories: string[];
  selected_category: string = '';
  time_to_add: string = "Add";
  constructor(private route: ActivatedRoute
              ,private indicesTypesService : IndicesTypesService
              ,private modalService: NgbModal
              , private location: Location) { 
    
    this.indicesTypesService.getCategories().subscribe((data: string[]) => {
      this.categories = data;
      
    });
    this.indicesTypesService.getSubCategories("All").subscribe((data: string[]) => {
      this.sub_categories = data;
    });

    this.route.queryParams.subscribe((params: any) => {
      if (params.index_type) {
        console.log("edit index");
        this.index_type = JSON.parse(params.index_type);
      } else {
        console.log("new index");
        this.index_type = {
          name: "New Index",
          caption: "New Caption",
          type: "number",
          from: "0",
          to: "10",
          step: "1",
          control: "cubes",
          tracking: "day-parts",
          day_parts: ["08:00", "13:00", "20:00", "23:00"],
          category: "Other",
          'sub-category': "Other",
          hidden: false,
          emoji: "😥",
          user: localStorage.getItem('currentuser')
        }
      }
     
    });
  }

  ngOnInit() {
  }

  goBack(): void {
    this.update_index();
    this.location.back();
  }

  update_index() {
    console.log("update_index");
    this.index_type['day_parts'].sort();
    this.indicesTypesService.updateIndex(this.index_type).subscribe((data: string[]) => {
      this.index_type = data;
      this.time_to_add = "Add";
      //this.getIndices();
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
        this.update_index();
      } 
    });
  }
  day_part_changed(i, val) {
    console.log("day_part_changed: " + val + " " + this.index_type['day_parts'][i]);
  }
  
  add_time() {
    console.log("Add Time");
    this.index_type['day_parts'].push(this.time_to_add);
    this.update_index();
    this.time_to_add = "Add";

  }

  delete_time(i) {
    console.log("Delete Time");
    this.index_type['day_parts'].splice( i, 1 );
    this.update_index();

  }
  
  delete_index() {
    const modalRef = this.modalService.open(ConfirmModalComponent, {ariaLabelledBy: 'modal-basic-title'});
    modalRef.componentInstance.header = 'Delete Index: ' + this.index_type['caption'];
    modalRef.componentInstance.msg = 'Are you sure you want to delete Index: ' + this.index_type['caption'];
    modalRef.result.then((result) => {
      if (result.state === 'OK') {
        this.indicesTypesService.deleteIndex(this.index_type).subscribe((data: string[]) => {
          this.goBack();
        });
      }
    });
    
  }

  clone_index(inde_type) {
    const modalRef = this.modalService.open(ConfirmModalComponent, {ariaLabelledBy: 'modal-basic-title'});
    modalRef.componentInstance.header = 'Clone Index: ' + this.index_type['caption'];
    modalRef.componentInstance.msg = 'Select name for the new Index and press OK';
    modalRef.componentInstance.type = 'INPUT';
    modalRef.componentInstance.val = 'Copy Of - ' + this.index_type['name'];
    modalRef.result.then((result) => {
      if (result.state === 'OK') {
        console.log('Closed with result: OK'); 
        this.index_type['name'] = result.val;
        this.index_type['caption'] = result.val;
        delete this.index_type['_id'];
        this.indicesTypesService.cloneIndex(this.index_type).subscribe((data: string[]) => {
          this.goBack();
        });
      } 
    });
  }
}
