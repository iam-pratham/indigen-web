import localFont from 'next/font/local';

export const geistMono = localFont({
    src: '../fonts/geist-mono/geist-mono-variable.ttf',
    variable: '--font-geist-mono',
    display: 'swap',
});

export const bigShouldersDisplay = localFont({
    src: '../fonts/big-shoulders-display/BigShouldersDisplay.ttf',
    variable: '--font-big-shoulders-display',
    display: 'swap',
});

export const ppNeueMontreal = localFont({
    src: [
        {
            path: '../fonts/neue-montral/PPNeueMontreal-Thin.otf',
            weight: '100',
            style: 'normal',
        },
        {
            path: '../fonts/neue-montral/PPNeueMontreal-Light.otf',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../fonts/neue-montral/PPNeueMontreal-Regular.otf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../fonts/neue-montral/PPNeueMontreal-Book.otf',
            weight: '450',
            style: 'normal',
        },
        {
            path: '../fonts/neue-montral/PPNeueMontreal-Medium.otf',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../fonts/neue-montral/PPNeueMontreal-Bold.otf',
            weight: '700',
            style: 'normal',
        },
    ],
    variable: '--font-pp-neue-montreal',
    display: 'swap',
});

export const ppPangramSans = localFont({
    src: [
        {
            path: '../fonts/pangram-sans/PPPangramSans-Thin.otf',
            weight: '100',
            style: 'normal',
        },
        {
            path: '../fonts/pangram-sans/PPPangramSans-Light.otf',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../fonts/pangram-sans/PPPangramSans-Regular.otf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../fonts/pangram-sans/PPPangramSans-Medium.otf',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../fonts/pangram-sans/PPPangramSans-Semibold.otf',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../fonts/pangram-sans/PPPangramSans-Bold.otf',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../fonts/pangram-sans/PPPangramSans-Extrabold.otf',
            weight: '800',
            style: 'normal',
        },
    ],
    variable: '--font-pp-pangram-sans',
    display: 'swap',
});
