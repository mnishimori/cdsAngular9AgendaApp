import { ContatoService } from './../contato.service';
import { Component, OnInit } from '@angular/core';
import { Contato } from './contato';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario!: FormGroup;

  success: boolean = true;
  errors: String[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private contatoService: ContatoService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { 
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    })
  }

  create(): void {
    console.log(this.formulario.value);
    const isValid = this.formulario.valid;
    console.log(isValid);
    /*
    if (this.id == 0) {
      this.contatoService.create(this.contato).subscribe(
        response => {
          this.contato = response;
          this.success = true;
          this.errors = [];
        },
        errorResponse => {
          this.success = false;
          this.errors = errorResponse.error.errors;
        }
      );
    }
    */
  }

}
