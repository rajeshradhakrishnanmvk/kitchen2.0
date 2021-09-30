import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shoppinglist.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  //private igChangeSub: Subscription;

  constructor(private slService: ShoppingListService,
    private loggingService: LoggingService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    //this.ingredients = this.slService.getIngredients();
    // this.igChangeSub = this.slService.ingredientsChanged
    //   .subscribe(
    //     (ingredients: Ingredient[]) => {
    //       this.ingredients = ingredients;
    //     }
    //   );
    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit');
  }
  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    //this.igChangeSub.unsubscribe();
  }

}
