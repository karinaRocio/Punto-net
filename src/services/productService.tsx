import type { Product } from '../types/product';

/**
 * Servicio para manejar productos
 * Útil si usas un backend para productos dinámicos
 */
class ProductService {
  /**
   * Obtiene todos los productos
   * @returns Promise<Product[]>
   */
  async getProducts(): Promise<Product[]> {
    // TODO: En producción, descomenta esto:
    // const response = await fetch(`${API_URL}/products`);
    // return response.json();

    // Simulación con productos mock (reemplaza con tu lógica actual)
    return [
      { id: 1, name: 'Producto Premium', price: 29.99, image: '/img1.jpg' },
      { id: 2, name: 'Producto Deluxe', price: 49.99, image: '/img2.jpg' },
    ];
  }

  /**
   * Obtiene un producto por ID
   * @param id - ID del producto
   */
  async getProductById(id: number): Promise<Product | null> {
    const products = await this.getProducts();
    return products.find(p => p.id === id) || null;
  }
}

export const productService = new ProductService();