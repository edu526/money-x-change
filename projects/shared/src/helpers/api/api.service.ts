// tslint:disable
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

export class AppError {
  public status = 0;
  constructor(originalError?: any, public message?: any) { }
}

export class NotFoundError extends AppError {
  constructor(public originalError?: any) {
    super(originalError);
    this.status = 404;
  }
}

export class ConflictError extends AppError {
  constructor(public originalError?: any) {
    super(originalError);
    this.status = 409;
  }
}

export class InternalServerError extends AppError {
  constructor(public originalError?: any) {
    super(originalError);
    this.status = 500;
  }
}

export class BusinessError extends AppError {
  constructor(public originalError?: any, public message?: any) {
    super(originalError, message);
    this.status = 406;
  }

  get errors(): any {
    if (this.originalError) {
      return this.originalError;
    }

    return null;
  }
}

export class BadRequestError extends AppError {
  constructor(public originalError?: any) {
    super(originalError);
    this.status = 400;
  }

  get errors(): Array<string> {
    if (this.originalError) {
      return this.originalError;
    }

    return null;
  }
}

export class OptionsRequest {
  headers?: HttpHeaders | {
    [header: string]: string | Array<string>;
  };
  observe?: 'body';
  params?: {};
  responseType?: 'json';
  preloader?: boolean;
  withCredentials?: boolean;
  retry?: number;
  reportProgress?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId
  ) {

  }

  get<T>(endPoint: string, options?: OptionsRequest): T {
    options = options || {};

    this.beforeRequest(options.preloader || false);
    const request = this.getUrlAndParameters(endPoint, options);
    const pipes = this.getPipesDefault(options);
    const observable = this.httpClient.get<T>(request.url, request.options);

    return this.formatObservablePipe(observable, pipes) as any;
  }

  post<T>(endPoint: string, body: any, options?: OptionsRequest): T {
    options = options || {};

    this.beforeRequest(options.preloader || false);

    const request = this.getUrlAndParameters(endPoint, options);
    const pipes = this.getPipesDefault(options);
    const observable = this.httpClient.post<T>(request.url, body, request.options);

    return this.formatObservablePipe(observable, pipes) as any;
  }

  put<T>(endPoint: string, body: any, options?: OptionsRequest): any {
    options = options || {};
    this.beforeRequest(options.preloader || false);

    const request = this.getUrlAndParameters(endPoint, options);
    const pipes = this.getPipesDefault(options);
    const observable = this.httpClient.put<T>(request.url, body, request.options);

    return this.formatObservablePipe(observable, pipes);
  }

  del<T>(endPoint: string, options?: OptionsRequest): T {
    options = options || {};
    this.beforeRequest(options.preloader || false);

    const request = this.getUrlAndParameters(endPoint, options);
    const pipes = this.getPipesDefault(options);
    const observable = this.httpClient.delete<T>(request.url, request.options);

    return this.formatObservablePipe(observable, pipes) as any;
  }

  postProgress<T>(endPoint: string, body: any, options?: OptionsRequest): T {
    options = options || {};

    this.beforeRequest(options.preloader || false);

    const request = this.getUrlAndParameters(endPoint, options);
    const pipes = this.getPipesDefault(options);
    const req = new HttpRequest('POST', request.url, body, options as any);
    const observable = this.httpClient.request<T>(req);

    return this.formatObservablePipe(observable, pipes) as any;
  }

  private formatObservablePipe(observable: Observable<any>, pipes): Observable<any> {
    return observable.pipe(tap(), tap(), tap(), tap(), tap(), tap(), tap(), tap(), tap(), ...pipes);
  }

  private getPipesDefault(options?): Array<any> {
    const pipes = [];

    if (isPlatformBrowser(this.platformId)) {
      pipes.push(catchError((err: any) => this.onCatch(err)));
      pipes.push(finalize(() => this.onFinally(options.preloader)));
    }

    return pipes;
  }

  /**
   * Control de Error
   */
  private onCatch(error: any): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      // const messageError = `An error occurred: ${error.error.message}`;
      return throwError(error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      return this.handleError(error);
    }
  }
  /**
   * Antes de una solicitud
   */
  private beforeRequest(preloader: boolean): void {
    if (preloader) { }
  }
  /**
   * Despues de una solicitud
   */
  private afterRequest(preloader: boolean): void {
    if (preloader) { }
  }

  /**
   * Finalización de una solicitud
   */
  private onFinally(preloader: boolean = false): void {
    // this.notifyService.consoleLog('onFinally-Log');
    this.afterRequest(preloader);
  }

  private handleError(error: HttpErrorResponse): any {
    switch (error.status) {
      case 400:
        return throwError(new BadRequestError(error));
      case 404:
        return throwError(new NotFoundError(error.error));
      case 409:
        return throwError(new ConflictError(error));
      case 406:
        return throwError(new BusinessError(error, error.error.message));
      case 500:
        return throwError(new InternalServerError(error));
      default:
        return throwError(new AppError(error));
    }
  }

  private isParameterInPath(endPoint: string, parameterKey: string): boolean {
    return !(endPoint.indexOf(`{${parameterKey}}`) === -1);
  }

  private getUrlAndParameters(url: string, optionsRequest: OptionsRequest): { url: string; options: OptionsRequest } {
    const options: OptionsRequest = new OptionsRequest();
    let paramsQuery = new HttpParams();

    if (optionsRequest.params) {
      Object.keys(optionsRequest.params)
        .forEach((parameterKey: string) => {
          if (this.isParameterInPath(url, parameterKey)) {
            url = url.replace(`{${parameterKey}}`, optionsRequest.params[parameterKey]);
          } else {
            paramsQuery = paramsQuery.append(parameterKey, optionsRequest.params[parameterKey]);
          }
        });
    }

    options.params = paramsQuery;

    return {
      url,
      options
    };
  }

}
