import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InventoryService, InventoryItem } from '../../../core/services/inventory';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inventory-list.html',
  styleUrls: ['./inventory-list.css']
})
export class InventoryList implements OnInit {
  items: InventoryItem[] = [];
  inventoryForm: FormGroup;
  isEditing = false;
  editingId: number | null = null;
  
  private inventoryService = inject(InventoryService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  constructor() {
    this.inventoryForm = this.fb.group({
      product_name: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.inventoryService.getAllItems().subscribe({
      next: (data) => {
        this.items = data;
      },
      error: (err) => console.error('Error loading inventory', err)
    });
  }

  onSubmit() {
    if (this.inventoryForm.invalid) return;

    if (this.isEditing && this.editingId) {
      this.inventoryService.updateItem(this.editingId, this.inventoryForm.value).subscribe({
        next: () => {
          this.loadItems();
          this.resetForm();
        },
        error: (err) => console.error('Error updating item', err)
      });
    } else {
      this.inventoryService.createItem(this.inventoryForm.value).subscribe({
        next: () => {
          this.loadItems();
          this.resetForm();
        },
        error: (err) => console.error('Error creating item', err)
      });
    }
  }

  editItem(item: InventoryItem) {
    this.isEditing = true;
    this.editingId = item.id!;
    this.inventoryForm.patchValue({
      product_name: item.product_name,
      quantity: item.quantity,
      price: item.price
    });
  }

  deleteItem(id: number) {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      this.inventoryService.deleteItem(id).subscribe({
        next: () => this.loadItems(),
        error: (err) => console.error('Error deleting item', err)
      });
    }
  }

  resetForm() {
    this.isEditing = false;
    this.editingId = null;
    this.inventoryForm.reset({ quantity: 0, price: 0 });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
