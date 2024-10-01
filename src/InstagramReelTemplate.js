import React, { useState } from 'react';

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
    const content = Object.entries(reelData)
      .map(([key, value]) => `${key.toUpperCase()}:\n${value}\n\n`)
      .join('');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'instagram_reel_script.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
          Download Reel Script
        </button>
      </form>
    </div>
  );
};

export default InstagramReelTemplate;
