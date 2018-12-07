import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoriesService } from '../../../services/categories.service'
import { Category } from '../../../models/Category'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  private categories: Observable<Category[]>;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.categoriesService.getAllCategories().subscribe(data => this.categories = data);
    //this.categories = this.categoriesService.getAllCategories();
  }

}
