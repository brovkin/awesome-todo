import { useEffect, useRef } from 'react';

function createRootElement(id: string) {
  const rootContainer = document.createElement('div');
  rootContainer.setAttribute('id', id);
  return rootContainer;
}

function addRootElement(rootElem: Element) {
  const app = document.getElementById('root')?.querySelector('.app');
  if (app) {
    app.appendChild(rootElem);
  }
}

function usePortal(id: string) {
  const rootElemRef = useRef<HTMLElement | null>(null);

  useEffect(
    function setupElement() {
      // Look for existing target dom element to append to
      const existingParent = document.querySelector(`#${id}`);
      // Parent is either a new root or the existing dom element
      const parentElem = existingParent || createRootElement(id);

      // If there is no existing DOM element, add a new one.
      if (!existingParent) {
        addRootElement(parentElem);
      }

      // Add the detached element to the parent
      if (rootElemRef.current) {
        parentElem.appendChild(rootElemRef.current);

        return function removeElement() {
          rootElemRef.current?.remove();
          if (!parentElem.childElementCount) {
            parentElem.remove();
          }
        };
      }
    },
    [id]
  );

  function getRootElem() {
    if (!rootElemRef.current) {
      rootElemRef.current = document.createElement('div');
    }
    return rootElemRef.current;
  }

  return getRootElem();
}

export default usePortal;
