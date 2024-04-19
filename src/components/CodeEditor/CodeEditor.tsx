import React from 'react';
import { Editor } from '@monaco-editor/react';
import FileTabs from './FileTabs';
import { getLanguageFromFileName } from './getLanguageFromFileName';
import { FileNode } from '@webcontainer/api';
import { useWebContainer } from '../../providers/WebContainerProvider/useWebContainer';

export default function CodeEditor() {
  const { template, webContainer } = useWebContainer();
  const [activeFile, setActiveFile] = React.useState(() => template.entry);

  const currentFile = template.files[activeFile] as FileNode;
  const language = getLanguageFromFileName(activeFile);

  const handleCodeChange = async (content: string) => {
    if (!webContainer) return;

    await webContainer.fs.writeFile(activeFile, content);
  };

  return (
    <div className="h-full">
      <FileTabs
        files={template.visibleFiles}
        activeFile={activeFile}
        onFileChange={setActiveFile}
      />
      <Editor
        theme="vs-dark"
        path={activeFile}
        onChange={(value) => handleCodeChange(value ?? '')}
        defaultValue={currentFile.file.contents as string} // Ideally, worry about the encoding in production, for our example, this is fine.
        defaultLanguage={language}
      />
    </div>
  );
}
