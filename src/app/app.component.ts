import { Component, VERSION , OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Film } from './film';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  heroForm: FormGroup;
  films: Promise<Film[]>;

  constructor(private formBuilder: FormBuilder, private heroService: HeroService) {
    
  }
  
  ngOnInit() {
    this.heroForm = this.formBuilder.group({
      heroname: ['', Validators.required]
    });
  }

  onSubmit() {
    this.films = this.heroService.getHeroes(this.heroForm.value.heroname);
  }
}
