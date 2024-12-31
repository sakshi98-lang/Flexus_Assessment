import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token : any

  apiUrl = 'http://localhost:4000/'

  constructor(private http : HttpClient){
    this.token =  JSON.parse(localStorage.getItem('authToken')!)
  }

  ngOnInit(){
   
  }


  getRequest(url :any){
      return this.http.get(this.apiUrl + url)
  }

  postRequest(url : any,data:any){
    const headers = { 'Content-Type': 'application/json',
      Authorization : 'Bearer' + " " + this.token
     };

     return this.http.post(this.apiUrl + url,data,{headers : headers})
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token; 
}
}
