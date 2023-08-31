import React from 'react';
import FileUpload from '../components/Documents.tsx'


const Documents: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Documents</h1>
      <FileUpload onFileSelect={function (_file: string | ArrayBuffer | null): void {
        throw new Error('Function not implemented.');
      } } />

    </div>
  );
};

export default Documents;