import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { AppComponent } from './app.component';
import { UserInputComponent } from './user-input/user-input.component';
import { InvestmentResultsComponent } from './investment-results/investment-results.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UserInputModule } from './user-input/user-input.module';

@NgModule({
  declarations: [HeaderComponent, AppComponent, InvestmentResultsComponent],
  imports: [BrowserModule, UserInputModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
