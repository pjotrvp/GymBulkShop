import { Inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Entity } from './entity.model';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

const httpOptions = {
  observe: 'body',
  responseType: 'json',
};
export class EntityService<T extends Entity> {
  constructor(
    @Inject(String) protected url: string,
    @Inject(HttpClient) protected http: HttpClient,
    @Inject(String) protected endpoint: string
  ) {}

  public list(options?: any): Observable<T[] | null> {
    const endpoint = `${this.url}/api/${this.endpoint}`;
    console.log(`list ${this.endpoint}`);
    return this.http.get<T[]>(endpoint, { ...options, ...httpOptions }).pipe(
      tap(console.log),
      //map((response) => response.body),
      catchError(this.handleError)
    );
  }

  public create(item: T, options?: any): Observable<T> {
    const endpoint = `${this.url}/api/${this.endpoint}`;
    console.log(`create ${endpoint}`);
    return this.http
      .post<T>(endpoint, item, { ...options, ...httpOptions })
      .pipe(
        tap(console.log),
        // map((response: any) => response.result),
        catchError(this.handleError)
      );
  }

  public read(id: number | string, options?: any): Observable<T> {
    const endpoint = `${this.url}/api/${this.endpoint}/${id}`;
    console.log(`read ${endpoint}`);
    return this.http
      .get<T[]>(endpoint, { ...options, ...httpOptions })
      .pipe(tap(console.log), catchError(this.handleError));
  }

  public update(item: T, options?: any): Observable<T> {
    const endpoint = `${this.url}/api/${this.endpoint}/${item._id}`;
    console.log(`update ${endpoint}`);
    console.log(item);
    return this.http.put(endpoint, item, { ...options, ...httpOptions }).pipe(
      // map((response: any) => response.result),
      catchError(this.handleError)
    );
  }

  public delete(id: string, options?: any): Observable<T> {
    const endpoint = `${this.url}/api/${this.endpoint}/${id}`;
    console.log(`delete ${endpoint}`);
    return this.http.delete(endpoint, { ...options, ...httpOptions }).pipe(
      // map((response: any) => response.result),
      catchError(this.handleError)
    );
  }

  public handleError(error: HttpErrorResponse): Observable<any> {
    console.log(error);

    const errorRespone = {
      type: 'error',
      message: error.error.message || error.message,
    };

    return throwError(() => errorRespone);
  }
}
