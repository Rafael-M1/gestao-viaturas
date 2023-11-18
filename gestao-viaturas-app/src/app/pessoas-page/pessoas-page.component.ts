import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { BotaoComponenteComponent } from '../botao-componente/botao-componente.component';
import { Pessoa } from '../model/pessoa';
import { PessoaService } from '../services/pessoas.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pessoas-page',
  templateUrl: './pessoas-page.component.html',
  styleUrls: ['./pessoas-page.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    RouterModule,
    CommonModule,
    BotaoComponenteComponent,
  ],
})
export class PessoasPageComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  pessoas?: Pessoa[];
  option: boolean = false;

  constructor(
    private router: Router,
    private pessoaService: PessoaService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {}

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {option: this.option},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.option = result;
      if (this.option == true) {
        this.excluirPessoa(id);
      }
    });
  }

  ngOnInit(): void {
    this.pessoaService.getPessoas().subscribe((response: Pessoa[]) => {
      this.pessoas = response;
    });
  }

  onClickAdicionar() {
    this.router.navigate(['/pessoas', 'form']);
  }

  onClickExcluir(id: number) {
    this.openDialog(id);
  }

  excluirPessoa(id: number): void {
    this.pessoaService.deletePessoa(id).subscribe(
      () => {
        this.openSnackBar('Pessoa excluída com sucesso!');
        this.pessoas = this.pessoas?.filter(pessoa => pessoa.id !== id);
      },
      (error) => {
        console.error('Erro ao excluir pessoa:', error);
        this.openSnackBar('Erro ao excluir pessoa.');
      }
    );
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 4000,
    });
  }
}
