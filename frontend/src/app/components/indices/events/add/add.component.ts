import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { IndicesService } from '../../../../services/indices.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  model: any = {};
  index_type: any = {};

  constructor(private router: Router, private route: ActivatedRoute, private indicesService: IndicesService) { 
    this.route.queryParams.subscribe((params: any) => {
      this.index_type = params;
    });
    this.model.value = 2;
  }

  get diagnostic() { return JSON.stringify(this.model); }

  addIndex() {
    this.indicesService.addIndexValue(this.model).subscribe(() => {
      this.router.navigate(['main']);
    });
  }

  ngOnInit() {
   
  }
 
}
