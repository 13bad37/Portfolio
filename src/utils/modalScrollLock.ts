// Mobile-friendly modal scroll management
class ModalScrollManager {
  private originalScrollY: number = 0;
  private isLocked: boolean = false;
  private originalOverflow: string = '';
  private originalPosition: string = '';
  
  lock(): void {
    if (this.isLocked) return;
    
    // Store current scroll position and body styles
    this.originalScrollY = window.pageYOffset;
    this.originalOverflow = document.body.style.overflow;
    this.originalPosition = document.body.style.position;
    
    // Prevent scrolling without breaking mobile layout
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${this.originalScrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.classList.add('modal-open');
    
    this.isLocked = true;
  }
  
  unlock(): void {
    if (!this.isLocked) return;
    
    // Restore body styles
    document.body.classList.remove('modal-open');
    document.body.style.overflow = this.originalOverflow;
    document.body.style.position = this.originalPosition;
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    
    // Restore scroll position smoothly without rubber band
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: this.originalScrollY,
          behavior: 'instant'
        });
      });
    });
    
    this.isLocked = false;
  }
  
  isScrollLocked(): boolean {
    return this.isLocked;
  }
}

export const modalScrollManager = new ModalScrollManager();