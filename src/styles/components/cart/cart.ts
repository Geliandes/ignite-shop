import { styled } from "@stitches/react";

export const CartContainer = styled('div', {
    background: '$gray800',
    width: '30rem',
    height: '100%',
    position: 'absolute',
    right: '-100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    zIndex: 999,
    transition: 'right 0.4s ease',
    '&.openned': {
        right: 0,
    }
})

export const HeaderContainer = styled('header', {
    padding: '1.5rem',
    display: 'flex',
    justifyContent: 'flex-end',
    
    'svg:hover': {
        opacity: .7,
        transition: '.3s',
        cursor: 'pointer',
    }
})

export const ProductsContainer = styled('div', {
    padding: "1.5rem 3rem 3rem 3rem",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '2rem',

    marginBottom: 'auto',

    '> p': {
        fontSize: '1.25rem',
        color: '$gray100',
        fontWeight: 700,
        lineHeight: 1.6
    }
})

export const Product = styled('div', {
    display: 'flex',
    gap: 20,

    '.imageContainer': {
        background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
        borderRadius: 8,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        img: {
            objectFit: 'cover'
        },
    },

    '.itemDescriptionContainer': {
        display: 'flex',
        flexDirection: 'column',
    },

    '.itemName': {
        color: '$gray300',
        fontSize: '1.125rem',
        lineHeight: 1.6
    },

    '.itemPrice': {
        fontWeight: 700,
        color: '$gray100',
        fontSize: '1.125rem',
        lineHeight: 1.6
    },
    
    '.removeButton': {
        color: '$green500',
        fontWeight: 700,
        fontSize: '1rem',
        marginTop: 'auto',
        lineHeight: 1.6,
        cursor: 'pointer',

        '&:hover': {
            color: '$green300',
            transition: '.3s'
        }
    }
})

export const DetailsContainer = styled('footer', {
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    fontSize: '1rem',
    color: '$gray100',
    lineHeight: 1.6,
    padding: "1.5rem 3rem 3rem 3rem",

    div: {
        display: 'flex',
        justifyContent: 'space-between',
    },

    '.totalValueContainer': {
        fontSize: '1.125rem',
        fontWeight: 700,
    },

    button: {
        padding: '1.25rem 2rem',
        borderRadius: 8,
        background: '$green500',
        border: 0,
        fontSize: '1.125rem',
        fontWeight: 700,
        color: '$white',
        cursor: 'pointer',
        marginTop: '3.625rem',

        '&:hover': {
            background: '$green300',
            transition: '.3s'
        }
    }
})