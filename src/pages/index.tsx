import { HomeContainer, Product } from "../styles/pages/home"
import { useKeenSlider } from 'keen-slider/react'
import { stripe } from "../lib/stripe"
import { GetStaticProps } from "next"
import Head from 'next/head'
import Link from "next/link"
import Image from "next/image"

import 'keen-slider/keen-slider.min.css';
import Stripe from "stripe"
import { Handbag } from "phosphor-react"

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 1.8,
      spacing: 48,
    },
  })

  return (
    <>
    <Head>
      <title>Ignite Shop</title>
    </Head>

      <HomeContainer ref={sliderRef} className="keen-slider" >
        {products.map((product) => {
          return(
            <Link key={product.id} href={`/product/${product.id}`} prefetch={false}>
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} placeholder="blur" blurDataURL={product.imageUrl} alt="" />
                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </div>
                  
                  <button><Handbag size={32} weight="bold"/></button>
                </footer>
              </Product>
            </Link>
          )
        })}
        <div className="keen-slider__slide" />
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount / 100)
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}