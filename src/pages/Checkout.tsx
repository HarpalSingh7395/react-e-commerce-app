import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  CreditCard, 
  MapPin, 
  Package,
  Trash2
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  couponCode: string;
}

const CheckoutPage: React.FC = () => {
  const { items, total } = useSelector((state: RootState) => state.cart)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: '1', name: 'Wireless Headphones', price: 99.99, quantity: 2 },
    { id: '2', name: 'Smart Watch', price: 199.99, quantity: 1 }
  ]);

  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    couponCode: ''
  });

  const [couponDiscount, setCouponDiscount] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const applyCoupon = () => {
    // Simple coupon validation logic
    if (formData.couponCode.toUpperCase() === 'SAVE10') {
      setCouponDiscount(total * 0.1);
    } else {
      setCouponDiscount(0);
    }
  };

  const calculateTotal = () => {
    const subtotal = total;
    const shipping = 9.99;
    return subtotal + shipping - couponDiscount;
  };

  return (
    <div className="container mx-auto p-4 grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="mr-2" /> Cart Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          {items.map(item => (
            <div 
              key={item.id} 
              className="flex justify-between items-center border-b py-3"
            >
              <div>
                <div className="font-medium">{item.title}</div>
                <div className="text-muted-foreground">
                  ${item.price.toFixed(2)} × {item.quantity}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <div className="mt-4">
            <Label>Coupon Code</Label>
            <div className="flex space-x-2">
              <Input 
                name="couponCode"
                value={formData.couponCode}
                onChange={handleInputChange}
                placeholder="Enter coupon code"
              />
              <Button onClick={applyCoupon}>Apply</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="mr-2" /> Shipping Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>First Name</Label>
                <Input 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                />
              </div>
            </div>
            <div>
              <Label>Email</Label>
              <Input 
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
              />
            </div>
            <div>
              <Label>Address</Label>
              <Input 
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="123 Main St"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>City</Label>
                <Input 
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="New York"
                />
              </div>
              <div>
                <Label>Country</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Zip Code</Label>
                <Input 
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="10001"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="mr-2" /> Payment Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <Label>Card Number</Label>
              <Input 
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="4111 1111 1111 1111"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Expiry Date</Label>
                <Input 
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <Label>CVV</Label>
                <Input 
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  type="password"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$9.99</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Coupon Discount</span>
                  <span>-${couponDiscount.toFixed(2)}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <Button className="w-full">Complete Order</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutPage;