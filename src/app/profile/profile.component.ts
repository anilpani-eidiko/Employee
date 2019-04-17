import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private empId;
  private emplData:any;
  constructor(private route:ActivatedRoute,private empService:EmployeeService) {

    
    
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.empId=params.empId
      this.getEmployeeDetails(this.empId);
    
  }
    )  

  }


  getEmployeeDetails(id:number)
  {
    this.empService.getEmployeeDetails(id).subscribe(
      
     data=>{ console.log(data)
     this.emplData=data;
      }
    )
  }
}
