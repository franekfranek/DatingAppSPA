import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../_models/user';
import { Observable } from 'rxjs';
import { PaginationResult } from '../_models/pagination';
import { map } from 'rxjs/operators';
import { Message } from '../_models/message';


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


  getUsers(page?, itemsPerPage?, userParams?, likesParams?): Observable<PaginationResult<User[]>> {
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

    if (likesParams === "Likers") {
      params = params.append("likers", "true");
    }

    if (likesParams === "Likees") {
      params = params.append("likees", "true");
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
    return this.http.delete(this.baseUrl + "users/" + userId + "/photos/" + id);
  }

  sendLike(id: number, recipientId: number) {
    return this.http.post(this.baseUrl + "users/" + id + "/like/" + recipientId, {});
  }

  getMessages(id: number, page?, itemsPerPage?, messageContainer?) {
    const paginationResult: PaginationResult<Message[]> = new PaginationResult<Message[]>();

    let params = new HttpParams();

    params = params.append("MessageContainer", messageContainer);

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    // returing Message array because of the errror: type Object is not assignnable to type "Message[]"
    // basically we need to specify what we returning
    // finally function returning Observable PaginationResult of type Message[]

    // we need to observe full response so we can get access to Pagination header which we returing from the API
    return this.http.get<Message[]>(this.baseUrl + "users/" + id + "/messages", { observe: "response", params })
      .pipe(
        map(response => {
          paginationResult.result = response.body;
          if (response.headers.get("Pagination") !== null) {
            paginationResult.pagination = JSON.parse(response.headers.get("Pagination"));
          }

          return paginationResult;
        })

      )
  }

  getMessageThread(id: number, recipientId: number) {
    return this.http.get<Message[]>(this.baseUrl + "users/" + id + "/messages/thread/" + recipientId);
  }

  // send post request with message in the body
  sendMessage(id: number, message: Message) {
    return this.http.post(this.baseUrl + "users/" + id + "/messages", message);
  }

  deleteMessage(id: number, userId: number) {
    return this.http.post(this.baseUrl + "users/" + userId + "/messages/" + id, {});
  }

  markAsRead(userId: number, messageId: number) {
    return this.http.post(this.baseUrl + "users/" + userId + "/messages/" + messageId + "/read", {})
      .subscribe();
  }
}
