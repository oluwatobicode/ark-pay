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

interface ModalContextType {
  close: () => void;
  openName: string;
  open: (name: string) => void;
}

interface ModalProps {
  children: ReactNode;
}

interface OpenProps {
  children: ReactElement<any>;
  opens: string;
}

interface WindowProps {
  children: ReactNode;
  name: string;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a Modal provider");
  }
  return context;
};

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

const Modal: React.FC<ModalProps> & {
  Open: React.FC<OpenProps>;
  Window: React.FC<WindowProps>;
} = ({ children }) => {
  const [openName, setOpenName] = useState<string>("");

  const close = (): void => setOpenName("");
  const open = (name: string): void => setOpenName(name);

  useEffect(() => {
    if (openName) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [openName]);

  return (
    <ModalContext.Provider value={{ close, openName, open }}>
      {children}
    </ModalContext.Provider>
  );
};

function Open({ children, opens }: OpenProps): ReactElement {
  const { open } = useModal();

  return cloneElement(children, {
    onClick: (e: MouseEvent) => {
      e.preventDefault();
      open(opens);
    },
  });
}

function Window({ children, name }: WindowProps): ReactElement | null {
  const { openName, close } = useModal();
  const ref = useOutsideClick(close);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    if (name === openName) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [name, openName, close]);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed inset-0 w-full h-screen transition-all duration-500 bg-[#0000004D] backdrop-blur-[4px] z-[1000] flex items-center justify-center p-4">
      <div
        ref={ref}
        className="bg-white p-4 sm:p-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:w-[497.31px] min-h-[280px] sm:min-h-[300px] md:min-h-[400px] max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-[36.15px] shadow-xl transform transition-all duration-300 scale-100 flex flex-col items-center justify-center"
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
