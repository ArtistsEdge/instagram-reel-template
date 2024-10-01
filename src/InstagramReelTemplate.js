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
    
    // Set colors
    const primaryColor = '#06156E';
    const backgroundColor = '#FFFBF4';
    
    // Add background
    doc.setFillColor(backgroundColor);
    doc.rect(0, 0, 210, 297, 'F');
    
    // Set font styles
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(primaryColor);
    
    // Add title
    doc.text("Instagram Reel Script", 105, 20, null, null, "center");
    
    // Add content
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black text for content
    
    let yPos = 40;
    Object.entries(reelData).forEach(([key, value]) => {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(primaryColor);
      doc.text(key.toUpperCase() + ":", 20, yPos);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);
      const splitText = doc.splitTextToSize(value, 170);
      doc.text(splitText, 20, yPos + 7);
      yPos += 10 + (splitText.length * 7);
      
      // Add some spacing between sections
      yPos += 5;
      
      // Start a new page if we're running out of space
      if (yPos > 270) {
        doc.addPage();
        // Add background to new page
        doc.setFillColor(backgroundColor);
        doc.rect(0, 0, 210, 297, 'F');
        yPos = 20;
      }
    });
    
    // Add footer with website link
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(primaryColor);
    doc.text("Visit www.lucycorwin.com/learn for more insights on how to use AI in your content creation!", 105, 285, null, null, "center");
    
    // Save the PDF
    doc.save("instagram_reel_script.pdf");
  };

  return (
    <div style={{maxWidth: '800px', margin: '0 auto', padding: '20px', backgroundColor: '#FFFBF4'}}>
      <h1 style={{textAlign: 'center', color: '#06156E'}}>Instagram Reel Script Template</h1>
      <form>
        <div>
          <label style={{color: '#06156E'}}>Video Title:</label>
          <input
            type="text"
            name="title"
            value={reelData.title}
            onChange={handleInputChange}
            style={{width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #06156E'}}
          />
        </div>
        <div>
          <label style={{color: '#06156E'}}>Script:</label>
          <textarea
            name="script"
            value={reelData.script}
            onChange={handleInputChange}
            rows={4}
            style={{width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #06156E'}}
          />
        </div>
        <div>
          <label style={{color: '#06156E'}}>VoiceOver / Talking to Camera:</label>
          <textarea
            name="voiceOver"
            value={reelData.voiceOver}
            onChange={handleInputChange}
            rows={3}
            style={{width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #06156E'}}
          />
        </div>
        <div>
          <label style={{color: '#06156E'}}>B-Roll:</label>
          <textarea
            name="bRoll"
            value={reelData.bRoll}
            onChange={handleInputChange}
            rows={3}
            style={{width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #06156E'}}
          />
        </div>
        <div>
          <label style={{color: '#06156E'}}>On-Screen Text:</label>
          <textarea
            name="onScreenText"
            value={reelData.onScreenText}
            onChange={handleInputChange}
            rows={2}
            style={{width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #06156E'}}
          />
        </div>
        <div>
          <label style={{color: '#06156E'}}>Captions:</label>
          <textarea
            name="captions"
            value={reelData.captions}
            onChange={handleInputChange}
            rows={2}
            style={{width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #06156E'}}
          />
        </div>
        <div>
          <label style={{color: '#06156E'}}>Hashtags:</label>
          <input
            type="text"
            name="hashtags"
            value={reelData.hashtags}
            onChange={handleInputChange}
            style={{width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #06156E'}}
          />
        </div>
        <button 
          type="button" 
          onClick={handleSave} 
          style={{
            width: '100%', 
            padding: '10px', 
            backgroundColor: '#06156E', 
            color: '#FFFBF4', 
            border: 'none', 
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          Download Reel Script as PDF
        </button>
      </form>
    </div>
  );
};

export default InstagramReelTemplate;
