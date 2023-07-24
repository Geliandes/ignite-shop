import { styled } from "..";

export const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    minHeight: '100vh',
})

export const Header = styled('header', {
    padding: '2rem 0',
    width: '100%',
    maxWidth: 1180,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    button: {
        padding: '0.75rem',
        borderRadius: 6,
        background: '$gray800',
        color: '$gray400',
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',

        span: {
            position: 'absolute',
            width: 24,
            height: 24,
            top: '-6px',
            right: '-6px',
            background: '$green500',
            lineHeight: 1.4,
            color: '$white',
            borderRadius: '50%',
            border: '3px solid $gray900'
        }
    }


})