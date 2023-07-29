import { createContext, useState, useEffect, ReactNode } from 'react'
import axios from 'axios'

interface CartContextType {
    addItemInCart: (product: ProductType) => void;
    removeItemInCart: (idProduct: string) => void;
    checkout: () => void;
    changeOpenCart: () => void;
    changeOpenCartWithAnimation: () => void;
    openCart: boolean;
    cartItems: ProductType[];
}

interface ProductType {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    description: string;
    defaultPriceId: string;
}

interface CartContextProviderProps {
    children: ReactNode;
}

const ITEMS_STORAGE_KEY = "cartItems";

export const CartContext = createContext({} as CartContextType);

export default function CartContextProvider({ children }: CartContextProviderProps) {
    const [ cartItems, setCartItems ] = useState<ProductType[]>([]);
    const [openCart, setOpenCart] = useState(false)

    function addItemInCart(product: ProductType){
        const isProductInCart = cartItems.some((item) => item.id === product.id);

        if (!isProductInCart) {
            setCartItems((prevCartItems) => [...prevCartItems, product]); 
        }
    }

    function changeOpenCart() {
        setOpenCart(!openCart);
    }

    function changeOpenCartWithAnimation(){
        setTimeout(() => {
            setOpenCart(true)
        }, 500);

        setTimeout(() => {
            setOpenCart(false)
        }, 4000)
    }

    function removeItemInCart(idProduct: string) {
        setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== idProduct));
    }

    const cartItemsWithQuantity = cartItems.map(product => ({ price: product.defaultPriceId, quantity: 1 }));


    async function checkout() {
        const response = await axios.post('/api/checkout', {
            items: cartItemsWithQuantity,
        })

        const { checkoutUrl } = response.data;
        window.location.href = checkoutUrl
    }

    useEffect(() => {
        localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(cartItems))
    }, [cartItems])

    return(
        <CartContext.Provider value={{
            addItemInCart,
            removeItemInCart,
            checkout,
            changeOpenCart,
            changeOpenCartWithAnimation,
            openCart,
            cartItems
        }}>
            {children}
        </CartContext.Provider>
    )
}

