import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private url=""
  constructor(private client:HttpClient) { }

  getEmployees() 
  
  {
    return [{"employeeId":273,"employeeName":"Anil","type":"full"},
    {"employeeId":235,"employeeName":"Vikash","type":"NP"},
    {"employeeId":244,"employeeName":"Harish","type":"NP"},
    {"employeeId":277,"employeeName":"Rakesh","type":"full"},
    {"employeeId":258,"employeeName":"Ravindra","type":"NP"},
    {"employeeId":273,"employeeName":"Anil","type":"full"},
    {"employeeId":235,"employeeName":"Vikash","type":"NP"},
    {"employeeId":244,"employeeName":"Harish","type":"NP"},
    {"employeeId":277,"employeeName":"Rakesh","type":"full"},
    {"employeeId":258,"employeeName":"Ravindra","type":"NP"}
    
    ]

  }
  getEmployeesFromRest()
  {
    this.url="http://192.168.2.216:9098/api/getEmployees"
    return this.client.get<any>(this.url)

  }


  getEmployeeDetails(id:number)
  {
    this.url="http://192.168.2.216:9098/api/getEmployee/"+id;
    return this.client.get<any>(this.url);
  }

  getEmployeeAttendence(id:number)
  {
    this.url="http://192.168.2.216:9098/api/getEmployee/attendence/"+id;
    return this.client.get<any>(this.url);

  }
  getHolidayList()
  {
    this.url="http://192.168.2.216:9098/api/getHolidayList";
    return this.client.get<any>(this.url);
    
  }
}
