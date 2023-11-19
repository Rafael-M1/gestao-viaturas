import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { BotaoComponenteComponent } from '../botao-componente/botao-componente.component';
import { Viatura } from '../model/viatura';
import { ViaturaService } from '../services/viaturas.service';
import { MatTableModule } from '@angular/material/table';
import { NumeroCustomizadoPipe } from '../pipes/numero-customizado.pipe';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-viaturas-page',
  templateUrl: './viaturas-page.component.html',
  styleUrls: ['./viaturas-page.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    RouterModule,
    CommonModule,
    BotaoComponenteComponent,
    MatTableModule,
    NumeroCustomizadoPipe,
  ],
})
export class ViaturasPageComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  viaturas?: Viatura[];
  displayedColumns: string[] = ['placa', 'ano', 'marca', 'modelo', 'acoes'];
  option: boolean = false;

  constructor(
    private router: Router,
    private viaturaService: ViaturaService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.viaturaService
      .getViaturasFetch()
      .then((response: Viatura[]) => (this.viaturas = response))
      .catch((error) => {
        console.error('Erro ao buscar dados das Viaturas:', error);
        this.openSnackBar('Erro ao buscar dados das Viaturas.');
      });
  }

  onClickAdicionar() {
    this.router.navigate(['/viaturas', 'form']);
  }

  onClickExcluir(id: number) {
    this.openDialog(id);
  }

  onClickEditar(viatura: Viatura): void {
    this.router.navigate(['/viaturas', 'form', viatura.id]);
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { option: this.option },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.option = result;
      if (this.option == true) {
        this.excluirViatura(id);
      }
    });
  }

  excluirViatura(id: number): void {
    this.viaturaService
      .deleteViaturaFetch(id)
      .then(() => {
        this.openSnackBar('Viatura excluída com sucesso!');
        this.viaturas = this.viaturas?.filter((viatura) => viatura.id !== id);
      })
      .catch((error) => {
        console.error('Erro ao excluir viatura:', error);
        this.openSnackBar('Erro ao excluir viatura.');
      });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 4000,
    });
  }
}
