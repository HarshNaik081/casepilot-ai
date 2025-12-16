import { useEffect, useRef } from 'react';

export const useAutoScroll = (dependencies) => {
    const scrollRef = useRef(null);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, dependencies);

    return scrollRef;
};
