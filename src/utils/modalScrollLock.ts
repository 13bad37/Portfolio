// Apple-style modal scroll management - flawless UX
class ModalScrollManager {
  private originalScrollY: number = 0;
  private isLocked: boolean = false;
  
  lock(): void {
    if (this.isLocked) return;
    
    // Store the current scroll position
    this.originalScrollY = window.pageYOffset;
    
    // Add modal-open class to body for CSS-based scroll prevention
    document.body.classList.add('modal-open');
    document.body.style.top = `-${this.originalScrollY}px`;
    
    this.isLocked = true;
  }
  
  unlock(): void {
    if (!this.isLocked) return;
    
    // Remove modal-open class
    document.body.classList.remove('modal-open');
    document.body.style.top = '';
    
    // Restore scroll position smoothly without rubber band
    window.scrollTo(0, this.originalScrollY);
    
    this.isLocked = false;
  }
  
  isScrollLocked(): boolean {
    return this.isLocked;
  }
}

export const modalScrollManager = new ModalScrollManager();