import React, { useState } from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription, 
  SheetClose 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, ShoppingCart } from "lucide-react";

// Define cart item type
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: '1', name: 'Product 1', price: 29.99, quantity: 2 },
    { id: '2', name: 'Product 2', price: 49.99, quantity: 1 },
  ]);

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, newQuantity) } 
        : item
    ));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        <ShoppingCart className="mr-2 h-4 w-4" />
        Cart ({cartItems.length})
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="right" className="w-[400px]">
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
            <SheetDescription>
              Review and manage your cart items
            </SheetDescription>
          </SheetHeader>

          <ScrollArea className="h-[calc(100vh-200px)] mt-4">
            {cartItems.length === 0 ? (
              <div className="text-center text-muted-foreground py-4">
                Your cart is empty
              </div>
            ) : (
              cartItems.map(item => (
                <div 
                  key={item.id} 
                  className="flex items-center justify-between border-b py-3"
                >
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-muted-foreground">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </ScrollArea>

          {cartItems.length > 0 && (
            <div className="mt-4">
              <div className="flex justify-between font-bold mb-4">
                <span>Total:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <Button className="w-full">Checkout</Button>
            </div>
          )}

          <SheetClose />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Cart;