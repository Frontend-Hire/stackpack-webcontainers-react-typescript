import React from 'react';
import { Terminal as XTerminal } from '@xterm/xterm';
import { FitAddon } from 'xterm-addon-fit';
import '@xterm/xterm/css/xterm.css';
import { useWebContainer } from '../../providers/WebContainerProvider/useWebContainer';

export default function Terminal() {
  const { webContainer } = useWebContainer();
  const [terminal, setTerminal] = React.useState<XTerminal | null>(null);
  const terminalRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const terminal = new XTerminal({ convertEol: true });
    const fitAddon = new FitAddon();

    terminal.loadAddon(fitAddon);
    terminal.open(terminalRef.current!);
    fitAddon.fit();

    setTerminal(terminal);

    return () => {
      terminal.dispose();
      setTerminal(null);
    };
  }, [terminalRef]);

  React.useEffect(() => {
    if (!webContainer || !terminal) return;

    const startShell = async () => {
      const shellProcess = await webContainer.spawn('jsh', {
        terminal: {
          cols: terminal.cols,
          rows: terminal.rows,
        },
      });
      shellProcess.output.pipeTo(
        new WritableStream({
          write(data) {
            terminal.write(data);
          },
        }),
      );

      const input = shellProcess.input.getWriter();
      terminal.onData((data) => {
        input.write(data);
      });

      return shellProcess;
    };

    startShell();
  }, [webContainer, terminal]);

  return (
    <div className="h-full border bg-red-100">
      <div className="h-full w-full" ref={terminalRef} />
    </div>
  );
}
