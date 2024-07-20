import React, { useState, useEffect } from 'react';

const emotions = {
  Anger: {
    Soft: {
      states: ['Annoyed', 'Frustrated', 'Impatient'],
      definition: "Mild irritation or dissatisfaction that doesn't significantly impact your overall mood.",
       question: "What must be protected? What must be restored?"
    },
    'Mood-State': {
      states: ['Angry', 'Exasperated', 'Irritated'],
      definition: "A noticeable feeling of displeasure or hostility, affecting your mood and interactions.",
       question: "What must be protected? What must be restored?"
    },
    Intense: {
      states: ['Furious', 'Outraged', 'Livid'],
      definition: "An overwhelming feeling of rage that significantly impacts your thoughts and actions.",
       question: "What must be protected? What must be restored?"
    }
  },
  Sadness: {
    Soft: {
      states: ['Disappointed', 'Low', 'Wistful'],
      definition: "A gentle feeling of letdown or melancholy, not severely impacting your daily activities.",
      question: "What must be released?"
    },
    'Mood-State': {
      states: ['Sad', 'Gloomy', 'Dejected'],
      definition: "A persistent feeling of unhappiness that noticeably affects your mood and outlook.",
      question: "What must be released?"
    },
    Intense: {
      states: ['Grief-stricken', 'Heartbroken', 'Despairing'],
      definition: "An overwhelming sense of loss or sorrow that significantly impacts your ability to function normally.",
      question: "What must be released?"
    }
  },
  Happiness: {
    Soft: {
      states: ['Content', 'Pleased', 'Satisfied'],
      definition: "A gentle sense of well-being and satisfaction with your current situation.",
      question:"Have I showed gratitude for this moment? "
    },
    'Mood-State': {
      states: ['Happy', 'Cheerful', 'Joyful'],
      definition: "A noticeable feeling of pleasure and positivity that brightens your overall mood.",
      question: "Have I thanked myself or those that put me in this position?"
    },
    Intense: {
      states: ['Elated', 'Ecstatic', 'Overjoyed'],
      definition: "An overwhelming sense of joy and excitement that significantly boosts your energy and outlook.",
      question: "Have you taken time to absorb this moment to the fullest?"
    }
  },
  Fear: {
    Soft: {
      states: ['Cautious', 'Nervous', 'Uneasy'],
      definition: "A mild sense of apprehension or concern about potential risks or uncertainties.",
      question: "What action should be taken to get out of this danger?"
    },
    'Mood-State': {
      states: ['Anxious', 'Scared', 'Frightened'],
      definition: "A noticeable feeling of worry or alarm that affects your thoughts and behavior.",
      question: "What triggered this feeling? What really needs to get done?"
    },
    Intense: {
      states: ['Terrified', 'Panicked', 'Petrified'],
      definition: "An overwhelming sense of fear that significantly impacts your ability to think or act rationally.",
      question: "What has been betrayed? What must be healed and restored?"
    }
  }
};

const EmotionLogger = () => {
    const [selectedEmotion, setSelectedEmotion] = useState('');
    const [intensity, setIntensity] = useState(50);
    const [intensityDescription, setIntensityDescription] = useState('');
    const [emotionDefinition, setEmotionDefinition] = useState('');
    const [emotionQuestion, setEmotionQuestion] = useState('');
    const [stimulus, setStimulus] = useState('');
    const [questionResponse, setQuestionResponse] = useState('');
    const [action, setAction] = useState('');
    const [isActionValid, setIsActionValid] = useState(true);
    const [reflectionSentence, setReflectionSentence] = useState('');
  
    useEffect(() => {
      updateIntensityDescription();
      updateReflectionSentence();
    }, [selectedEmotion, intensity, stimulus, questionResponse, action, isActionValid]);
  
    const updateIntensityDescription = () => {
      if (!selectedEmotion) return;
  
      let category;
      if (intensity <= 33) category = 'Soft';
      else if (intensity <= 66) category = 'Mood-State';
      else category = 'Intense';
  
      const options = emotions[selectedEmotion][category].states;
      const index = Math.min(Math.floor((intensity % 33) / 11), options.length - 1);
      setIntensityDescription(options[index]);
      setEmotionDefinition(emotions[selectedEmotion][category].definition);
      setEmotionQuestion(emotions[selectedEmotion][category].question);
    };
  
    const updateReflectionSentence = () => {
      let sentence = "I am ";
      if (selectedEmotion) {
        sentence += `feeling ${selectedEmotion.toLowerCase()} and ${intensityDescription.toLowerCase()}`;
        if (stimulus) {
          sentence += ` because ${stimulus}. `;
        }
        if (questionResponse) {
          sentence += `Upon reflection, I realize that ${questionResponse}. `;
        }
        if (action) {
          if (isActionValid) {
            sentence += `I plan to take action by ${action}.`;
          } else {
            sentence += `I've decided not to act because the stimulus is invalid.`;
          }
        }
      } else {
        sentence += "...";
      }
      setReflectionSentence(sentence);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Logged:', { 
        emotion: selectedEmotion, 
        intensity, 
        description: intensityDescription, 
        stimulus,
        questionResponse,
        action,
        isActionValid
      });
      // Here you would typically send this data to your backend
    };
  
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <h2>Emotion Reflection Process</h2>
        <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', padding: '10px', backgroundColor: '#e9ecef', borderRadius: '5px' }}>
          {reflectionSentence}
        </p>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label>
              Emotion:
              <select 
                value={selectedEmotion} 
                onChange={(e) => setSelectedEmotion(e.target.value)}
                style={{ marginLeft: '10px', padding: '5px' }}
              >
                <option value="">Select an emotion</option>
                {Object.keys(emotions).map(emotion => (
                  <option key={emotion} value={emotion}>{emotion}</option>
                ))}
              </select>
            </label>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>
              Intensity:
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={intensity} 
                onChange={(e) => setIntensity(Number(e.target.value))} 
                style={{ width: '100%', marginTop: '10px' }}
              />
              <span style={{ display: 'block', textAlign: 'center' }}>{intensity}</span>
            </label>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>
              Stimulus (What happened?):
              <input 
                type="text" 
                value={stimulus} 
                onChange={(e) => setStimulus(e.target.value)}
                style={{ width: '100%', padding: '5px', marginTop: '5px' }}
              />
            </label>
          </div>
          {emotionQuestion && (
            <div style={{ marginBottom: '20px' }}>
              <label>
                {emotionQuestion}
                <textarea 
                  value={questionResponse} 
                  onChange={(e) => setQuestionResponse(e.target.value)}
                  style={{ width: '100%', padding: '5px', marginTop: '5px' }}
                  rows="3"
                />
              </label>
            </div>
          )}
          <div style={{ marginBottom: '20px' }}>
            <label>
              Planned Action:
              <textarea 
                value={action} 
                onChange={(e) => setAction(e.target.value)}
                style={{ width: '100%', padding: '5px', marginTop: '5px' }}
                rows="3"
              />
            </label>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>
              <input 
                type="checkbox" 
                checked={isActionValid} 
                onChange={(e) => setIsActionValid(e.target.checked)}
              />
              This action is valid based on the stimulus
            </label>
          </div>
          {intensityDescription && (
            <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
              <strong>Current Emotional State:</strong> {intensityDescription}
              <p style={{ marginTop: '10px' }}><strong>Definition:</strong> {emotionDefinition}</p>
            </div>
          )}
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Log Emotion</button>
        </form>
      </div>
    );
  };
  
  export default EmotionLogger;