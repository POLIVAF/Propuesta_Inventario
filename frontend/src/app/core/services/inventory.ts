import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface InventoryItem {
  id?: number;
  product_name: string;
  quantity: number;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  // Conectado al backend en Render
  private apiUrl = 'https://inventario-api-76z6.onrender.com/api/inventory';
  private http = inject(HttpClient);

  constructor() { }

  getAllItems(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.apiUrl);
  }

  createItem(item: InventoryItem): Observable<InventoryItem> {
    return this.http.post<InventoryItem>(this.apiUrl, item);
  }

  updateItem(id: number, item: Partial<InventoryItem>): Observable<InventoryItem> {
    return this.http.put<InventoryItem>(`${this.apiUrl}/${id}`, item);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
