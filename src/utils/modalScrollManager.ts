// Enhanced modal scroll management with mobile-first approach
class ModalScrollManager {
  private originalScrollY: number = 0;
  private isLocked: boolean = false;
  private isMobile: boolean = false;
  private touchStartY: number = 0;
  private preventTouch: boolean = false;

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
    if (this.isLocked) return;

    this.originalScrollY = window.pageYOffset;
    this.isLocked = true;

    if (this.isMobile) {
      // Mobile-specific scroll prevention
      this.lockMobile();
    } else {
      // Desktop scroll prevention
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
    document.addEventListener('touchstart', this.handleTouchStart, { passive: false });
    document.addEventListener('touchmove', this.handleTouchMove, { passive: false });
    
    // Add mobile-specific class for CSS targeting
    document.body.classList.add('modal-open-mobile');
  }

  private lockDesktop(): void {
    // Desktop approach with position fixed
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${this.originalScrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    
    // Compensate for scrollbar width to prevent layout shift
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Prevent wheel and keyboard scrolling
    document.addEventListener('wheel', this.handleWheel, { passive: false });
    document.addEventListener('keydown', this.handleKeydown, { passive: false });
    
    document.body.classList.add('modal-open-desktop');
  }

  unlock(): void {
    if (!this.isLocked) return;

    if (this.isMobile) {
      this.unlockMobile();
    } else {
      this.unlockDesktop();
    }

    this.isLocked = false;
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
    
    // ENHANCED: More reliable scroll position restoration with better mobile handling
    setTimeout(() => {
      requestAnimationFrame(() => {
        // Use multiple methods to ensure scroll restoration works
        window.scrollTo({ top: this.originalScrollY, behavior: 'instant' });
        document.documentElement.scrollTop = this.originalScrollY;
        document.body.scrollTop = this.originalScrollY;
        
        // Triple-check scroll restoration with fallback
        setTimeout(() => {
          const currentScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
          if (Math.abs(currentScroll - this.originalScrollY) > 5) {
            window.scrollTo({ top: this.originalScrollY, behavior: 'instant' });
            // Force scroll restoration if still not correct
            setTimeout(() => {
              window.scrollTo({ top: this.originalScrollY, behavior: 'instant' });
              // Trigger resize event to help components recalculate
              window.dispatchEvent(new Event('resize'));
            }, 100);
          }
        }, 50);
      });
    }, 10);
  }

  private unlockDesktop(): void {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    document.body.style.paddingRight = '';
    
    document.removeEventListener('wheel', this.handleWheel);
    document.removeEventListener('keydown', this.handleKeydown);
    
    document.body.classList.remove('modal-open-desktop');
    
    // Restore scroll position
    requestAnimationFrame(() => {
      window.scrollTo(0, this.originalScrollY);
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
      e.preventDefault();
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
        e.preventDefault();
        e.stopPropagation();
      }
    } else {
      // Always prevent scrolling outside modal on mobile
      e.preventDefault();
      e.stopPropagation();
    }
  }

  private handleWheel(e: WheelEvent): void {
    const target = e.target as HTMLElement;
    const modalContent = target.closest('[data-modal-content]');
    
    if (!modalContent) {
      e.preventDefault();
    }
  }

  private handleKeydown(e: KeyboardEvent): void {
    const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
    if (scrollKeys.includes(e.key)) {
      const target = e.target as HTMLElement;
      const modalContent = target.closest('[data-modal-content]');
      
      if (!modalContent) {
        e.preventDefault();
      }
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