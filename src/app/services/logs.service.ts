import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from "rxjs";
import {LogsModel} from "../models/LogsModel";
import {ProcessModel} from "../models/ProcessModel";

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  //baseUrl = environment.services.baseUrl;
  logs = environment.services.log.logs;
  type = environment.services.log.type;
  count = environment.services.log.count;
  mont = environment.services.log.mont;
  proc = environment.services.log.proc;

  constructor(private http: HttpClient) {
  }

  // GET
  GetLogs(): Observable<LogsModel[]> {
    return this.http.get<LogsModel[]>(this.logs);
  }

  // GET
  GetLogsByType(type): Observable<LogsModel> {
    return this.http.get<LogsModel>(this.logs + this.type.replace('#type', type));
  }

  // GET
  GetCountByType(type): Observable<number> {
    return this.http.get<number>(this.logs + this.count.replace('#type', type));
  }

  // GET
  GetMonths(): Observable<number[]> {
    return this.http.get<number[]>(this.logs + this.mont);
  }

  // GET
  GetAllProcess(type): Observable<ProcessModel[]> {
    return this.http.get<ProcessModel[]>(this.logs + this.proc.replace('#type', type));
  }

}
