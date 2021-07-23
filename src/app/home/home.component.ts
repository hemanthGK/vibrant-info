import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ApiService } from '../service/api.service';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserDeleteComponent } from '../user-delete/user-delete.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dataSource;
  displayedColumns = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  userData: any = [];
  totalpages: any;

  constructor(public apiService: ApiService, public dialogConfirm: MatDialog) {

  }
  ngOnInit(): void{
    this.displayedColumns = ['position', 'first_name', 'last_name', 'email', 'actions'];
    this.fetchUsers(1);
  }

  fetchUsers(page): void {
    this.apiService.callGetAPI('https://reqres.in/api/users?page=' + page)
      .subscribe(res => {
        this.userData = [...this.userData, ...res.data, ];
        this.totalpages = res.total_pages;
        const unique = [];
        this.userData.map(x => unique.filter(a => a.id === x.id).length > 0 ? null : unique.push(x));
        this.userData = unique;
        this.dataSource = new MatTableDataSource(this.userData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, (error) => {
        console.log(error);
      });
  }

  searchFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  pageEvents(event: PageEvent): void {
    const currentPage = +event.pageIndex + 1;
    this.fetchUsers(currentPage);
  }

  editUsers(index?: any): void {
    const userData = this.userData[index];
    const dialogRef = this.dialogConfirm.open(UserFormComponent, {
      disableClose: true,
      data: userData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        const foundIndex = this.userData.findIndex(x => x.id === dialogResult.id);
        if (foundIndex >= 0){
          this.userData.splice(foundIndex, 1, dialogResult)
        }else{
          this.userData.push(dialogResult);
        }
        this.dataSource = new MatTableDataSource(this.userData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  deleteUser(index: any): void {
    const userData = this.userData[index];
    const dialogRef = this.dialogConfirm.open(UserDeleteComponent, { disableClose: true, data: userData });
    dialogRef.afterClosed().subscribe(dialogResult => {
      const filteredPeople = this.userData.filter((item) => item.id !== dialogResult.id);
      this.dataSource = new MatTableDataSource(filteredPeople);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
