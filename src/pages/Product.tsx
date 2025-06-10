import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Heart, Minus, Plus, Share2, ShoppingCart, Star, Truck } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { useParams } from 'react-router';
import { fetchProducts, selectProductById } from '@/redux/features/product';
import { addToCart } from '@/redux/features/cart';
import LoadingBar from '@/components/LoadingBar';

const Product = () => {
  console.log("redering")
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('m');
  const { items, error, status } = useSelector((state: RootState) => state.products);
  const product = useSelector((state: RootState) =>
    selectProductById(state, id!)
  );

  useEffect(() => {
    if(items.length == 0) dispatch(fetchProducts())
  }, [dispatch, items])
  const dummyProduct = {
    name: "Ergonomic Office Chair",
    price: 299.99,
    rating: 4.8,
    reviews: 256,
    description: "Premium ergonomic office chair designed for maximum comfort during long work sessions. Features adjustable lumbar support, breathable mesh back, and customizable armrests.",
    colors: ['black', 'gray', 'blue'],
    sizes: ['s', 'm', 'l'],
    features: [
      "Adjustable height and tilt",
      "Breathable mesh back",
      "Premium cushioning",
      "360° swivel base",
      "5-year warranty"
    ],
    specs: {
      "Material": "Mesh, Premium Foam, Aluminum base",
      "Weight Capacity": "300 lbs",
      "Dimensions": "26\"W x 26\"D x 48\"H",
      "Assembly": "Required, tools included",
      "Warranty": "5 years limited"
    },
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2599&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2599&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2599&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2599&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };


  const onAddToCart = () => dispatch(addToCart({...product, quantity:  quantity, color: selectedColor, size: selectedSize, price: (product?.price || 0) * quantity }))

  if (status === 'loading') return <div className='size-full flex justify-center items-center'><LoadingBar /></div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  if (!product) return (<div className='size-full h-screen flex justify-center items-center'><p>Product not found</p></div>)

  return (
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {dummyProduct.images.slice(1).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.title} view ${index + 2}`}
                  className="aspect-square w-full object-cover rounded-lg cursor-pointer hover:opacity-75"
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-2">New Arrival</Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating.rate)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                        }`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium">{product.rating.rate}</span>
                </div>
                <span className="text-sm text-gray-500">({product.rating.count} reviews)</span>
              </div>
            </div>

            <div className="text-3xl font-bold text-gray-900">${product.price}</div>

            <div className="space-y-4">
              {/* Color Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <div className="flex gap-2">
                  {dummyProduct.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${selectedColor === color
                          ? 'border-blue-500'
                          : 'border-transparent'
                        }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Size
                </label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {dummyProduct.sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={decrementQuantity}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={incrementQuantity}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex gap-4">
                <Button className="flex-1 gap-2" onClick={onAddToCart}>
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Shipping Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Truck className="w-4 h-4" />
                  <span>Free shipping on orders over $500</span>
                </div>
              </CardContent>
            </Card>

            {/* Product Details Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="description" className="flex-1">Description</TabsTrigger>
                <TabsTrigger value="features" className="flex-1">Features</TabsTrigger>
                <TabsTrigger value="specs" className="flex-1">Specifications</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-4">
                <p className="text-gray-600">{product.description}</p>
              </TabsContent>

              <TabsContent value="features" className="mt-4">
                <ul className="list-disc pl-4 space-y-2">
                  {dummyProduct.features.map((feature, index) => (
                    <li key={index} className="text-gray-600">{feature}</li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="specs" className="mt-4">
                <dl className="space-y-2">
                  {Object.entries(dummyProduct.specs).map(([key, value]) => (
                    <div key={key} className="flex gap-4">
                      <dt className="font-medium text-gray-900 w-1/3">{key}</dt>
                      <dd className="text-gray-600">{value}</dd>
                    </div>
                  ))}
                </dl>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
  );
};

export default Product;