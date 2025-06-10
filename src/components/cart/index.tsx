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
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { removeFromCart, updateQuantity } from '@/redux/features/cart';
import { useNavigate } from 'react-router';

const Cart: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { items, total } = useSelector((state: RootState) => state.cart)

  const removeItem = (id: string) => {
    console.log("Removing id", id)
    dispatch(removeFromCart(id))
  };

  const onUpdateQuantity = (id: string, newQuantity: number) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }))
  };

  const onCheckout = () => {
    navigate("/checkout")
  }


  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        <ShoppingCart className="mr-2 h-4 w-4" />
        Cart ({items.length})
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="right" className="w-[400px] sm:max-w-[600px] sm:w-[600px]">
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
            <SheetDescription>
              Review and manage your cart items
            </SheetDescription>
          </SheetHeader>

          <ScrollArea className="h-[calc(100vh-200px)] mt-4">
            {items.length === 0 ? (
              <div className="text-center text-muted-foreground py-4">
                Your cart is empty
              </div>
            ) : (
              items.map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b py-3"
                >
                  <div>
                    <div className="font-medium">{item.title}</div>
                    <div className="text-muted-foreground">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
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

          {items.length > 0 && (
            <div className="mt-4">
              <div className="flex justify-between font-bold mb-4">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <SheetClose asChild>
                <Button onClick={onCheckout} className="w-full">Checkout</Button>
              </SheetClose>
            </div>
          )}

          <SheetClose />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Cart;