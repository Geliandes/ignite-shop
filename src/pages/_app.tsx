import { AppProps } from "next/app";
import { globalStyles } from "../styles/global";
import logoImg from '../assets/logo.svg'

import { Container, Header } from "../styles/pages/app";

import Image from 'next/image'
import Link from "next/link";
import { Handbag } from "@phosphor-icons/react";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Link href='/'>
          <Image src={logoImg} alt="" quality={100}/>
        </Link>
        <button>
          <Handbag size={24} weight="bold"/>
          <span>1</span>
        </button>
      </Header>
      <Component {...pageProps} />
    </Container>

  )
}
