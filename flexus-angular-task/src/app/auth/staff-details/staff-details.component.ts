import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-staff-details',
  standalone: true,
  imports: [CommonModule, NgbModule, FormsModule,NgxPaginationModule],
  providers: [DatePipe],
  templateUrl: './staff-details.component.html',
  styleUrl: './staff-details.component.scss'
})
export class StaffDetailsComponent {

  closeResult: any;
  submitted: Boolean = false;
  staff_details: any = [];
  staffObj: any = {
    dob : '',
    gender : ''
  }
  actionType : any;
  paginateObj = {
    page : 25
  }
  p:number = 1

  constructor(private apiService: ApiService,private toastr: ToastrService,private router : Router,private datePipe: DatePipe) { 
  }

  ngOnInit(){
    this.staffObj.dob = this.formatDateToYYYYMMDD(this.staffObj.dob);
    this.getStaffdetails();
    this.getAction('edit')
  }

  formatDateToYYYYMMDD(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0'); 
    return `${year}-${month}-${day}`; 
  }


  getAction(actionType : any){
    if(actionType == 'add'){
      this.actionType = 'add'
    }
    else {
      this.actionType = 'edit'
    }
  }

  getStaffdetails() {
    this.apiService.postRequest('api/auth/get_staff_details',{page : this.p, limit : this.paginateObj.page }).subscribe((resp: any) => {
      this.staff_details = resp.data
    })
  }

  getsingleStaffData(id:any){
    this.apiService.postRequest('api/auth/get_staff_detailsbyId',{id : id}).subscribe((resp: any) => {
      this.staffObj = resp.data;
      this.staffObj.dob = this.formatDateToYYYYMMDD(this.staffObj.dob);
    })
  }

  submitStaffdetails(staffform: any) {
    if (staffform.valid) {
      if(this.actionType == 'add'){
        this.apiService.postRequest('api/auth/add_staff_details', this.staffObj).subscribe((resp: any) => {
          if (resp) {
            staffform.reset()
            this.toastr.success(resp.message)
            setTimeout(()=>{
              window.location.reload()
            },1000)
          }
        })
      }
      else {
        this.staffObj.id = this.staffObj._id
        this.apiService.postRequest('api/auth/edit_staff_details', this.staffObj).subscribe((resp: any) => {
          if (resp) {
            staffform.reset()
            this.toastr.success(resp.message)
            setTimeout(()=>{
              window.location.reload()
            },1000)
          }
        })
      }
     
    }
    else {
      this.toastr.error('fill all the required fields')
    }
  }

  deleteStaffDetails(id:any){
    this.apiService.postRequest('api/auth/delete_staff_details',{id : id}).subscribe((resp: any) => {
      if(resp){
        this.toastr.success(resp.message)
        this.getStaffdetails()
      }
      else {
        this.toastr.error(resp.message)
      }
    })
  }

  logout(){
    this.router.navigate(['auth/login'])
    localStorage.removeItem('authToken')
  }
}



