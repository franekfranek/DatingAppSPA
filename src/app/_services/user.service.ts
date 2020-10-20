import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../_models/user';
import { Observable } from 'rxjs';
import { PaginationResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

//const httpOptions = {
//  headers: new HttpHeaders({
//    'Authorization': 'Bearer ' + localStorage.getItem('token')
//  })
//}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  getUsers(page?, itemsPerPage?, userParams?): Observable<PaginationResult<User[]>> {
    const paginatedResult: PaginationResult<User[]> = new PaginationResult<User[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams != null) {
      params = params.append("minAge", userParams.minAge);
      params = params.append("maxAge", userParams.maxAge);
      params = params.append("gender", userParams.gender);
      params = params.append("orderBy", userParams.orderBy);
    }

    return this.http.get<User[]>(this.baseUrl + "users", { observe: "response", params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get("Pagination") != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get("Pagination"))
          }
          return paginatedResult;
        })
      );

    //return this.http.get<User[]>(this.baseUrl + 'users');//returns observable no access to headers
    // to get access to headeers overload with observe:respond must be chosen
    //get needs return type here as well because of return observable
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }

  setTheMainPhoto(userId: number, id: number) {
    return this.http.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {});// it is post so it has have body
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.baseUrl+ "users/" + userId + "/photos/" + id)
  }
}
