import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCardModule, MatExpansionModule, MatIconModule, CurrencyPipe, DatePipe,
    MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatInputModule,
    MatDatepickerModule, MatNativeDateModule, FormsModule, MatButtonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  @ViewChild('addSubcategoryDialog') addSubcategoryDialog: any;
  @ViewChild('addCategoryDialog') addCategoryDialog: any;
  @ViewChild('confirmDeleteDialog') confirmDeleteDialog: any;

  newName: string = '';
  dialogRef: any = null;
  editingCategory: any = null;
  editingSubCategory: any = null;
  categoryToAddTo: any = null;
  dateTitle: Date = new Date();
  maxDate: Date = new Date(this.dateTitle.getFullYear(), this.dateTitle.getMonth() + 1, 1);
  isNextMonthDisabled: boolean = false;

  // Track deletion context
  deleteContext: { type: 'category' | 'subcategory', category?: any, subCategory?: any } | null = null;

  categories: any[] = [
    {
      category_name: 'Immediate Obligations',
      category_id: 1,
      subCategories: [
        {
          sub_category_id: 1,
          name: 'Electricity',
          budgeted_amount: 100,
          available_amount: 150,
          activity: 40
        },
        {
          sub_category_id: 2,
          name: 'Internet',
          budgeted_amount: 100,
          available_amount: 150,
          activity: 40
        },
      ],
    } as any,
    {
      category_name: 'True Expenses',
      category_id: 2,
      subCategories: [
        {
          sub_category_id: 3,
          name: 'Veterinary',
          budgeted_amount: 100,
          available_amount: 150,
          activity: 40
        },
        {
          sub_category_id: 4,
          name: 'Clothing',
          budgeted_amount: 100,
          available_amount: 150,
          activity: 40
        },
      ],
    } as any,
    {
      category_name: 'Debt Payments',
      category_id: 3,
      subCategories: [
        {
          sub_category_id: 5,
          name: 'Gaming loan',
          budgeted_amount: 100,
          available_amount: 150,
          activity: 40
        },
        {
          sub_category_id: 6,
          name: 'Bank loan',
          budgeted_amount: 100,
          available_amount: 150,
          activity: 40
        },
      ],
    } as any,
    {
      category_name: 'Goals',
      category_id: 4,
      subCategories: [
        {
          sub_category_id: 7,
          name: 'Savings',
          budgeted_amount: 100,
          available_amount: 150,
          activity: 40
        },
        {
          sub_category_id: 8,
          name: 'Vacation',
          budgeted_amount: 100,
          available_amount: 150,
          activity: 40
        },
      ],
    } as any,
    {
      category_name: 'Just for fun',
      category_id: 5,
      subCategories: [
        {
          sub_category_id: 9,
          name: 'Gaming',
          budgeted_amount: 100,
          available_amount: 150,
          activity: 40
        },
        {
          sub_category_id: 10,
          name: 'Dining Out',
          budgeted_amount: 100,
          available_amount: 150,
          activity: 40
        },
      ],
    } as any,
  ];

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  changeMonth(add: number) {
    this.dateTitle = new Date(this.dateTitle.getFullYear(), this.dateTitle.getMonth() + add, 1);
    this.isNextMonthDisabled = new Date(this.dateTitle.getFullYear(), this.dateTitle.getMonth() + 1, 1) > this.maxDate; 
  }

  onMonthSelected(event: Date, datepicker: MatDatepicker<Date>) {
    this.dateTitle = event;
    this.isNextMonthDisabled = new Date(this.dateTitle.getFullYear(), this.dateTitle.getMonth() + 1, 1) > this.maxDate; 
    datepicker.close();
  }

  // Dialog helpers
  openDialog(ref: any) {
    this.dialogRef = this.dialog.open(ref, { width: '350px', data: {} });
  }
  closeDialog() {
    if (this.dialogRef) this.dialogRef.close();
    this.dialogRef = null;
  }

  // Category
  openAddCategoryDialog(event: any) {
    event.stopPropagation();
    this.newName = '';
    this.editingCategory = null;
    this.openDialog(this.addCategoryDialog);
  }

  openEditCategoryDialog(event: any, category: any) {
    event.stopPropagation();
    this.editingCategory = category;
    this.newName = category.category_name;
    this.openDialog(this.addCategoryDialog);
  }

  confirmCategory() {
    if (!this.newName.trim()) {
      return this.closeDialog();
    } 
    
    if (this.editingCategory) {
      this.editingCategory.category_name = this.newName;
      this.editingCategory = null;
    } else {
      this.categories.push({
        category_id: Date.now(),
        category_name: this.newName,
        subCategories: []
      });
    }

    this.closeDialog();
  }

  deleteCategory(event: any, category: any) {
    event.stopPropagation();
    this.deleteContext = { type: 'category', category };
    this.openDialog(this.confirmDeleteDialog);
  }

  // Subcategory
  openAddSubcategoryDialog(event: any, category: any) {
    event.stopPropagation();
    this.categoryToAddTo = category;
    this.newName = '';
    this.editingSubCategory = null;
    this.openDialog(this.addSubcategoryDialog);
  }

  openEditSubcategoryDialog(category: any, subCategory: any) {
    this.categoryToAddTo = category;
    this.editingSubCategory = subCategory;
    this.newName = subCategory.name;
    this.openDialog(this.addSubcategoryDialog);
  }

  confirmSubcategory() {
    if (!this.newName.trim()) {
      return this.closeDialog();
    } 

    if (this.editingSubCategory) {
      this.editingSubCategory.name = this.newName;
      this.editingSubCategory = null;
    } else if (this.categoryToAddTo) {
      this.categoryToAddTo.subCategories.push({
        sub_category_id: Date.now(),
        name: this.newName,
        budgeted_amount: 0,
        activity: 0,
        available_amount: 0
      });
    }

    this.closeDialog();
  }

  deleteSubcategory(category: any, subCategory: any) {
    this.deleteContext = { type: 'subcategory', category, subCategory };
    this.openDialog(this.confirmDeleteDialog);
  }

  // Confirm deletion
  confirmDelete() {
    if (!this.deleteContext) return this.closeDialog();

    if (this.deleteContext.type === 'category') {
      const idx = this.categories.findIndex(c => c.category_id === this.deleteContext!.category.category_id);
      if (idx > -1) {
        this.categories.splice(idx, 1);
      }
    } else if (this.deleteContext.type === 'subcategory') {
      const { category, subCategory } = this.deleteContext;
      const idx = category.subCategories.findIndex((sc: any) => sc.sub_category_id === subCategory.sub_category_id);
      if (idx > -1) {
        category.subCategories.splice(idx, 1);
      }
    }
    this.deleteContext = null;
    this.closeDialog();
  }

  cancelDelete() {
    this.deleteContext = null;
    this.closeDialog();
  }
}
