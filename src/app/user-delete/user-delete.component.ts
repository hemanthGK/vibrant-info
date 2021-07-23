import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent {

  constructor(public apiService: ApiService,
              public dialogRef: MatDialogRef<UserDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }


  process(){
    this.apiService.callDeleteAPI('https://reqres.in/api/users/' + this.data.id)
    .subscribe(res => {
      this.dialogRef.close(this.data);
    }, (error) => {
      console.log(error);
    });
  }

  decline(){
    this.dialogRef.close();
  }

}
