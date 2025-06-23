import { useState, createContext, useContext } from 'react'
import { Dialog } from 'radix-ui';


let DialogContext = createContext();


export function useDialogProvider() {
  return useContext( DialogContext )
}


export default function DialogProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(null);

  function showDialog( newContent ) {
    setContent(() => newContent);
    setOpen(true);
  }

  function hideDialog() {
    setOpen(false);
    setContent(null);
  }

  return (
    <DialogContext.Provider value={{ showDialog, hideDialog }}>
      {children}

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog__overlay" />
          <Dialog.Content className="dialog__content">
            <div className="dialog__topbar">
              <Dialog.Close asChild>
                <button className="dialog__close-btn">✖</button>
              </Dialog.Close>
            </div>

            <Dialog.Title className='dialog__title'>
              { content?.title }
            </Dialog.Title>

            <div>{ content?.content }</div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </DialogContext.Provider>
  )
}
