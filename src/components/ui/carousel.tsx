'use client';

import * as React from 'react';
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: 'horizontal' | 'vertical';
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  selectedIndex: number;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) throw new Error('useCarousel must be used within a <Carousel />');
  return context;
}

function Carousel({
  orientation = 'horizontal',
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    { ...opts, axis: orientation === 'horizontal' ? 'x' : 'y' },
    plugins,
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const onScroll = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    const snapList = api.scrollSnapList();
    const progress = api.scrollProgress();
    let nearest = 0;
    let minDist = Infinity;
    snapList.forEach((snap, i) => {
      const dist = Math.abs(snap - progress);
      if (dist < minDist) { minDist = dist; nearest = i; }
    });
    setSelectedIndex(nearest);
  }, []);

  const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); scrollPrev(); }
      else if (event.key === 'ArrowRight') { event.preventDefault(); scrollNext(); }
    },
    [scrollPrev, scrollNext],
  );

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    onScroll(api);
    api.on('reInit', onSelect);
    api.on('select', onSelect);
    api.on('scroll', onScroll);
    return () => {
      api.off('select', onSelect);
      api.off('scroll', onScroll);
    };
  }, [api, onSelect, onScroll]);

  return (
    <CarouselContext.Provider value={{ carouselRef, api, opts, orientation, scrollPrev, scrollNext, canScrollPrev, canScrollNext, selectedIndex }}>
      <div
        onKeyDownCapture={handleKeyDown}
        className={`carousel-root${className ? ` ${className}` : ''}`}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({ className, ...props }: React.ComponentProps<'div'>) {
  const { carouselRef, orientation } = useCarousel();
  return (
    <div ref={carouselRef} className="carousel-viewport">
      <div
        className={`carousel-content${orientation === 'vertical' ? ' carousel-content--vertical' : ''}${className ? ` ${className}` : ''}`}
        {...props}
      />
    </div>
  );
}

function CarouselItem({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={`carousel-item${className ? ` ${className}` : ''}`}
      {...props}
    />
  );
}

function CarouselPrevious({ className, children, ...props }: React.ComponentProps<'button'>) {
  const { scrollPrev, canScrollPrev } = useCarousel();
  return (
    <button
      className={`carousel-btn carousel-btn--prev${className ? ` ${className}` : ''}`}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      aria-label="Précédent"
      {...props}
    >
      {children ?? (
        <svg width="60" height="60" viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <path d="M22 26l-8-8 8-8" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 26l-8-8 8-8" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  );
}

function CarouselNext({ className, children, ...props }: React.ComponentProps<'button'>) {
  const { scrollNext, canScrollNext } = useCarousel();
  return (
    <button
      className={`carousel-btn carousel-btn--next${className ? ` ${className}` : ''}`}
      disabled={!canScrollNext}
      onClick={scrollNext}
      aria-label="Suivant"
      {...props}
    >
      {children ?? (
        <svg width="60" height="60" viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <path d="M14 10l8 8-8 8" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20 10l8 8-8 8" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  );
}

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, useCarousel, type CarouselApi };
