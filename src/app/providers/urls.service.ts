import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class BaseUrlProvider {
  public apiBaseUrl = "http://localhost:8080/";
}