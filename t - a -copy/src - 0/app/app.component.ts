import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalComponent } from './utils/modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  /* constructor(public dialog: MatDialog) {}

  openDialog(): void {
    let dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      data: { name: this.title, animal: this.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.title = result;
    });
  } */
}
