import React, { useState } from 'react';
import axios from 'axios';
import './admin.css';
const apiUrl=process.env.REACT_APP_API_URL;
const UploadJson = () => {
  const [file, setFile] = useState(null);
  const [uploadResponse, setUploadResponse] = useState('');
  const [previewData, setPreviewData] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a JSON file.');
      return;
    }

    const formData = new FormData();
    formData.append('jsonfile', file);

    // Local preview for frontend display
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);
        const rows = jsonData.map(entry => ({
          college: entry.con,
          course: entry.brn,
          community: Object.keys(entry).filter(key =>
            ['OC', 'BC', 'BCM', 'MBC', 'SC', 'SCA', 'ST'].includes(key)
          ).map(comm => ({
            community: comm,
            min_cutoff: typeof entry[comm] === 'number' && entry[comm] < 1000 ? entry[comm] : null,
            max_rank: typeof entry[comm] === 'number' && entry[comm] >= 1000 ? entry[comm] : null,
          }))
        }));

        // Flatten the preview rows for display
        const tableData = [];
        rows.forEach(row => {
          row.community.forEach(commObj => {
            tableData.push({
              college: row.college,
              course: row.course,
              community: commObj.community,
              min_cutoff: commObj.min_cutoff || '',
              max_rank: commObj.max_rank || '',
            });
          });
        });

        setPreviewData(tableData);
      } catch (err) {
        console.error("Invalid JSON file", err);
        alert("Invalid JSON format");
      }
    };

    reader.readAsText(file);

    try {
      const res = await axios.post(`${apiUrl}/api/admin/uploads`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadResponse(res.data.message || 'Upload successful');
    } catch (err) {
      setUploadResponse('Error uploading file');
      console.log(err);
      
    }
  };

  return (
    <div className="Uploadjson-container">
      <h2 className='Uploadjson-Form'>Upload JSON File (Cutoff or Rank)</h2>
      <form  onSubmit={handleSubmit}>
        <input type="file" accept=".json" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>

      {uploadResponse && <p>{uploadResponse}</p>}

      {previewData.length > 0 && (
        <div className="college-course-table">
          <h3>Table</h3>
          <table border="1">
            <thead>
              <tr>
                <th>College</th>
                <th>Course</th>
                <th>Community</th>
                <th>Min Cutoff</th>
                <th>Max Rank</th>
              </tr>
            </thead>
            <tbody>
              {previewData.map((row, index) => (
                <tr key={index}>
                  <td>{row.college}</td>
                  <td>{row.course}</td>
                  <td>{row.community}</td>
                  <td>{row.min_cutoff}</td>
                  <td>{row.max_rank}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UploadJson;
