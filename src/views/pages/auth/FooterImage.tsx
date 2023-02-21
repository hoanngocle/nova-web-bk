// ** React Imports
import { ReactNode } from 'react';

// ** MUI Components
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled, useTheme } from '@mui/material/styles';

interface FooterImageProp {
    height?: number;
    image?: ReactNode;
    className?: string;
}

// Styled Components
const MaskImg = styled('img')(({ theme }) => ({
    bottom: 0,
    height: 300,
    width: '100%',
    position: 'absolute',
    [theme.breakpoints.down(1540)]: {
        height: 250
    }
}));

const FooterImage = (props: FooterImageProp) => {
    // ** Props
    const { image, height, className } = props;

    // ** Hook
    const theme = useTheme();

    // ** Vars
    const hidden = useMediaQuery(theme.breakpoints.down('md'));

    if (!hidden) {
        return (
            <>
                {!image ? (
                    <MaskImg
                        alt='mask'
                        className={className}
                        {...(height && { height })}
                        src={`/images/pages/auth-v2-mask-${theme.palette.mode}.png`}
                    />
                ) : typeof image === 'string' ? (
                    <MaskImg alt='mask' src={image} className={className} {...(height && { height })} />
                ) : (
                    image
                )}
            </>
        );
    } else {
        return null;
    }
};

export default FooterImage;
