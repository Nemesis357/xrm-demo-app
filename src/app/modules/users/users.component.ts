import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { User } from './interfaces/user';
import { DataService } from './services/data.service';
import { Iframe } from 'src/app/shared/interfaces/iframe';
import { IframeService } from 'src/app/shared/services/iframe.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  editing: { [key: string]: boolean } = { };
  rows = [];
  usersData!: User[];
  hideComponent: boolean = true;

  constructor( 
    private dataService: DataService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private iframeService: IframeService ) { }

  ngOnInit(): void {
    console.log('%c *** ngOnInit -Users- ***', 'color:green', );
    // Normal parameters
    let userId      : number = JSON.parse(this.route.snapshot.paramMap.get('userId') || '{}'),
        userIdRandom: number = JSON.parse(this.route.snapshot.paramMap.get('randomUserId') || '{}');
    if ( userId !== undefined && typeof userId === 'number' ) {
      this.openDialog(userId);
    }
    if ( userIdRandom !== undefined && typeof userIdRandom === 'number' ) {
      this.openDialog(userIdRandom);
    }

    // Query parameters
    // this.route.queryParams.subscribe(params => {
    //   console.log('%c *** params ***', 'color:#bada55', params);
    // })
    // console.log('%c *** MAP ***', 'color:#bada55', this.route.snapshot.paramMap);

    this.dataService.getUsers().subscribe(result => {
      this.usersData = result;
    })

    if ( this.route.snapshot.data.saveComponent ) {
      // this.hideComponent = false;

      let payload : Iframe = {
        id: "usersIframe395484",
        name: "usersIframe",
        src: this.router.url
      }
      this.iframeService.addIframe(payload);
    }
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
