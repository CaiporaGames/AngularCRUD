import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudHttpService {

  url:string = "http://localhost:3000/todos";
  headers : HttpHeaders = new HttpHeaders().set('content-type', 'application/json')

  constructor(private http: HttpClient) { }

create(data:any): Observable<any>
{
  console.log(data)
  return this.http.post(this.url, data).pipe(map(ev => {
    console.log(ev)
    return ev
  })).pipe(catchError(this.handleError))
}

list()
{
  return this.http.get(this.url)
}

async update(id:any, data:any): Promise<any>
{
  await firstValueFrom(this.delete(id))
  await firstValueFrom(this.create(data))
  return this.list();
}

delete(id:any):Observable<any>
{
  console.log(id)
  return this.http.delete(`${this.url}/${id}`).pipe(
    catchError(this.handleError)
  )
}

handleError(error:HttpErrorResponse)
{
  if(error.error instanceof ErrorEvent)
  {
    console.error('An error occurred', error.error.message)
  }
  else
  {
    console.error(`Backend returned ${error.status}, body was: ${error.error}`)
  }
  return throwError('Something bad happened; Please try again later')
}

}
