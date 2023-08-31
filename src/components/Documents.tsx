import React, { ChangeEvent, FC } from 'react';

interface FileUploadProps {
  onFileSelect: (file: string | ArrayBuffer | null) => void;
}

const FileUpload: FC<FileUploadProps> = ({ onFileSelect }) => {
  const fileInput = React.createRef<HTMLInputElement>();

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    // handle validations
    const file = e.target.files ? e.target.files[0] : null;
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onloadend = () => {
        // call the onFileSelect function and pass the encoded file string
        onFileSelect(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      // Handle errors here
      console.log("File not supported");
    }
  };

  return (
    <div>
      <input type="file" ref={fileInput} onChange={handleFileInput} />
      <button onClick={() => fileInput.current && fileInput.current.click()}>
        Upload Resume
      </button>
    </div>
  );
};

export default FileUpload;
