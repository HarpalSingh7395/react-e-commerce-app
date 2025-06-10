import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { addToCart } from '@/redux/features/cart';
import { Product as ProductType } from '@/redux/features/product';
import { AppDispatch } from '@/redux/store';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router';

type ProductProps = {
    product: ProductType
}

export default function Product({ product }: ProductProps) {
    const dispatch = useDispatch<AppDispatch>();

    const onAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); // Prevent parent click (in case)
        dispatch(addToCart(product));
    };

    return (
        <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-200 cursor-pointer">
            <CardHeader className="relative p-0">
                <Link to={"/products/" + product.id}>
                    <img
                        src={product.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2599&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        alt={product.title}
                        className="w-full h-64 object-contain rounded-t-lg p-4"
                    />
                </Link>
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <Heart className="w-5 h-5" />
                </Button>
                {product.isNew && (
                    <Badge className="absolute top-2 left-2">New</Badge>
                )}
            </CardHeader>

            <CardContent className="p-4">
                <div className="text-sm text-gray-500 mb-1">{product.category}</div>
                <Link to={"/products/" + product.id}>
                    <CardTitle className="text-lg mb-2 hover:underline">{product.title}</CardTitle>
                </Link>
                <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                        <Star className="w-4 h-4 fill-current text-yellow-400" />
                        <span className="ml-1 text-sm font-medium">{product.rating.rate}</span>
                    </div>
                    <span className="text-sm text-gray-500">({product.rating.count} reviews)</span>
                </div>
                <div className="text-xl font-bold">${product.price}</div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <Button className="w-full gap-2" onClick={onAddToCart}>
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    );
}


