import { useNavigate } from 'react-router-dom';
import type { Product } from '../types/product';

const products: Product[] = [
  { 
    id: 1, 
    name: "Laptop Lenovo ThinkPad", 
    price: 3200, 
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop", 
    description: "Laptop empresarial robusta y confiable" 
  },
  { 
    id: 2, 
    name: "Mouse Inalámbrico", 
    price: 80, 
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop", 
    description: "Mouse ergonómico con buena batería" 
  },
  { 
    id: 3, 
    name: "Teclado Mecánico", 
    price: 250, 
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=200&fit=crop", 
    description: "Ideal para programadores y gamers" 
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      {/* Hero Section */}
      <div className="bg-primary text-white rounded p-5 mb-5 text-center">
        <h1 className="display-4 fw-bold">Bienvenido a PuntoNet</h1>
        <p className="lead">Tu plataforma de confianza para tecnología, servicios e intercambios</p>
        <button 
          className="btn btn-light btn-lg mt-3"
          onClick={() => navigate('/productos')}
        >
          Explorar Productos
        </button>
      </div>

      {/* Categorías */}
      <div className="row mb-5">
        <div className="col-md-4 mb-3">
          <div className="card h-100 text-center">
            <div className="card-body">
              <i className="bi bi-laptop display-4 text-primary"></i>
              <h3 className="mt-3">Tecnología</h3>
              <p className="text-muted">Encuentra los mejores dispositivos y accesorios</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card h-100 text-center">
            <div className="card-body">
              <i className="bi bi-tools display-4 text-success"></i>
              <h3 className="mt-3">Servicios</h3>
              <p className="text-muted">Reparación, mantenimiento y soporte técnico</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card h-100 text-center">
            <div className="card-body">
              <i className="bi bi-arrow-left-right display-4 text-warning"></i>
              <h3 className="mt-3">Intercambios</h3>
              <p className="text-muted">Intercambia tus dispositivos por otros que necesites</p>
            </div>
          </div>
        </div>
      </div>

      {/* Productos Destacados */}
      <h2 className="mb-4">Productos Destacados</h2>
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img 
                src={product.image} 
                className="card-img-top" 
                alt={product.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-muted small flex-grow-1">
                  {product.description}
                </p>
                <div className="mt-auto">
                  <p className="card-text fw-bold text-primary fs-5">S/. {product.price}</p>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-primary btn-sm flex-fill"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      Ver detalles
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => alert(`${product.name} agregado al carrito!`)}
                    >
                      <i className="bi bi-cart-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}