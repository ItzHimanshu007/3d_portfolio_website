import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { getLenis } from '../utils/lenis';
import './Lightbox.css';

export interface LightboxImage {
    src: string;
    alt: string;
}

interface LightboxProps {
    images: LightboxImage[];
    index: number | null;
    onClose: () => void;
    onIndexChange: (index: number) => void;
}

/** Full-screen image viewer: Escape closes, arrow keys navigate, focus stays inside while open. */
const Lightbox = ({ images, index, onClose, onIndexChange }: LightboxProps) => {
    const dialogRef = useRef<HTMLDivElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);
    const isOpen = index !== null;
    const hasMultiple = images.length > 1;

    useEffect(() => {
        if (!isOpen) return;
        const previouslyFocused = document.activeElement as HTMLElement | null;
        closeRef.current?.focus();
        getLenis()?.stop();
        document.body.style.overflow = 'hidden';

        return () => {
            getLenis()?.start();
            document.body.style.overflow = '';
            previouslyFocused?.focus();
        };
    }, [isOpen]);

    useEffect(() => {
        if (index === null) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (hasMultiple && e.key === 'ArrowRight') onIndexChange((index + 1) % images.length);
            if (hasMultiple && e.key === 'ArrowLeft') onIndexChange((index - 1 + images.length) % images.length);
            if (e.key === 'Tab' && dialogRef.current) {
                // Keep keyboard focus inside the dialog
                const focusable = dialogRef.current.querySelectorAll<HTMLElement>('button');
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
                else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [index, images.length, hasMultiple, onClose, onIndexChange]);

    if (index === null) return null;
    const image = images[index];

    return createPortal(
        <div
            ref={dialogRef}
            className="lightbox-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label={`Image viewer: ${image.alt}`}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <button ref={closeRef} className="lightbox-btn lightbox-close" onClick={onClose} aria-label="Close image viewer">
                <X size={24} />
            </button>

            {hasMultiple && (
                <button
                    className="lightbox-btn lightbox-prev"
                    onClick={() => onIndexChange((index - 1 + images.length) % images.length)}
                    aria-label="Previous image"
                >
                    <ChevronLeft size={28} />
                </button>
            )}

            <figure className="lightbox-figure">
                <img src={image.src} alt={image.alt} className="lightbox-image" />
                {hasMultiple && (
                    <figcaption className="lightbox-caption">{index + 1} / {images.length}</figcaption>
                )}
            </figure>

            {hasMultiple && (
                <button
                    className="lightbox-btn lightbox-next"
                    onClick={() => onIndexChange((index + 1) % images.length)}
                    aria-label="Next image"
                >
                    <ChevronRight size={28} />
                </button>
            )}
        </div>,
        document.body
    );
};

export default Lightbox;
