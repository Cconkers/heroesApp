import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css'],
})
export class BuscarComponent implements OnInit {
  heroes: Heroe[] = [];
  termino: string = '';
  heroeSeleccionado!: Heroe[] | undefined;

  constructor(private HeroesService: HeroesService) {}

  ngOnInit(): void {}

  buscando() {
    this.HeroesService.getSugerenias(this.termino).subscribe(
      (heroes) => (this.heroes = heroes)
    );
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.heroeSeleccionado = undefined;
      return;
    }
    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero;

    this.HeroesService.getHeroePorId(heroe.id!)
    .subscribe(heroe => this.heroeSeleccionado = heroe);
  }
}
