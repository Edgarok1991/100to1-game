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

// Синтезированные звуки в стиле "100 к 1"
export const useSynthSounds = () => {
  const audioContext = useRef(null);

  const initAudioContext = useCallback(() => {
    if (typeof window === 'undefined') return;
    audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
  }, []);

  // Звук правильного ответа - характерный "ДЗИНЬ!" как в ТВ
  const playCorrectSound = useCallback(() => {
    if (!audioContext.current) initAudioContext();
    const ctx = audioContext.current;
    
    // Создаём характерный звук колокольчика с гармониками
    const frequencies = [1047, 1319, 1568]; // C6, E6, G6 - мажорное трезвучие
    
    frequencies.forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime);
      oscillator.type = 'sine';
      
      // Быстрая атака и медленное затухание (как у колокольчика)
      const volume = 0.25 / (i + 1); // Каждая гармоника тише
      gainNode.gain.setValueAtTime(volume, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.4);
    });

    // Добавляем "блеск" - высокую гармонику
    const sparkle = ctx.createOscillator();
    const sparkleGain = ctx.createGain();
    sparkle.connect(sparkleGain);
    sparkleGain.connect(ctx.destination);
    sparkle.frequency.setValueAtTime(2093, ctx.currentTime); // C7
    sparkle.type = 'sine';
    sparkleGain.gain.setValueAtTime(0.1, ctx.currentTime);
    sparkleGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    sparkle.start(ctx.currentTime);
    sparkle.stop(ctx.currentTime + 0.2);
  }, [initAudioContext]);

  // Звук ошибки - знаменитый "КРЕСТ" (X)
  const playWrongSound = useCallback(() => {
    if (!audioContext.current) initAudioContext();
    const ctx = audioContext.current;
    
    // Создаём резкий, неприятный звук зуммера
    const oscillator1 = ctx.createOscillator();
    const oscillator2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Два диссонирующих тона для "жужжащего" эффекта
    oscillator1.frequency.setValueAtTime(165, ctx.currentTime); // E3
    oscillator2.frequency.setValueAtTime(175, ctx.currentTime); // Чуть выше для биений
    
    oscillator1.type = 'sawtooth';
    oscillator2.type = 'square';
    
    // Громко и резко
    gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.15);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    
    oscillator1.start(ctx.currentTime);
    oscillator2.start(ctx.currentTime);
    oscillator1.stop(ctx.currentTime + 0.5);
    oscillator2.stop(ctx.currentTime + 0.5);
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

  // Звук победы - торжественные фанфары
  const playVictorySound = useCallback(() => {
    if (!audioContext.current) initAudioContext();
    const ctx = audioContext.current;
    
    // Торжественная фанфара в стиле "100 к 1"
    const melody = [
      { freq: 523, time: 0 },      // C5
      { freq: 659, time: 0.2 },    // E5
      { freq: 784, time: 0.4 },    // G5
      { freq: 1047, time: 0.6 },   // C6 - кульминация
      { freq: 784, time: 0.9 },    // G5
      { freq: 1047, time: 1.1 }    // C6 - финал
    ];
    
    melody.forEach(({ freq, time }) => {
      // Основная нота
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime + time);
      oscillator.type = 'triangle'; // Более мягкий звук трубы
      
      gainNode.gain.setValueAtTime(0.35, ctx.currentTime + time);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + time + 0.25);
      
      oscillator.start(ctx.currentTime + time);
      oscillator.stop(ctx.currentTime + time + 0.25);
      
      // Гармоника для богатства звука
      const harmonic = ctx.createOscillator();
      const harmonicGain = ctx.createGain();
      
      harmonic.connect(harmonicGain);
      harmonicGain.connect(ctx.destination);
      
      harmonic.frequency.setValueAtTime(freq * 1.5, ctx.currentTime + time);
      harmonic.type = 'sine';
      
      harmonicGain.gain.setValueAtTime(0.15, ctx.currentTime + time);
      harmonicGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + time + 0.2);
      
      harmonic.start(ctx.currentTime + time);
      harmonic.stop(ctx.currentTime + time + 0.2);
    });
  }, [initAudioContext]);

  // Барабанная дробь - характерная для подсчёта очков
  const playDrumroll = useCallback(() => {
    if (!audioContext.current) initAudioContext();
    const ctx = audioContext.current;
    
    // Имитация барабана через шум и низкие частоты
    const duration = 2;
    const interval = 0.05; // Быстрые удары
    
    for (let i = 0; i < duration / interval; i++) {
      const time = ctx.currentTime + i * interval;
      
      // Низкий удар барабана
      const kick = ctx.createOscillator();
      const kickGain = ctx.createGain();
      
      kick.connect(kickGain);
      kickGain.connect(ctx.destination);
      
      kick.frequency.setValueAtTime(150, time);
      kick.frequency.exponentialRampToValueAtTime(50, time + 0.05);
      kick.type = 'sine';
      
      kickGain.gain.setValueAtTime(0.3, time);
      kickGain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
      
      kick.start(time);
      kick.stop(time + 0.05);
      
      // Шум для реалистичности (малый барабан)
      if (i % 2 === 0) {
        const noise = ctx.createBufferSource();
        const noiseGain = ctx.createGain();
        const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.03, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let j = 0; j < data.length; j++) {
          data[j] = Math.random() * 2 - 1;
        }
        
        noise.buffer = buffer;
        noise.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        
        noiseGain.gain.setValueAtTime(0.1, time);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.03);
        
        noise.start(time);
      }
    }
  }, [initAudioContext]);

  // Звук аплодисментов
  const playApplause = useCallback(() => {
    if (!audioContext.current) initAudioContext();
    const ctx = audioContext.current;
    
    // Создаём шумовой звук аплодисментов
    const duration = 2;
    const buffer = ctx.createBuffer(2, ctx.sampleRate * duration, ctx.sampleRate);
    
    for (let channel = 0; channel < 2; channel++) {
      const data = buffer.getChannelData(channel);
      for (let i = 0; i < data.length; i++) {
        // Фильтрованный шум с огибающей
        const envelope = Math.sin((i / data.length) * Math.PI);
        const noise = (Math.random() * 2 - 1) * envelope * 0.3;
        data[i] = noise;
      }
    }
    
    const source = ctx.createBufferSource();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    source.buffer = buffer;
    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1000, ctx.currentTime);
    filter.Q.setValueAtTime(1, ctx.currentTime);
    
    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    
    source.start(ctx.currentTime);
  }, [initAudioContext]);

  return {
    playCorrectSound,
    playWrongSound,
    playFlipSound,
    playTickSound,
    playVictorySound,
    playDrumroll,
    playApplause
  };
};
