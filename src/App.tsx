import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import CodeEditor from './components/CodeEditor';
import WebContainerProvider from './providers/WebContainerProvider';
import { VITE_REACT_TEMPLATE } from './templates/react-vite';
import Terminal from './components/Terminal';
import Preview from './components/Preview';

export default function App() {
  return (
    <WebContainerProvider template={VITE_REACT_TEMPLATE}>
      <div className="h-dvh p-2">
        <PanelGroup direction="horizontal">
          <Panel>
            <PanelGroup direction="vertical">
              <Panel>
                <CodeEditor />
              </Panel>
              <PanelResizeHandle className="h-2 bg-blue-300" />
              <Panel>
                <Terminal />
              </Panel>
            </PanelGroup>
          </Panel>
          <PanelResizeHandle className="w-2 bg-blue-300" />
          <Panel>
            <Preview />
          </Panel>
        </PanelGroup>
      </div>
    </WebContainerProvider>
  );
}
