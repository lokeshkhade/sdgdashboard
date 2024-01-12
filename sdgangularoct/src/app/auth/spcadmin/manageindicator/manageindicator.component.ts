import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { HttpParams } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manageindicator',
  templateUrl: './manageindicator.component.html',
  styleUrls: ['./manageindicator.component.scss']
})

export class ManageindicatorComponent implements OnInit {

  public manageindicator: FormGroup; //add  FormGroup 
  public allindicators: any = [];
  public delete_flag: any;
  public data: any = [];

  displayedColumns: string[] = ['sn', 'goal_id', 'district_indicator_desc', 'delete_flag', 'action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fb: FormBuilder, private ds: DataService) {
    this.manageindicator = this.fb.group({ //definition to cons
      indicator_master_id: ['', Validators.required],
      delete_flag: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.getallindicators();
  }

  getallindicators() {
    let index = 0;
    this.ds.getData('common/getalldifindicators').subscribe((res: any) => {
      this.allindicators = res; this.allindicators.forEach(e => {
        this.allindicators[index].sn = index + 1;
        index++;
      });
      this.dataSource = new MatTableDataSource(this.allindicators);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  slideChange(indicator_master_id: any, delete_flag : any) 
  { 
    if (delete_flag == 'Y')
    {
      this.manageindicator.patchValue
        ({
          delete_flag: 'N',
          indicator_master_id: indicator_master_id
        }); 
    }

    if (delete_flag == 'N') 
    {
      this.manageindicator.patchValue
        ({
          delete_flag: 'Y',
          indicator_master_id: indicator_master_id
        }); 
    }    
    
    this.ds.updateData('crud/updateIndicatorflag', this.manageindicator.value).subscribe(res => {
      this.data = res;  
      if (this.data) {
        Swal.fire({
          icon: "success",
          text: 'Indicator Updated successfully',
          timer: 2000
        });
      }
      else
      {
        Swal.fire({
          icon: "error",
          text: 'Error, Please check....',
          timer: 2000
        });
      }
      this.getallindicators();
    });


    
  }


  


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
