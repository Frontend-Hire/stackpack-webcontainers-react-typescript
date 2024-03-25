import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

export default function App() {
  return (
    <div className="h-dvh p-2">
      <PanelGroup direction="horizontal">
        <Panel>
          <PanelGroup direction="vertical">
            <Panel>
              <div className="border">Code Editor</div>
            </Panel>
            <PanelResizeHandle className="h-2 bg-blue-300" />
            <Panel>
              <div className="border">Terminal</div>
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle className="w-2 bg-blue-300" />
        <Panel>
          <div className="border">Preview</div>
        </Panel>
      </PanelGroup>
    </div>
  );
}
