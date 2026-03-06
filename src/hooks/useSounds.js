import { useRef, useCallback } from 'react';

// Хук для управления звуками игры
export const useSounds = () => {
  const soundsRef = useRef({
    correctAnswer: null,
    wrongAnswer: null,
    openCard: null,
    roundStart: null,
    victory: null,
    tick: null,
    finalMusic: null,
    drumroll: null
  });

  // Инициализация звуков
  const initSounds = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      // Правильный ответ (открытие карточки)
      soundsRef.current.correctAnswer = new Audio('/sounds/correct.mp3');
      soundsRef.current.correctAnswer.volume = 0.5;

      // Неправильный ответ (ошибка)
      soundsRef.current.wrongAnswer = new Audio('/sounds/wrong.mp3');
      soundsRef.current.wrongAnswer.volume = 0.6;

      // Открытие карточки
      soundsRef.current.openCard = new Audio('/sounds/flip.mp3');
      soundsRef.current.openCard.volume = 0.4;

      // Начало раунда
      soundsRef.current.roundStart = new Audio('/sounds/round-start.mp3');
      soundsRef.current.roundStart.volume = 0.5;

      // Победа
      soundsRef.current.victory = new Audio('/sounds/victory.mp3');
      soundsRef.current.victory.volume = 0.6;

      // Тик таймера
      soundsRef.current.tick = new Audio('/sounds/tick.mp3');
      soundsRef.current.tick.volume = 0.3;

      // Музыка финального раунда
      soundsRef.current.finalMusic = new Audio('/sounds/final-music.mp3');
      soundsRef.current.finalMusic.volume = 0.3;
      soundsRef.current.finalMusic.loop = true;

      // Барабанная дробь (для раскрытия результатов)
      soundsRef.current.drumroll = new Audio('/sounds/drumroll.mp3');
      soundsRef.current.drumroll.volume = 0.4;
    } catch (error) {
      console.warn('Не удалось загрузить звуки:', error);
    }
  }, []);

  // Воспроизведение звука
  const playSound = useCallback((soundName) => {
    try {
      const sound = soundsRef.current[soundName];
      if (sound) {
        sound.currentTime = 0;
        sound.play().catch(e => console.warn('Ошибка воспроизведения:', e));
      }
    } catch (error) {
      console.warn('Ошибка при воспроизведении звука:', error);
    }
  }, []);

  // Остановка звука
  const stopSound = useCallback((soundName) => {
    try {
      const sound = soundsRef.current[soundName];
      if (sound) {
        sound.pause();
        sound.currentTime = 0;
      }
    } catch (error) {
      console.warn('Ошибка при остановке звука:', error);
    }
  }, []);

  // Остановка всех звуков
  const stopAllSounds = useCallback(() => {
    Object.values(soundsRef.current).forEach(sound => {
      if (sound) {
        sound.pause();
        sound.currentTime = 0;
      }
    });
  }, []);

  return {
    initSounds,
    playSound,
    stopSound,
    stopAllSounds
  };
};

// Синтезированные звуки (если нет файлов)
export const useSynthSounds = () => {
  const audioContext = useRef(null);

  const initAudioContext = useCallback(() => {
    if (typeof window === 'undefined') return;
    audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
  }, []);

  // Звук правильного ответа (восходящий тон)
  const playCorrectSound = useCallback(() => {
    if (!audioContext.current) initAudioContext();
    const ctx = audioContext.current;
    
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.setValueAtTime(523, ctx.currentTime); // C5
    oscillator.frequency.exponentialRampToValueAtTime(784, ctx.currentTime + 0.1); // G5
    
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.2);
  }, [initAudioContext]);

  // Звук ошибки (низкий гудок)
  const playWrongSound = useCallback(() => {
    if (!audioContext.current) initAudioContext();
    const ctx = audioContext.current;
    
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.setValueAtTime(200, ctx.currentTime);
    oscillator.type = 'sawtooth';
    
    gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.3);
  }, [initAudioContext]);

  // Звук открытия карточки (короткий клик)
  const playFlipSound = useCallback(() => {
    if (!audioContext.current) initAudioContext();
    const ctx = audioContext.current;
    
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.setValueAtTime(800, ctx.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.05);
  }, [initAudioContext]);

  // Звук тика таймера
  const playTickSound = useCallback(() => {
    if (!audioContext.current) initAudioContext();
    const ctx = audioContext.current;
    
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.setValueAtTime(1000, ctx.currentTime);
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.03);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.03);
  }, [initAudioContext]);

  // Звук победы (фанфары)
  const playVictorySound = useCallback(() => {
    if (!audioContext.current) initAudioContext();
    const ctx = audioContext.current;
    
    const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
    
    notes.forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.15);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.15);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.15 + 0.3);
      
      oscillator.start(ctx.currentTime + i * 0.15);
      oscillator.stop(ctx.currentTime + i * 0.15 + 0.3);
    });
  }, [initAudioContext]);

  return {
    playCorrectSound,
    playWrongSound,
    playFlipSound,
    playTickSound,
    playVictorySound
  };
};
