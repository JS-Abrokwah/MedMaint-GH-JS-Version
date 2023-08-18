import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MaterialsService {

  constructor(private snackbar:MatSnackBar) { }
// General snackbar opener
// The caller must pass message, action and an array of css classes
  openSnackBar(message:string,action:string,css:string[]){
    this.snackbar.open(message,action,{
      horizontalPosition:'center',
      verticalPosition:'top',
      duration:13000,
      panelClass:css
    })
  } ;
}
