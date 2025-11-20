import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { Product } from '../types/product';

const productDetails: Product[] = [
  {
    id: 1,
    name: "Laptop Lenovo ThinkPad X1 Carbon",
    price: 3200,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=400&fit=crop",
    description: "Laptop empresarial ultraligera y robusta con procesador Intel Core i7 de 11va generación.",
    brand: "Lenovo",
    rating: 4.8
  },
  {
    id: 2,
    name: "Mouse Inalámbrico Logitech MX Master 3",
    price: 80,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=400&fit=crop",
    description: "Mouse ergonómico avanzado con sensor Darkfield de alta precisión.",
    brand: "Logitech",
    rating: 4.7
  },
  {
    id: 3,
    name: "Teclado Mecánico RGB Corsair K95",
    price: 250,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=400&fit=crop",
    description: "Teclado mecánico gaming premium con switches Cherry MX Speed.",
    brand: "Corsair",
    rating: 4.9
  },
  {
    id: 4,
    name: "Monitor Gaming 24\" ASUS TUF",
    price: 450,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=400&fit=crop",
    description: "Monitor gaming Full HD con tasa de refresco de 144Hz.",
    brand: "ASUS",
    rating: 4.6
  },
  {
    id: 5,
    name: "SSD 1TB Samsung 970 EVO Plus NVMe",
    price: 180,
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=400&fit=crop",
    description: "Unidad de estado sólido NVMe de alto rendimiento.",
    brand: "Samsung",
    rating: 4.9
  },
  {
    id: 6,
    name: "Webcam Logitech C922 Pro Stream",
    price: 120,
    image: "https://media.falabella.com/falabellaPE/128851047_01/w=800,h=800,fit=pad",
    description: "Cámara web Full HD con micrófonos duales integrados.",
    brand: "Logitech",
    rating: 4.5
  }
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = productDetails.find(p => p.id === parseInt(id || '0'));

  if (!product) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning text-center">
          <h3>Producto no encontrado</h3>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    alert(`¡${product.name} agregado al carrito!`);
  };

  return (
    <div className="container mt-4">
      <button className="btn btn-outline-secondary mb-4" onClick={() => navigate(-1)}>
        ← Volver
      </button>
      
      <div className="row">
        <div className="col-md-6">
          <img 
            src={product.image} 
            alt={product.name}
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <h1>{product.name}</h1>
          <h2 className="text-primary my-3">S/. {product.price}</h2>
          
          <p className="lead">{product.description}</p>

          <div className="d-flex gap-2">
            <button className="btn btn-primary btn-lg" onClick={handleAddToCart}>
              Agregar al Carrito
            </button>
            <button className="btn btn-success btn-lg">
              Comprar Ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}