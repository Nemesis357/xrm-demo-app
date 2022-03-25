import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { User } from './interfaces/user';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  editing: { [key: string]: boolean } = { };
  rows = [];
  usersData!: User[];

  constructor( 
    private dataService: DataService,
    public dialog: MatDialog,
    private route: ActivatedRoute ) { }

  ngOnInit(): void {
    let userId      : number = JSON.parse(this.route.snapshot.paramMap.get('userId') || '{}'),
        userIdRandom: number = JSON.parse(this.route.snapshot.paramMap.get('randomUserId') || '{}');
    if ( userId !== undefined && typeof userId === 'number' ) {
      this.openDialog(userId);

      this.openDialog(userIdRandom);
    }

    this.dataService.getUsers().subscribe(result => {
      this.usersData = result;
    })
  }

  updateValue(event: Event, cell: string, rowId: number): void {
    this.editing[rowId + '-' + cell] = false;

    let activeRow = this.usersData.filter(row => row.id === rowId)[0];
    if ( activeRow ) {
      activeRow['name'] = (event.target as HTMLInputElement).value;
    }
  }

  showData(): void {
    console.log('%c *** DATA ***', 'color:orange', this.usersData);
  }

  openDialog(rowId: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '750px',
      data: {
        userId: rowId
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed', result);
    });
  }
}
