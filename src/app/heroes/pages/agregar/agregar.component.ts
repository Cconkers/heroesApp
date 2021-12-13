import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
})
export class AgregarComponent implements OnInit {
  heroe: Heroe = {
    id: '',
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  constructor(
    private HeroesService: HeroesService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public MatDialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      return;
    }
    this.ActivatedRoute.params
      .pipe(switchMap(({ id }) => this.HeroesService.getHeroePorId(id)))
      .subscribe((heroe) => (this.heroe = heroe));
  }

  borrar() {
    //Borrar
    const dialog = this.MatDialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.heroe.superhero,
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.HeroesService.borrarHeroe(this.heroe.id!).subscribe((resp) =>
          this.router.navigate(['/heroes/listado'])
        );
      }
    });
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }
    if (this.heroe.id) {
      //Actualizar
      this.HeroesService.actualizarHeroe(this.heroe).subscribe((heroe) =>
        this.mostrarSnackbar('¡Registro actualizado!')
      );
    } else {
      //Crear
      this.HeroesService.agregarHeroe(this.heroe).subscribe((heroe) => {
        this.router.navigate(['/heroes/editar', heroe.id]);
      });
    }
  }

  mostrarSnackbar(mensaje: string) {
    this.snackBar.open(mensaje, 'OK', {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: 'mySnackBar',
    });
  }
}
