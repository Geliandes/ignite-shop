import Link from "next/link";
import { ImageContainer, SuccessContainer, MultipleImagesContainer } from "../styles/pages/success";
import { GetServerSideProps } from "next";
import { stripe } from "../lib/stripe";
import Stripe from "stripe";
import Image from "next/image";
import Head from "next/head";

interface SuccessProps{
    customerName: string;
    product: {
        name: string;
        images: string[0] ;
    }[]
}

export default function Success({ customerName, product }: SuccessProps) {
    console.log(product)
    return(
        <>
            <Head>
                <title>Compra efetuada | Ignite Shop</title>
                
                <meta name="robots" content="noindex" />
            </Head>

            <SuccessContainer>
            <MultipleImagesContainer>
                    {product.map((product) => {
                        return(
                            <ImageContainer key={product.images[0]}>
                                <Image src={product.images[0]} width={120} height={110} alt="" />
                            </ImageContainer>
                        )
                    })}
                </MultipleImagesContainer>
                <h1>Compra efetuada!</h1>
                <p>
                    Uhuul <strong>{customerName}</strong>, sua compra de {product.length > 1 ? product.length + ' camisetas' : product.length } já está a caminho da sua casa. 
                </p>

                <Link href='/'>
                Voltar ao catálogo
                </Link>
            </SuccessContainer>
        </>
    )
}

// Client-side (useEffect) | getServerSideProps | getStaticProps

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    if(!query.session_id){
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }
   
    const sessionId = String(query.session_id);
    
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product']
    })

    
    const customerName = session.customer_details.name
    const product = session.line_items.data.map((product) => product.price.product as Stripe.Product)


    return{
        props: {
            customerName,
            product: product
        }
    }
}

//session_id=cs_test_b1jcbzWafzy5qEDVfddEvo76V9YOFev1sKL57ZJMMcPzvdgRmB9rERaWVI