import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTable, MatTableModule, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-account',
  imports: [
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    CommonModule,
    FormsModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatTableModule,
    MatSortModule
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements AfterViewInit {
  @ViewChild(MatTable) matTable: any;
  @ViewChild(MatSort) sort: any;

  transactions = [
    {
      id: 1,
      date: new Date(2024, 5, 1),
      payee: 'Amazon',
      category: 'Shopping',
      memo: 'Books',
      outflow: 25.99,
      inflow: null,
      editing: false
    },
    {
      id: 2,
      date: new Date(2024, 5, 2),
      payee: 'Salary',
      category: 'Income',
      memo: '',
      outflow: null,
      inflow: 2000.00,
      editing: false
    },
    {
      id: 3,
      date: new Date(2024, 5, 3),
      payee: 'Supermarket',
      category: 'Groceries',
      memo: 'Weekly groceries',
      outflow: 80.50,
      inflow: null,
      editing: false
    }
  ];
  
  filter = '';

  dataSource = new MatTableDataSource(this.transactions);

  displayedColumns = [
    'select',
    'date',
    'payee',
    'category',
    'memo',
    'outflow',
    'inflow',
    'actions'
  ];
  
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    this.dataSource.filter = this.filter.trim().toLowerCase();
  }

  showAddTransactionRow() {
    this.transactions.unshift({
      id: new Date().getTime(),
      date: null,
      payee: null,
      category: null,
      memo: null,
      outflow: null,
      inflow: null,
      editing: true
    } as any);
    this.dataSource.data = this.transactions;
    this.matTable.renderRows();
  }

  cancelAddTransaction() {
    this.transactions.splice(0, 1);
    this.dataSource.data = this.transactions;
    this.matTable.renderRows();
  }

  addTransaction() {
    this.transactions[0].editing = false;
    this.dataSource.data = this.transactions;
    this.matTable.renderRows();
  }
}
