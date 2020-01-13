import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime } from 'rxjs/operators';
import { Student } from './student';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class StudentsService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // private localhost = "http://127.0.0.1:5000/"
  private herokuServer = "https://hogwarts-crm.herokuapp.com/"

  constructor(private http: HttpClient, private router: Router) { }

  getStudents(): Observable<Student[]> {

    // return this.studentList;
    return this.http.get<Student[]>(this.herokuServer).pipe(
      catchError(this.handleError<string[]>('getStudents', []))
    );
  }

  updateStudent(ID: number, student: Student): void {
    //Send to server updated student by ID
    let toSend: object = { ID, student }
    let resp = this.http.post<object>(this.herokuServer + 'update', toSend).pipe(
      catchError(this.handleError<string[]>('getStudents', []))
    );
    resp.subscribe((resp) => {
    })
  }

  deleteStudent(ID: number, student: Student): void {
    //Send to server updated student by ID
    let toSend: object = { ID, student }
    let resp = this.http.post<object>(this.herokuServer + 'delete', toSend).pipe(
      catchError(this.handleError<string[]>('getStudents', []))
    );
    resp.subscribe((resp) => {
      this.router.navigate([''])
    })
  }

  addStudent(student: object): void {
    let resp: Observable<object> = this.http.post<object>(this.herokuServer + 'add', student).pipe(
      catchError(this.handleError<string[]>('getStudents', []))
    );
    resp.subscribe((resp) => {
    })

  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
