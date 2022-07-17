# react-easy-use-modal

> Easily handle the state of the modal.

## Installation

```bash
$ npm install --save react-easy-use-modal
$ yarn add react-easy-use-modal
```

## Usage

### index.tsx

```ts
import ReactDOM from "react-dom/client";
import { ModalProvider } from "react-easy-use-modal";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  // Wrap the App with ModalProvider
  <ModalProvider>
    <App />
  </ModalProvider>
);
```

### App.tsx

```ts
import { useModal } from "react-easy-use-modal";
import ReactModal from "react-modal";

interface IMyModalProps {
  // Component props
  text: string;

  // Reserved props
  isOpen: boolean;
  onClose: () => void;
}

const MyModal = ({ text, isOpen, onClose }: IMyModalProps) => {
  return (
    <ReactModal isOpen={isOpen}>
      <span>{text}</span>
      <button onClick={onClose}>close</button>
    </ReactModal>
  );
};

function App() {
  const { openModal } = useModal();

  const handleClick = () => {
    openModal<IMyModalProps>({
      Component: MyModal,
      props: {
        text: "Hello world!",
      },
    });
  };

  return <button onClick={handleClick}>Open Modal</button>;
}
```
