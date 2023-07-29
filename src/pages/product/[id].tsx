import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/product'
import { GetStaticPaths, GetStaticProps } from 'next'
import { stripe } from '../../lib/stripe'
import Stripe from 'stripe'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Head from 'next/head'
import { useCart } from '../../hooks/useCart'
import { formatPrice } from '../../utils/formatPrice'

export interface ProductProps {
    product: {
        id: string;
        name: string;
        imageUrl: string;
        price: number;
        description: string;
        defaultPriceId: string;
        idPrice: string;
    }
}

export default function Product({ product }: ProductProps) {
    const { isFallback, /*router*/ } = useRouter()
    const priceFormatted = formatPrice(product.price);
    const { addItemInCart, changeOpenCart, changeOpenCartWithAnimation } = useCart();

   //const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

    function handleBuyProduct() {
        //setIsCreatingCheckoutSession(true);
        addItemInCart(product);
        changeOpenCartWithAnimation()
    }

    if(isFallback) {
        return <p>Loading...</p>
    }
    return(
        <>
            <Head>
                <title>{product.name} | Ignite Shop</title>
            </Head>

            <ProductContainer>
                <ImageContainer>
                    <Image src={product.imageUrl} width={520} height={480} alt='' />
                </ImageContainer>
                <ProductDetails>
                    <h1>{product.name}</h1>
                    <span>{priceFormatted}</span>

                    <p>{product.description}</p>

                    <button 
                        onClick={handleBuyProduct}
                    >
                        Colocar na sacola
                    </button>
                </ProductDetails>
            </ProductContainer>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    // Buscar os produtos mais vendidos / mais acessados

    return {
        paths: [
            { params: { id: 'prod_OJgqywS5F5thru' } }
        ],
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    const productId = params.id;

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price'],
    });

    const price = product.default_price as Stripe.Price

    return{
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: price.unit_amount,
                description: product.description,
                defaultPriceId: price.id,
                idPrice: price.id
            }
        },
        revalidate: 60 * 60 * 1, // 1 hour
    }
}