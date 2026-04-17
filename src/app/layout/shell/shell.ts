import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Footer } from '@layout/footer/footer';
import { Navbar } from '@layout/navbar/navbar';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {}
