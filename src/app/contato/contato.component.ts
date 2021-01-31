import { ContatoDetalheComponent } from './../contato-detalhe/contato-detalhe.component';
import { ContatoService } from './../contato.service';
import { Component, OnInit, NgModule } from '@angular/core';
import { Contato } from './contato';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario!: FormGroup;
  contatos: Contato[] = [];
  displayedColumns: string[] = ['foto', 'id', 'nome', 'email', 'favorito'];
  totalElementos: number = 0;
  pagina: number = 0;
  tamanho: number = 5;
  pageSizeOptions: number[] = [5,10,15];

  success: boolean = true;
  errors: String[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private contatoService: ContatoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { 
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    })

    this.read(this.pagina, this.tamanho);
  }

  create(): void {
    const formValues = this.formulario.value;

    const contato: Contato = new Contato(formValues.nome, formValues.email);

    this.contatoService.create(contato).subscribe(
      response => {
        // let lista: Contato[] = [...this.contatos, response];
        // this.contatos = lista;
        this.read(this.pagina, this.tamanho);
        this.snackBar.open("Contato adicionado!", 'Sucesso!', {duration: 1500});
        this.formulario.reset();
      }
    );
  }

  read(pagina: number, tamanho: number): void {
    this.contatoService.read(pagina, tamanho).subscribe(response => {
      this.contatos = response.content
      this.totalElementos = response.totalElements;
      this.pagina = response.number;
    });
  }

  favoritar(contato: Contato): void {
    this.contatoService.favorite(contato).subscribe(response => {
      contato.favorito = !contato.favorito;
    });
  }

  uploadFoto(event: any, contato: any): void {
    if (event != null && event.target != null && event.target != null) {
      const files = event.target.files;
      if (files) {
        const foto = files[0];
        const formData: FormData = new FormData();
        formData.append("foto", foto);
        this.contatoService.upload(contato, formData)
          .subscribe(response => this.read(this.pagina, this.tamanho));
      }
    }
  }

  visualizarContato(contato: Contato): void {
    this.dialog.open( ContatoDetalheComponent, {
      width: '400px',
      height: '450px',
      data: contato
    });
  }

  paginar(event: PageEvent): void {
    this.pagina = event.pageIndex;
    this.read(this.pagina, this.tamanho);
  }

}
