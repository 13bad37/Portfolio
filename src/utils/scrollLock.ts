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

    this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    const body = document.body;
    this.initialBodyStyle = body.style.overflow;
    this.initialBodyTop = body.style.top;
    this.initialBodyPosition = body.style.position;
    this.initialBodyWidth = body.style.width;

    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${this.scrollPosition}px`;
    body.style.width = '100%';
    body.style.height = '100%';

    body.style.webkitOverflowScrolling = 'touch';
    
    // Use passive listeners and handle prevention differently
    document.addEventListener('wheel', this.preventScroll, { passive: true });
    document.addEventListener('touchmove', this.preventScroll, { passive: true });
    document.addEventListener('keydown', this.preventKeyScroll, { passive: true });

    this.isLocked = true;
  }

  unlock(): void {
    if (!this.isLocked) return;

    const body = document.body;
    
    document.removeEventListener('wheel', this.preventScroll);
    document.removeEventListener('touchmove', this.preventScroll);
    document.removeEventListener('keydown', this.preventKeyScroll);

    body.style.overflow = this.initialBodyStyle;
    body.style.position = this.initialBodyPosition;
    body.style.top = this.initialBodyTop;
    body.style.width = this.initialBodyWidth;
    body.style.height = '';
    body.style.webkitOverflowScrolling = '';

    window.scrollTo(0, this.scrollPosition);

    this.isLocked = false;
  }

  private preventScroll = (e: Event): void => {
    if (this.isLocked) {
      // Use CSS-based prevention instead of preventDefault for passive listeners
      document.body.style.overflow = 'hidden';
    }
  };

  private preventKeyScroll = (e: KeyboardEvent): void => {
    if (!this.isLocked) return;
    const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
    if (keys.includes(e.key)) {
      // Only prevent if we can (non-passive)
      if (e.cancelable) {
        e.preventDefault();
      }
    }
  };

  isScrollLocked(): boolean {
    return this.isLocked;
  }
}

// Create singleton instance
export const scrollLock = new ScrollLock();