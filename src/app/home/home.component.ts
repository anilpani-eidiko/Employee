import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 test="some data";
 public employees=[]; 
 public dipEmp=[];
 totalData=[]
 page=1;
 pagesize=5
 searchForm:FormGroup;
 searchResult:any
 imgSrc="assets/img_avatar.png";

 @Input() emplData:any;
 
 constructor(private empl:EmployeeService,private formBuilder:FormBuilder) {
   this.searchForm=this.formBuilder.group({
     search:['',Validators.required]

   })   
   

    
  }

  ngOnInit() {
    this.fetchEmployees()
   //this.getEmployee();
   this.totalData=this.employees
   this.searchEmployee();
    
  }
  fetchEmployees()
  {
    console.log("ok coming");
    this.empl.getEmployeesFromRest()
    .subscribe(data =>{
    console.log(data)
      this.employees=data
      this.totalData=data
      for (let i=0; i < 12; i++) {
        this.pagesize=this.pagesize+1;
        this.dipEmp[i]=this.employees[i]
      
      }
      console.log(this.dipEmp);
    }
    
    )  
    
  }


  getEmployee()
  {
    return this.dipEmp= this.empl.getEmployees();
  }
  loadPage(page:number)
  {
    this.page=page
    this.pagesize=5;
   
    
      
      
      this.pagesize=this.page*12-12
    
    
    console.log(this.page)
    console.log("pageSize :"+this.pagesize);
    
    for (let i=0; i <12 ; i++) {

      this.pagesize=this.pagesize+1
      this.dipEmp[i]=this.employees[this.pagesize-1]
    }
    
    
  }



  testData(data)
  {
    console.log("some thing"+JSON.stringify(data));
    this.emplData=data;

  }
  searchEmployee()
  {
    console.log("OK comingasddd");
    console.log(this.totalData);
    
    this.searchForm.controls.search.valueChanges.subscribe(searchResult => 
      {
      
      if(searchResult=="" || searchResult==null)
      {
        console.log("search Result is "+searchResult)
        this.dipEmp=this.totalData

       
      }
      else
      {

      this.dipEmp=this.totalData.filter(x=>(x.employeeName.toLowerCase().includes(searchResult.toLowerCase()))||x.employeeId==searchResult)
      console.log(this.totalData)
      }
    }
    )

  }


  readURL(input)
  {
    var data;
    
    console.log(input.target.previousSibling);
    
    if (input.target.files && input.target.files[0]) {
      
      var reader = new FileReader();
      data=reader;
      reader.onload = function (e) {
        console.log(e.target)  ;
        data=e.target;
        console.log(data.result);
        input.target.previousSibling.src=data.result;
        
      };
      reader.readAsDataURL(input.target.files[0]);

     
    }
    
    
    console.log(this.imgSrc)
  }
}
