import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState([{ ID: '', Name: '', DOB: '' }]);

  const handleChange = (index, event) => {
    const values = [...formData];
    values[index][event.target.name] = event.target.value;
    setFormData(values);
  };

  const handleAddRow = () => {
    setFormData([...formData, { ID: '', Name: '', DOB: '' }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:3000/convert-to-excel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data.xlsx'); // The file name
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  return (
    <div className="App">
      <h1>Convert JSON to Excel</h1>
      <form onSubmit={handleSubmit}>
        {formData.map((item, index) => (
          <div key={index}>
            <input
              type="text"
              name="ID"
              placeholder="ID"
              value={item.ID}
              onChange={(e) => handleChange(index, e)}
              required
            />
            <input
              type="text"
              name="Name"
              placeholder="Name"
              value={item.Name}
              onChange={(e) => handleChange(index, e)}
              required
            />
            <input
              type="date"
              name="DOB"
              placeholder="Date of Birth"
              value={item.DOB}
              onChange={(e) => handleChange(index, e)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddRow}>
          Add Row
        </button>
        <button type="submit">Convert to Excel</button>
      </form>
    </div>
  );
}

export default App;
