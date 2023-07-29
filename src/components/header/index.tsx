import Image from "next/image";
import Link from "next/link";
import logoImg from '../../assets/logo.svg'
import { Handbag } from "@phosphor-icons/react";
import { useCart } from "../../hooks/useCart";
import { HeaderContainer } from "../../styles/components/header/header";

export function Header() {
    const { cartItems, changeOpenCart } = useCart();

    function handleOpenCart() {
        changeOpenCart();
    }

    return(
        <HeaderContainer>
            <Link href='/'>
                <Image src={logoImg} alt="" quality={100}/>
            </Link>
            <button onClick={handleOpenCart}>
                <Handbag size={24} weight="bold"/>
                { cartItems.length > 0 && <span>{cartItems.length}</span>}
            </button>
        </HeaderContainer>
    )
}