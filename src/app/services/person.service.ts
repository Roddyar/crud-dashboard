import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {PersonModel} from "../models/PersonModel";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  baseUrl = environment.services.baseUrl;
  person = environment.services.person.persons;
  id = environment.services.person.id;

  constructor(private http: HttpClient) {
  }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // GET
  GetPersons(): Observable<PersonModel[]> {
    return this.http.get<PersonModel[]>(this.baseUrl + this.person);
  }

  // GET
  GetPerson(id): Observable<PersonModel> {
    return this.http.get<PersonModel>(this.baseUrl + this.person + this.id.replace('#id', id));
  }

  // POST
  CreatePerson(data): Observable<PersonModel> {
    return this.http.post<PersonModel>(this.baseUrl + this.person, JSON.stringify(data), this.httpOptions);
  }

  // PUT
  UpdatePerson(data): Observable<PersonModel> {
    return this.http.put<PersonModel>(this.baseUrl + this.person, JSON.stringify(data), this.httpOptions);
  }

  // DELETE
  DeletePerson(id){
    return this.http.delete<PersonModel>(this.baseUrl + this.person + this.id.replace('#id', id), this.httpOptions);
  }

}
