import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';


import { Round1Component } from './Round1/Round1.component';
import { Round2Component } from './Round2/Round2.component';
import { SummaryComponent } from './Summary/Summary.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule,MatGridListModule,
  MatListModule, MatButtonModule, MatOptionModule, MatFormFieldModule, MatSelectModule, MatInputModule} from '@angular/material';
import { GamePlayerComponent } from './SharedComponents/game-player/game-player.component';

@NgModule({
  declarations: [			
    AppComponent,
    NavMenuComponent,
    Round1Component,
    Round2Component,
    SummaryComponent,
    GamePlayerComponent,
   ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: Round1Component, pathMatch: 'full' },
      { path: 'round2', component: Round2Component },
      { path: 'summary', component: SummaryComponent },
    ]),
    BrowserAnimationsModule,
    //Material
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatButtonModule,
    MatOptionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
