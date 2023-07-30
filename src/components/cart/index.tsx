import { X } from "@phosphor-icons/react";
import { CartContainer, DetailsContainer, HeaderContainer, Product, ProductsContainer } from "../../styles/components/cart/cart";
import Image from "next/image";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../utils/formatPrice";

export function Cart() {
    const { cartItems, removeItemInCart, checkout, changeOpenCart, openCart } = useCart();

    const totalCart = cartItems.reduce(
        (prevVal, elem) =>  prevVal + elem.price, 0)


    function handleCheckoutButton() {
        checkout()
    }

    function handleOpenCart() {
        changeOpenCart();
    }

    function handleRemoveItem() {
        const target = event.target as HTMLSpanElement;
        const id = target.dataset.id;
        
        removeItemInCart(id);

    }

    return(
        <>
            <CartContainer className={openCart && 'openned'}>
                <HeaderContainer>
                    <X size={24} weight="bold" onClick={handleOpenCart}/>
                </HeaderContainer>

            <ProductsContainer>
                    <p>Sacola de compras</p>
                    {cartItems.length === 0 ? 
                        <span>Parece que seu carrinho está vazio :(</span>
                        :
                        cartItems.map((product) => {
                            return(
                                <Product key={product.id}>
                                    <div className="imageContainer">
                                        <Image src={product.imageUrl} alt={product.name} width={94} height={94} />
                                    </div>
                                    <div className="itemDescriptionContainer">
                                        <p className="itemName">{product.name}</p>
                                        <span className="itemPrice">{formatPrice(product.price)}</span>
                                        <span className="removeButton" onClick={handleRemoveItem} data-id={product.id}>Remover</span>
                                    </div>
                                </Product>
                            )
                        })
                    }
                    
                    </ProductsContainer>
                    <DetailsContainer>
                        <div>
                            <p>Quantidade</p>
                            <p>{cartItems.length} item(s)</p>
                        </div>
                        <div className="totalValueContainer">
                            <p>Valor total</p>
                            <p>{formatPrice(totalCart)}</p>
                        </div>

                        <button onClick={handleCheckoutButton} disabled={cartItems.length > 0 ? false : true }>Finalizar compra</button>
                    </DetailsContainer>
            
            </CartContainer>
        </>
    )
}