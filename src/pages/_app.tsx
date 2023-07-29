import { AppProps } from "next/app";
import { globalStyles } from "../styles/global";
import { Container } from "../styles/pages/app";
import CartContext from "../contexts/CartContext";
import { Header } from "../components/header";
import { Cart } from "../components/cart";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <CartContext>
        <Header />
        <Cart />
        <Component {...pageProps} />
      </CartContext>
    </Container>

  )
}
