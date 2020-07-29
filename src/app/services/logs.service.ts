import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from "rxjs";
import {LogsModel} from "../models/LogsModel";
import {ProcessModel} from "../models/ProcessModel";

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  baseUrl = environment.services.baseUrl;
  logs = environment.services.log.logs;
  type = environment.services.log.type;
  count = environment.services.log.count;
  mont = environment.services.log.mont;
  proc = environment.services.log.proc;

  constructor(private http: HttpClient) {
  }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  }

  // GET
  GetLogs(): Observable<LogsModel[]> {
    return this.http.get<LogsModel[]>(this.baseUrl + this.logs, this.httpOptions);
  }

  // GET
  GetLogsByType(type): Observable<LogsModel> {
    return this.http.get<LogsModel>(this.baseUrl + this.logs + this.type.replace('#type', type), this.httpOptions);
  }

  // GET
  GetCountByType(type): Observable<number> {
    return this.http.get<number>(this.baseUrl + this.logs + this.count.replace('#type', type), this.httpOptions);
  }

  // GET
  GetMonths(): Observable<number[]> {
    return this.http.get<number[]>(this.baseUrl + this.logs + this.mont, this.httpOptions);
  }

  // GET
  GetAllProcess(type): Observable<ProcessModel[]> {
    return this.http.get<ProcessModel[]>(this.baseUrl + this.logs + this.proc.replace('#type', type), this.httpOptions);
  }

}
