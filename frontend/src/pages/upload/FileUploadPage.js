import React, { useState } from 'react';

const FileUpload = () => {
    const [jsonData, setJsonData] = useState(null);

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && file.type === 'application/json') {
            const reader = new FileReader();
            reader.onload = (e) => {
                setJsonData(JSON.parse(e.target.result));
            };
            reader.readAsText(file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{
                border: '2px dashed #007bff',
                borderRadius: '5px',
                padding: '20px',
                textAlign: 'center',
                margin: '20px 0'
            }}
        >
            <p>Arrastra y suelta tu archivo JSON aquí</p>
            {jsonData && <pre>{JSON.stringify(jsonData, null, 2)}</pre>}
        </div>
    );
};

const FileUploadPage = () => {
    return (
        <main className="container">
            <h1>Carga de Archivos JSON</h1>
            <FileUpload />
        </main>
    );
};

export default FileUploadPage;
