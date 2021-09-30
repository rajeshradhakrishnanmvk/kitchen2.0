import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shoppinglist.service';
import * as ShoppingListActions from "../store/shopping-list.actions";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slform: NgForm;

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;


  constructor(private slService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) { }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getIngredient(index);
          this.slform.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      //this.slService.updateIngredient(this.editedItemIndex, newIngredient)
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient({
          index: this.editedItemIndex,
          ingredient: newIngredient
        })
      );
    } else {
      //this.slService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient))
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slform.reset();
    this.editMode = false;
  }

  onDelete() {
    //this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedItemIndex));
    this.onClear();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
