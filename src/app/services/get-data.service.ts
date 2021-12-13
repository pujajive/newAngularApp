import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompanyModel } from '../company-model';


interface MyShareResponse {
  length: number;
}

interface responseStatus {
  status: String;
}

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  baseUrl = "https://springbootmysql.azurewebsites.net/";
  url = "";
  constructor(private http: HttpClient) { }

  getAllCompany(): Observable<any> {
    this.url = this.baseUrl + "companysearch";
    return this.http.get(this.url);
  }

  getAllclient(): Observable<any> {
    this.url = this.baseUrl + "getAllclient";
    return this.http.get(this.url);
  }
  getHistory(email): Observable<any> {
    this.url = this.baseUrl + "history?email=" + email;
    return this.http.get(this.url);
  }

  getAdminHistory():Observable<any>{
    this.url = this.baseUrl+"adminHistory";
    return this.http.get(this.url);
  }

  getPendingOrder(email):Observable<any> {
    this.url = this.baseUrl + "pendingHistory?email=" + email;
    return this.http.get(this.url); 
  }


  getWatchList(email) {
    this.url = this.baseUrl + "watch-list?email=" + email;
    return this.http.get<MyShareResponse>(this.url);
  }

  //fund  request
  

  getOneCompany(id) {
    this.url = this.baseUrl + "get-one?id=" + id;
    return this.http.get(this.url);
  }

  getMyShares(email) {
    console.log(email);
    this.url = this.baseUrl + "my-share/?email=" + email;

    return this.http.get<MyShareResponse>(this.url);
  }

  getUserDeatils(email) {
    this.url = this.baseUrl + "get-user/?email=" + email;
    return this.http.get<MyShareResponse>(this.url);
  }

  addWatchList(email, id) {
    this.url = this.baseUrl + "add-watchlist/?email=" + email + "&id=" + id;
    return this.http.get<responseStatus>(this.url);
  }

  removeWatchList(email, id) {
    this.url = this.baseUrl + "remove-watchlist/?email=" + email + "&id=" + id;
    return this.http.get<responseStatus>(this.url);
  }
//pendingBuyOrder
pendingOrder(email,id,quantity)
{
  console.log("working");
  this.url = this.baseUrl + "pendingBuy";
  return this.http.post<responseStatus>(this.url, { "email":email, "companyId":id, "quantity":quantity} );               
}
//adminApprove Buy
approveOrder(index:number)
{
  this.url = this.baseUrl + "approveBuy";
  return this.http.post<responseStatus>(this.url, { "index":index} );               
}
//admin reject Buy
rejectOrder(index:number){
  this.url = this.baseUrl + "rejectOrder";
  return this.http.post<responseStatus>(this.url, { "index":index} );   
}
//user Pending sell
pendingSell(email,id,quantity)
{
  this.url = this.baseUrl + "pendingSell";
  return this.http.post<responseStatus>(this.url, { "email":email, "companyId":id, "quantity":quantity } );               
}

  buyShare(email, id, quantity) {
    this.url = this.baseUrl + "buy";
    return this.http.post<responseStatus>(this.url, { "email": email, "companyId": id, "quantity": quantity });
  }

  sellShare(email, id, quantity) {
    this.url = this.baseUrl + "sell";
    return this.http.post<responseStatus>(this.url, { "email": email, "companyId": id, "quantity": quantity });
  }

  addCompany(companyModel: CompanyModel): Observable<any> {

    this.url = this.baseUrl + "addCompany";

    return this.http.post(this.url, companyModel);

  }

  deleteCompany(company_id: number): Observable<any> {

    this.url = this.baseUrl + "delete?company_id=" + company_id;

    return this.http.delete(this.url);

  }

  // getRandomNum(max_price,min_price):number{
  //   console.log(max_price);
  //   console.log(min_price);
  //  return Math.floor(Math.random() * max_price + min_price);
  // }

  getCompanyById(company_id: number): Observable<CompanyModel> {
    this.url = this.baseUrl + "getCompanyById?id=" + company_id;
    return this.http.get<CompanyModel>(this.url);
  }

  updateCompany(company_id: number, companyModel: CompanyModel): Observable<object> {
    this.url = this.baseUrl + "updateCompany";
    return this.http.put<CompanyModel>(`${this.url}/${company_id}`, companyModel);


  }
  addfund(email, amount) {
    this.url = this.baseUrl + "add-fund";
    return this.http.post<responseStatus>(this.url, { "email": email, "amount_left": amount });
  }
  withdraw(email, amount) {
    this.url = this.baseUrl + "withdraw";
    return this.http.post<responseStatus>(this.url, { "email": email, "amount_left": amount });
  }

  // fund approval

  getPendingFunds() {
    this.url = this.baseUrl + "admin/pending/fund";
    return this.http.get(this.url);
  }

  getAllRequest(email)
  {
    this.url=this.baseUrl + "user/order/fund?email=" + email;
    return this.http.get(this.url);
  }

  approveFund(sno: number): Observable<any> {
    this.url = this.baseUrl + "admin/approve/fund?sno=" + sno;
    return this.http.get(this.url);
  }

  rejectFund(sno: number): Observable<any> {
    this.url = this.baseUrl + "admin/reject/fund?sno=" + sno;
    return this.http.get(this.url);
  }



}