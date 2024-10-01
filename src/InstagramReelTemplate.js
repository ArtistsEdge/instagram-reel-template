import React, { useState } from 'react';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

const InstagramReelTemplate = () => {
  const [reelData, setReelData] = useState({
    title: '',
    script: '',
    voiceOver: '',
    bRoll: '',
    onScreenText: '',
    captions: '',
    hashtags: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReelData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = () => {
    const doc = new jsPDF();
    
    // Set font styles
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    
    // Add title
    doc.text("Instagram Reel Script", 105, 15, null, null, "center");
    
    // Add content
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    
    let yPos = 30;
    Object.entries(reelData).forEach(([key, value]) => {
      doc.setFont("helvetica", "bold");
      doc.text(key.toUpperCase() + ":", 10, yPos);
      doc.setFont("helvetica", "normal");
      const splitText = doc.splitTextToSize(value, 180);
      doc.text(splitText, 10, yPos + 7);
      yPos += 10 + (splitText.length * 7);
      
      // Add some spacing between sections
      yPos += 5;
      
      // Start a new page if we're running out of space
      if (yPos > 280) {
        doc.addPage();
        yPos = 20;
      }
    });
    
    // Save the PDF
    doc.save("instagram_reel_script.pdf");
  };

  return (
    <div style={{maxWidth: '800px', margin: '0 auto', padding: '20px'}}>
      <h1 style={{textAlign: 'center'}}>Instagram Reel Script Template</h1>
      <form>
        <div>
          <label>Video Title:</label>
          <input
            type="text"
            name="title"
            value={reelData.title}
            onChange={handleInputChange}
            style={{width: '100%', padding: '8px', marginBottom: '10px'}}
          />
        </div>
        <div>
          <label>Script:</label>
          <textarea
            name="script"
            value={reelData.script}
            onChange={handleInputChange}
            rows={4}
            style={{width: '100%', padding: '8px', marginBottom: '10px'}}
          />
        </div>
        <div>
          <label>VoiceOver / Talking to Camera:</label>
          <textarea
            name="voiceOver"
            value={reelData.voiceOver}
            onChange={handleInputChange}
            rows={3}
            style={{width: '100%', padding: '8px', marginBottom: '10px'}}
          />
        </div>
        <div>
          <label>B-Roll:</label>
          <textarea
            name="bRoll"
            value={reelData.bRoll}
            onChange={handleInputChange}
            rows={3}
            style={{width: '100%', padding: '8px', marginBottom: '10px'}}
          />
        </div>
        <div>
          <label>On-Screen Text:</label>
          <textarea
            name="onScreenText"
            value={reelData.onScreenText}
            onChange={handleInputChange}
            rows={2}
            style={{width: '100%', padding: '8px', marginBottom: '10px'}}
          />
        </div>
        <div>
          <label>Captions:</label>
          <textarea
            name="captions"
            value={reelData.captions}
            onChange={handleInputChange}
            rows={2}
            style={{width: '100%', padding: '8px', marginBottom: '10px'}}
          />
        </div>
        <div>
          <label>Hashtags:</label>
          <input
            type="text"
            name="hashtags"
            value={reelData.hashtags}
            onChange={handleInputChange}
            style={{width: '100%', padding: '8px', marginBottom: '10px'}}
          />
        </div>
        <button type="button" onClick={handleSave} style={{width: '100%', padding: '10px', backgroundColor: '#3498db', color: 'white', border: 'none', cursor: 'pointer'}}>
          Download Reel Script as PDF
        </button>
      </form>
    </div>
  );
};

export default InstagramReelTemplate;
