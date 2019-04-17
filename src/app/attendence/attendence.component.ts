import { Component, OnInit,ChangeDetectionStrategy,
  ViewChild,
  TemplateRef, 
  Input} from '@angular/core';
  import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours
  } from 'date-fns';

  import { Subject } from 'rxjs';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarView
  } from 'angular-calendar';
import { EmployeeService } from '../employee.service';
import { Attendence } from './Attendence';


  const colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  };



@Component({
  selector: 'app-attendence',
  templateUrl: './attendence.component.html',
  styleUrls: ['./attendence.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AttendenceComponent implements OnInit {
  @Input() empId: number
private attendence:Attendence[];
  constructor(private modal: NgbModal,private empService:EmployeeService) { }
  ngOnInit() {

    console.log("EmpId got :"+this.empId);
    
this.empService.getEmployeeAttendence(this.empId).subscribe(

  data=>{
    console.log(data);
    this.attendence=data;
    let event,color;
for(let i=0;i<this.attendence.length;i++)
{
  if(this.attendence[i].type =='L')
  {
    event="Leave"
    color=colors.yellow
    }
    else{
      event="Absent"
    color=colors.red
    }
  
this.events = [
  ...this.events,
  {
    title: event,
    start: new Date(this.attendence[i].date),
    end: new Date(this.attendence[i].date),
    color: color,
    draggable: false,
    resizable: {
      beforeStart: true,
      afterEnd: true
    }
  }
];
}


  }



)

this.empService.getHolidayList().subscribe(

  data=>
  {
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    var date = "\/Date("+element.hDate+")\/";
    var nowDate = new Date(parseInt(date.substr(6)));
    let formatdate=nowDate.getUTCDay();
    console.log(formatdate)

    this.events = [
      ...this.events,
      {
        title: element.name,
        start: new Date(nowDate),
        end: new Date(nowDate),
        color:colors.blue ,
        draggable: false,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    ];
  }
  }

)
  }

  
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    
  ];

  activeDayIsOpen: boolean = true;
  



  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

 

}






