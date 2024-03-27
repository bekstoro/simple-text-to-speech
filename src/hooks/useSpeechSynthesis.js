import {
  useCallback,
  useEffect,
  useState,
} from 'react';

export const useSpeechSynthesis = (props) => {
  const {
    pitch,
    rate,
    text,
    voice,
    volume,
  } = props;
  
  const [paused, setPaused] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  const [voices, setVoices] = useState([]);
  
  const getVoices = () => {
    const options = window.speechSynthesis.getVoices();
    if (options.length > 0) {
      setVoices(options)
    } else {
      window.speechSynthesis.onvoiceschanged = (event) => {
        setVoices(event.target.getVoices());
      };
    }
  };
  
  useEffect(() => {
    if (
      typeof window !== 'undefined'
      && 'speechSynthesis' in window
      && !supported
    ) {
      setSupported(true);
      getVoices();
    }
  }, []);
  
  const parseText = useCallback((textToParse) => {
    return textToParse;
  }, []);
  
  const build = () => {
    const utterance = new SpeechSynthesisUtterance();
    utterance.voice = voice ?? voices[0];
    utterance.volume = volume;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.text = parseText(text);
    utterance.onend = () => {
      console.info('speaking finished!');
      setSpeaking(false);
    }
    return utterance;
  };

  const stop = () => {
    if (!supported) return;

    setSpeaking(false);
    window?.speechSynthesis?.cancel();
  };

  const pause = () => {
    if (!supported) return;

    setPaused(true);
    window?.speechSynthesis?.pause();
  };

  const play = () => {
    if (!supported) return;

    stop();
    setSpeaking(true);
    const utterance = build();
    window?.speechSynthesis?.speak(utterance);
  };

  const resume = () => {
    if (!supported) return;

    setPaused(false);
    window?.speechSynthesis?.resume();
  };
  
  return {
    pause,
    paused,
    play,
    resume,
    speaking,
    stop,
    voices,
  };
};
