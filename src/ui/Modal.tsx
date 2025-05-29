import {
  cloneElement,
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import type { ReactNode, ReactElement } from "react";
import { createPortal } from "react-dom";

// 1. Define TypeScript interfaces for type safety
interface ModalContextType {
  close: () => void;
  openName: string;
  open: (name: string) => void;
}

interface ModalProps {
  children: ReactNode;
}

interface OpenProps {
  children: ReactElement<any>; // More flexible typing for cloneElement
  opens: string;
}

interface WindowProps {
  children: ReactNode;
  name: string;
}

// 2. Create context with proper typing
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// 3. Custom hook for using the modal context
const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a Modal provider");
  }
  return context;
};

// 4. Custom hook for outside click detection
const useOutsideClick = (handler: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClick, true);
    return () => document.removeEventListener("mousedown", handleClick, true);
  }, [handler]);

  return ref;
};

// 5. Main Modal component
const Modal: React.FC<ModalProps> & {
  Open: React.FC<OpenProps>;
  Window: React.FC<WindowProps>;
} = ({ children }) => {
  const [openName, setOpenName] = useState<string>("");

  const close = (): void => setOpenName("");
  const open = (name: string): void => setOpenName(name);

  return (
    <ModalContext.Provider value={{ close, openName, open }}>
      {children}
    </ModalContext.Provider>
  );
};

// 6. Open component - triggers modal opening
function Open({ children, opens }: OpenProps): ReactElement {
  const { open } = useModal();

  return cloneElement(children, {
    onClick: () => open(opens),
  });
}

// 7. Window component - the actual modal content
function Window({ children, name }: WindowProps): ReactElement | null {
  const { openName, close } = useModal();
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={ref}
        className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl"
      >
        {/* Close button */}
        <button
          onClick={close}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        >
          ×
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}

// 8. Attach sub-components to main component
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
