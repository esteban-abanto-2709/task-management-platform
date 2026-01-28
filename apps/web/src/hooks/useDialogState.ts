import { useState, useCallback } from "react";

/**
 * Hook para manejar el estado de apertura/cierre de diálogos y modales.
 *
 * @example
 * const dialog = useDialogState();
 *
 * <Dialog open={dialog.isOpen} onOpenChange={dialog.setIsOpen}>
 *   <DialogTrigger asChild>
 *     <Button onClick={dialog.open}>Open</Button>
 *   </DialogTrigger>
 *   <DialogContent>
 *     <Button onClick={dialog.close}>Close</Button>
 *   </DialogContent>
 * </Dialog>
 */
export function useDialogState(defaultOpen = false) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return {
    isOpen,
    setIsOpen,
    open,
    close,
    toggle,
  };
}
