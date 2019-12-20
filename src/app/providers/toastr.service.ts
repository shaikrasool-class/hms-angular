import { Injectable } from "@angular/core";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrProvider {
  constructor(private toastr: ToastrService) { }
  successmsg(message: string) {
    this.toastr.success(message, 'Success')
  }
  errorsmsg(message: string) {
    this.toastr.error(message, 'Error')

  }
  infotoastr(message: string) {
    this.toastr.info(message, 'Information');
  }
  toastrwaring(message: string) {
    this.toastr.warning(message, 'Warning');
  }

}