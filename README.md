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
  <ModalProvider>
    <App />
  </ModalProvider>
);
```

### App.tsx

```ts
import { ModalProps, useModal } from "react-easy-use-modal";
import ReactModal from "react-modal";

interface MyModalProps extends ModalProps {
  text: string;
}

const MyModal = ({ text, isOpen, onClose }: MyModalProps) => {
  return (
    <ReactModal isOpen={isOpen}>
      <p>{text}</p>
      <button onClick={onClose}>Close</button>
    </ReactModal>
  );
};

function App() {
  const { openModal } = useModal();

  const handleClick = () => {
    openModal<MyModalProps>({
      component: MyModal,
      props: {
        text: "Hello World!",
      },
    });
  };

  return <button onClick={handleClick}>Open Modal</button>;
}
```
