import React from 'react';
import { FileSystemTree, WebContainer } from '@webcontainer/api';

export const WebContainerContext = React.createContext<WebContainer | null>(
  null,
);

type WebContainerProviderProps = {
  files: FileSystemTree;
};

export default function WebContainerProvider({
  files,
  children,
}: React.PropsWithChildren<WebContainerProviderProps>) {
  const [webContainer, setWebContainer] = React.useState<WebContainer | null>(
    null,
  );

  React.useEffect(() => {
    let instance: WebContainer | null = null;
    const initWebContainer = async () => {
      try {
        instance = await WebContainer.boot();
        await instance.mount(files);
        setWebContainer(instance);
      } catch (e) {
        console.log(e);
      }
    };

    initWebContainer();

    // Ideally, we should clean up the WebContainer instance when the component is unmounted.
    // But there is an issue with the current implementation of WebContainer that prevents it from being torn down.
    // https://github.com/stackblitz/webcontainer-core/issues/1125
    // return () => {
    //   instance?.teardown();
    //   setWebContainer(null);
    // };
  }, [files]);

  return (
    <WebContainerContext.Provider value={webContainer}>
      {children}
    </WebContainerContext.Provider>
  );
}
