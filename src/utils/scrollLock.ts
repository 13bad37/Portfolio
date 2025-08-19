// Robust scroll lock utility for perfect modal behavior
class ScrollLock {
  private scrollPosition: number = 0;
  private isLocked: boolean = false;
  private initialBodyStyle: string = '';
  private initialBodyTop: string = '';
  private initialBodyPosition: string = '';
  private initialBodyWidth: string = '';

  lock(): void {
    if (this.isLocked) return;

    // Store current scroll position immediately
    this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    // Store original body styles
    const body = document.body;
    this.initialBodyStyle = body.style.overflow;
    this.initialBodyTop = body.style.top;
    this.initialBodyPosition = body.style.position;
    this.initialBodyWidth = body.style.width;

    // Apply scroll lock styles immediately
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${this.scrollPosition}px`;
    body.style.width = '100%';
    body.style.height = '100%';

    // Prevent iOS rubber band scrolling
    body.style.webkitOverflowScrolling = 'touch';
    
    // Add event listeners to prevent scrolling
    document.addEventListener('wheel', this.preventScroll, { passive: false });
    document.addEventListener('touchmove', this.preventScroll, { passive: false });
    document.addEventListener('keydown', this.preventKeyScroll);

    this.isLocked = true;
  }

  unlock(): void {
    if (!this.isLocked) return;

    const body = document.body;
    
    // Remove event listeners
    document.removeEventListener('wheel', this.preventScroll);
    document.removeEventListener('touchmove', this.preventScroll);
    document.removeEventListener('keydown', this.preventKeyScroll);

    // Restore original body styles
    body.style.overflow = this.initialBodyStyle;
    body.style.position = this.initialBodyPosition;
    body.style.top = this.initialBodyTop;
    body.style.width = this.initialBodyWidth;
    body.style.height = '';
    body.style.webkitOverflowScrolling = '';

    // Restore scroll position immediately
    window.scrollTo(0, this.scrollPosition);

    this.isLocked = false;
  }

  private preventScroll = (e: Event): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  private preventKeyScroll = (e: KeyboardEvent): void => {
    const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
    if (keys.includes(e.key)) {
      e.preventDefault();
    }
  };

  isScrollLocked(): boolean {
    return this.isLocked;
  }
}

// Create singleton instance
export const scrollLock = new ScrollLock();