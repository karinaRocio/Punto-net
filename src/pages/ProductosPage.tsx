import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import "./ProductosPage.css";

// ✅ DATOS ACTUALIZADOS con brand y rating
const allProducts: Product[] = [
  { 
    id: 1, 
    name: "Laptop Lenovo ThinkPad X1", 
    price: 3200, 
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop", 
    description: "Laptop empresarial ultraligera con Intel Core i7.",
    brand: "Lenovo",
    rating: 4.5
  },
  { 
    id: 2, 
    name: "Mouse Inalámbrico Logitech MX", 
    price: 80, 
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop", 
    description: "Mouse ergonómico con sensor de alta precisión.",
    brand: "Logitech",
    rating: 4.2
  },
  { 
    id: 3, 
    name: "Teclado Mecánico RGB Corsair", 
    price: 250, 
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=200&fit=crop", 
    description: "Teclado mecánico ideal para programadores y gamers.",
    brand: "Corsair",
    rating: 4.8
  },
  { 
    id: 4, 
    name: "Monitor 24\" Dell UltraSharp", 
    price: 450, 
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&h=200&fit=crop", 
    description: "Monitor LED con resolución Full HD y conexiones múltiples.",
    brand: "Dell",
    rating: 4.3
  },
  { 
    id: 5, 
    name: "SSD 1TB Samsung NVMe", 
    price: 180, 
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=200&fit=crop", 
    description: "Disco sólido de alta velocidad.",
    brand: "Samsung",
    rating: 4.7
  },
  { 
    id: 6, 
    name: "Webcam Logitech C922 Pro", 
    price: 120, 
    image: "https://images.unsplash.com/photo-1556656864-57c57d252e6f?w=300&h=200&fit=crop", 
    description: "Cámara web HD con micrófono integrado.",
    brand: "Logitech",
    rating: 4.1
  },
  { 
    id: 7, 
    name: "Impresora Láser HP LaserJet", 
    price: 650, 
    image: "https://images.unsplash.com/photo-1595341595379-cf1cb694ea1d?w=300&h=200&fit=crop", 
    description: "Impresora láser monocromática de alta velocidad.",
    brand: "HP",
    rating: 3.9
  },
  { 
    id: 8, 
    name: "Tablet Samsung Galaxy Tab", 
    price: 890, 
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=300&h=200&fit=crop", 
    description: "Tablet Android con pantalla AMOLED.",
    brand: "Samsung",
    rating: 4.4
  },
  { 
    id: 9, 
    name: "Smartwatch Garmin Venu", 
    price: 320, 
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop", 
    description: "Reloj inteligente con GPS y monitoreo de salud.",
    brand: "Garmin",
    rating: 4.0
  }
];

export default function ProductosPage() {
  const [filters, setFilters] = useState({
    priceRanges: [] as string[],
    brands: [] as string[],
    rating: null as number | null
  });

  // 🎯 LÓGICA DE FILTRADO
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      // Filtrar por precio
      if (filters.priceRanges.length > 0) {
        const inPriceRange = filters.priceRanges.some(range => {
          switch (range) {
            case '0-500': return product.price < 500;
            case '500-1000': return product.price >= 500 && product.price <= 1000;
            case '1000-2500': return product.price >= 1000 && product.price <= 2500;
            case '3000+': return product.price >= 3000;
            default: return true;
          }
        });
        if (!inPriceRange) return false;
      }

      // Filtrar por marca
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }

      // Filtrar por calificación
      if (filters.rating !== null && product.rating < filters.rating) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const handlePriceChange = (range: string) => {
    setFilters(prev => ({
      ...prev,
      priceRanges: prev.priceRanges.includes(range)
        ? prev.priceRanges.filter(r => r !== range)
        : [...prev.priceRanges, range]
    }));
  };

  const handleBrandChange = (brand: string) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  const handleRatingChange = (rating: number | null) => {
    setFilters(prev => ({
      ...prev,
      rating: prev.rating === rating ? null : rating
    }));
  };

  const handleClearFilters = () => {
    setFilters({ priceRanges: [], brands: [], rating: null });
  };

  const activeFiltersCount = filters.priceRanges.length + filters.brands.length + (filters.rating ? 1 : 0);

  return (
    <div className="container-fluid container-xl mt-4">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/productos">Electrónica</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Laptops
          </li>
        </ol>
      </nav>

      <div className="row">
        {/* Sidebar de filtros */}
        <div className="col-12 col-lg-3 mb-4 mb-lg-0">
          <FilterSidebar
            filters={filters}
            onPriceChange={handlePriceChange}
            onBrandChange={handleBrandChange}
            onRatingChange={handleRatingChange}
            onClearFilters={handleClearFilters}
            activeFiltersCount={activeFiltersCount}
          />
        </div>

        {/* Contenido principal */}
        <div className="col-12 col-lg-9">
          {/* Header con contador y orden */}
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <div>
              <h1 className="mb-1">Laptops</h1>
              <p className="text-muted mb-0">
                {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
              </p>
            </div>
            <select className="form-select" style={{ width: 'auto' }}>
              <option value="relevance">Más relevantes</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="rating">Mejor calificados</option>
            </select>
          </div>

          {/* Grid de productos */}
          {filteredProducts.length > 0 ? (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-funnel display-1 text-muted"></i>
              <h3 className="mt-3">No se encontraron productos</h3>
              <p className="text-muted">Intenta ajustar tus filtros</p>
              <button className="btn btn-primary" onClick={handleClearFilters}>
                <i className="bi bi-arrow-clockwise me-2"></i>Limpiar filtros
              </button>
            </div>
          )}

          {/* Paginación */}
          <nav aria-label="Page navigation" className="mt-5">
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <a className="page-link" href="#" tabIndex={-1}>Anterior</a>
              </li>
              <li className="page-item active"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item">
                <a className="page-link" href="#">Siguiente</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}