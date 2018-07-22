/* config */
const pads = [
  {
    key: 'Q',
    keyCode: '81',
    audio: 'https://sampleswap.org/samples-ghost/DRUMS%20and%20SINGLE%20HITS/kicks/34[kb]anne-savage-kick.wav.mp3',
    title: 'kick',
  },
  {
    key: 'W',
    keyCode: '87',
    audio: 'https://sampleswap.org/samples-ghost/DRUMS%20and%20SINGLE%20HITS/claps/172[kb]CP.WAV.mp3',
    title: 'clap',
  },
  {
    key: 'E',
    keyCode: '69',
    audio: 'https://sampleswap.org/samples-ghost/DRUMS%20and%20SINGLE%20HITS/toms/210[kb]giant_tom.aif.mp3',
    title: 'tom',
  },
  {
    key: 'A',
    keyCode: '65',
    audio: 'https://sampleswap.org/samples-ghost/DRUMS%20and%20SINGLE%20HITS/snares/143[kb]brass-sd-soft.wav.mp3',
    title: 'snare',
  },
  {
    key: 'S',
    keyCode: '83',
    audio: 'https://sampleswap.org/samples-ghost/DRUMS%20and%20SINGLE%20HITS/hats/39[kb]707-ohh.aif.mp3',
    title: 'hat',
  },
  {
    key: 'D',
    keyCode: '68',
    audio: 'https://sampleswap.org/samples-ghost/DRUMS%20and%20SINGLE%20HITS/crashes/92[kb]909-bright-crash.aif.mp3',
    title: 'crash',
  },
  {
    key: 'Z',
    keyCode: '90',
    audio: 'https://sampleswap.org/samples-ghost/DRUMS%20and%20SINGLE%20HITS/rides/54[kb]RIDE_S_11.WAV.mp3',
    title: 'ride',
  },
  {
    key: 'X',
    keyCode: '88',
    audio: 'https://sampleswap.org/samples-ghost/DRUMS%20and%20SINGLE%20HITS/gongs%20and%20super%20crashes/276[kb]big-boomy-gong.wav.mp3',
    title: 'gong',
  },
  {
    key: 'C',
    keyCode: '67',
    audio: 'https://sampleswap.org/samples-ghost/DRUMS%20and%20SINGLE%20HITS/percussion%20african%20and%20eastern/8[kb]bongo%20hi.aif.mp3',
    title: 'bongo',
  },
];

const drumMachine = (function module() {
  /* Private helper functions */
  const setInnerHTML = (el, content) => {
    if (!content) return;

    el.innerHTML = content;
  };

  const setAttributes = (element, attrs) => {
    if (!attrs) return;

    Object.keys(attrs).forEach((key) => {
      element.setAttribute(key, attrs[key]);
    });
  };

  const addChild = (element, parent, attrs, content) => {
    setAttributes(element, attrs);
    setInnerHTML(element, content);

    parent.appendChild(element);
  };

  const displayPadTitle = (title) => {
    const display = document.querySelector('#display');
    setInnerHTML(display, title);
  };

  const playAudio = (event) => {
    const { target } = event;
    let audio;

    switch (event.type) {
      case 'click':
        audio = document.querySelector(`audio[data-title="${target.id}"]`);
        break;
      case 'keydown':
        audio = document.querySelector(`audio[data-keycode="${event.keyCode}"]`);
        document.querySelector(`button[data-keycode="${event.keyCode}"]`).focus();
        break;
      default:
        audio = null;
    }

    if (!audio) return;

    audio.currentTime = 0;
    audio.play();
    displayPadTitle(audio.dataset.title);
  };

  const createPads = () => {
    const padsParent = document.querySelector('#pads');
    const bodyEl = document.body;

    pads.reverse().forEach((pad) => {
      /* Create pad DOM nodes */
      const padEl = document.createElement('button');

      const padAttrs = {
        id: pad.title,
        class: 'drum-pad',
        'data-keycode': pad.keyCode,
      };

      addChild(padEl, padsParent, padAttrs, pad.key);

      /* Create audio element DOM nodes */
      const audioEl = document.createElement('audio');

      const audioAttrs = {
        id: pad.key,
        class: 'clip',
        src: pad.audio,
        'data-title': pad.title,
        'data-keycode': pad.keyCode,
      };

      addChild(audioEl, bodyEl, audioAttrs);
    });
  };

  const createDisplay = () => {
    const displayParent = document.querySelector('#drum-machine');
    const display = document.createElement('div');

    const displayAttrs = {
      id: 'display',
      class: 'drum-machine__display',
    };

    addChild(display, displayParent, displayAttrs);
  };

  const createEventListeners = () => {
    const pads = document.querySelectorAll('.drum-pad');

    /* Add click event listener to each pad */
    Array.from(pads).forEach((pad) => {
      pad.addEventListener('click', playAudio);
    });

    /* Add keydown event listener to window so keys work immediately */
    window.addEventListener('keydown', playAudio);
  };

  const init = () => {
    createPads();
    createDisplay();
    createEventListeners();
  };

  return {
    init,
  };
}());

drumMachine.init();
