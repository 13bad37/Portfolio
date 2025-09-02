// Enhanced modal scroll management with anti-rubber-band desktop solution
class ModalScrollManager {
  private originalScrollY: number = 0;
  private isLocked: boolean = false;
  private isMobile: boolean = false;
  private touchStartY: number = 0;
  private preventTouch: boolean = false;
  private isUnlocking: boolean = false;
  private restoreTimer: number | null = null;
  private scrollbarWidth: number = 0;

  constructor() {
    this.isMobile = this.detectMobile();
    this.bindMethods();
  }

  private detectMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           window.innerWidth <= 768;
  }

  private bindMethods(): void {
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleWheel = this.handleWheel.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  lock(): void {
    if (this.isLocked || this.isUnlocking) return;

    // Clear any pending restore operations
    if (this.restoreTimer) {
      clearTimeout(this.restoreTimer);
      this.restoreTimer = null;
    }

    // Store scroll position with multiple fallbacks
    this.originalScrollY = this.getScrollPosition();
    this.scrollbarWidth = this.getScrollbarWidth();
    this.isLocked = true;
    this.isUnlocking = false;

    if (this.isMobile) {
      this.lockMobile();
    } else {
      this.lockDesktop();
    }
  }

  private lockMobile(): void {
    // Enhanced mobile approach that prevents layout breaks
    const body = document.body;
    const html = document.documentElement;
    
    // Store current scroll position more reliably
    this.originalScrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;
    
    // Apply mobile-friendly scroll lock
    body.style.overflow = 'hidden';
    body.style.position = 'relative';
    body.style.height = '100vh';
    body.style.width = '100%';
    
    // Prevent iOS bounce scrolling
    body.style.webkitOverflowScrolling = 'touch';
    html.style.overflow = 'hidden';
    
    // Prevent touch scrolling on the background
    document.addEventListener('touchstart', this.handleTouchStart, { passive: true });
    document.addEventListener('touchmove', this.handleTouchMove, { passive: true });
    
    // Add mobile-specific class for CSS targeting
    document.body.classList.add('modal-open-mobile');
  }

  private lockDesktop(): void {
    const body = document.body;
    const html = document.documentElement;
    
    // Enhanced desktop scroll lock with rubber-band prevention
    body.style.setProperty('overflow', 'hidden', 'important');
    body.style.setProperty('position', 'fixed', 'important');
    body.style.setProperty('top', `-${this.originalScrollY}px`, 'important');
    body.style.setProperty('left', '0', 'important');
    body.style.setProperty('right', '0', 'important');
    body.style.setProperty('width', '100%', 'important');
    
    // Prevent layout shift with scrollbar compensation
    if (this.scrollbarWidth > 0) {
      body.style.setProperty('padding-right', `${this.scrollbarWidth}px`, 'important');
    }

    // Additional stability measures
    html.style.setProperty('overflow', 'hidden', 'important');
    html.style.setProperty('scroll-behavior', 'auto', 'important');
    
    // Prevent all scroll-related events
    document.addEventListener('wheel', this.handleWheel, { passive: true });
    document.addEventListener('keydown', this.handleKeydown, { passive: true });
    document.addEventListener('scroll', this.handleScroll, { passive: true });
    
    body.classList.add('modal-open-desktop');
  }

  unlock(): void {
    if (!this.isLocked || this.isUnlocking) return;

    this.isUnlocking = true;

    // Clear any existing restore timer
    if (this.restoreTimer) {
      clearTimeout(this.restoreTimer);
      this.restoreTimer = null;
    }

    if (this.isMobile) {
      this.unlockMobile();
    } else {
      this.unlockDesktop();
    }
  }

  private unlockMobile(): void {
    const body = document.body;
    const html = document.documentElement;
    
    // Restore all mobile styles
    body.style.overflow = '';
    body.style.position = '';
    body.style.height = '';
    body.style.width = '';
    body.style.webkitOverflowScrolling = '';
    html.style.overflow = '';
    
    document.removeEventListener('touchstart', this.handleTouchStart);
    document.removeEventListener('touchmove', this.handleTouchMove);
    
    document.body.classList.remove('modal-open-mobile');
    
    // Simplified scroll restoration to reduce rubber banding
    requestAnimationFrame(() => {
      window.scrollTo({ top: this.originalScrollY, behavior: 'auto' });
    });
  }

  private unlockDesktop(): void {
    const body = document.body;
    const html = document.documentElement;
    const targetScrollY = this.originalScrollY;

    // Phase 1: Immediate event listener removal to prevent conflicts
    document.removeEventListener('wheel', this.handleWheel);
    document.removeEventListener('keydown', this.handleKeydown);
    document.removeEventListener('scroll', this.handleScroll);
    
    // Phase 2: Force scroll behavior to auto BEFORE any style changes
    html.style.setProperty('scroll-behavior', 'auto', 'important');
    document.documentElement.style.setProperty('scroll-behavior', 'auto', 'important');
    
    // Phase 3: Immediate scroll restoration BEFORE removing position fixed
    // This prevents the layout shift that causes rubber banding
    window.scrollTo(0, targetScrollY);
    
    // Phase 4: Synchronous style restoration in correct order
    requestAnimationFrame(() => {
      // Remove positioning styles in specific order to prevent layout thrashing
      body.style.removeProperty('position'); // Remove fixed positioning first
      body.style.removeProperty('top');      // Then remove top offset
      body.style.removeProperty('left');
      body.style.removeProperty('right');
      body.style.removeProperty('width');
      
      // Remove overflow last to prevent scroll jump
      body.style.removeProperty('overflow');
      body.style.removeProperty('padding-right');
      
      // Clean up HTML styles
      html.style.removeProperty('overflow');
      
      // Remove classes
      body.classList.remove('modal-open-desktop');
      
      // Phase 5: Final verification and cleanup
      requestAnimationFrame(() => {
        // Ensure scroll position is correct
        const currentScroll = this.getScrollPosition();
        if (Math.abs(currentScroll - targetScrollY) > 1) {
          window.scrollTo(0, targetScrollY);
        }
        
        // Reset scroll behavior to allow smooth scrolling again
        html.style.removeProperty('scroll-behavior');
        document.documentElement.style.removeProperty('scroll-behavior');
        
        this.finalizeUnlock();
      });
    });
  }

  private handleTouchStart(e: TouchEvent): void {
    const target = e.target as HTMLElement;
    const modalContent = target.closest('[data-modal-content]');
    
    if (modalContent) {
      // Allow scrolling within modal content
      this.touchStartY = e.touches[0].clientY;
      this.preventTouch = false;
    } else {
      // Prevent scrolling on background
      this.preventTouch = true;
    }
  }

  private handleTouchMove(e: TouchEvent): void {
    if (this.preventTouch) {
      if (e.cancelable) {
        e.preventDefault();
      }
      e.stopPropagation();
      return;
    }

    const target = e.target as HTMLElement;
    const modalContent = target.closest('[data-modal-content]');
    
    if (modalContent) {
      const scrollTop = modalContent.scrollTop;
      const scrollHeight = modalContent.scrollHeight;
      const clientHeight = modalContent.clientHeight;
      const currentY = e.touches[0].clientY;
      const deltaY = currentY - this.touchStartY;

      // Prevent overscroll at top and bottom of modal
      if ((scrollTop <= 1 && deltaY > 0) || 
          (scrollTop + clientHeight >= scrollHeight - 1 && deltaY < 0)) {
        if (e.cancelable) {
          e.preventDefault();
        }
        e.stopPropagation();
      }
    } else {
      // Always prevent scrolling outside modal on mobile
      if (e.cancelable) {
        e.preventDefault();
      }
      e.stopPropagation();
    }
  }

  private handleWheel(e: WheelEvent): void {
    const target = e.target as HTMLElement;
    const modalContent = target.closest('[data-modal-content]');
    
    if (!modalContent && e.cancelable) {
      e.preventDefault();
    }
  }

  private handleKeydown(e: KeyboardEvent): void {
    const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
    if (scrollKeys.includes(e.key)) {
      const target = e.target as HTMLElement;
      const modalContent = target.closest('[data-modal-content]');
      
      if (!modalContent && e.cancelable) {
        e.preventDefault();
      }
    }
  }

  private handleScroll = (e: Event): void => {
    // Prevent any scroll events during modal lock
    if (this.isLocked && !this.isUnlocking) {
      if (e.cancelable) {
        e.preventDefault();
      }
      e.stopImmediatePropagation();
    }
  };

  private getScrollPosition(): number {
    return window.pageYOffset || 
           document.documentElement.scrollTop || 
           document.body.scrollTop || 
           0;
  }

  private getScrollbarWidth(): number {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  private restoreScrollPosition(targetY: number): void {
    // Simplified immediate restoration to prevent rubber banding
    // The new unlockDesktop method handles this more effectively
    window.scrollTo(0, targetY);
    this.finalizeUnlock();
  }

  private finalizeUnlock(): void {
    this.isLocked = false;
    this.isUnlocking = false;
    
    if (this.restoreTimer) {
      clearTimeout(this.restoreTimer);
      this.restoreTimer = null;
    }
  }

  isScrollLocked(): boolean {
    return this.isLocked;
  }

  // Method to update mobile detection on resize
  updateMobileDetection(): void {
    this.isMobile = this.detectMobile();
  }
}

// Singleton instance with resize listener
const modalScrollManager = new ModalScrollManager();

// Update mobile detection on resize
window.addEventListener('resize', () => {
  modalScrollManager.updateMobileDetection();
}, { passive: true });

export { modalScrollManager };