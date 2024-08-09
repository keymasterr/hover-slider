function hoverSlider(containersSelector = '.hover_slider') {
  const conts = document.querySelectorAll(containersSelector);

  conts.forEach(cont => {
    cont.classList.add('hover_slider');
    const imgs = cont.querySelectorAll('img');
    const n = imgs.length;

    const touchLoop = cont.dataset.touchLoop === 'true';
    const touchRelative = cont.dataset.touchRelative === 'true';

    const imgWindow = document.createElement('div');
    imgWindow.className = 'hover_slider-window';
    imgWindow.append(...imgs);
    cont.append(imgWindow);

    const indicator = document.createElement('div');
    indicator.className = 'hover_slider-indicator';
    for (let i = 0; i < n; i++) {
      const indmark = document.createElement('div');
      indmark.addEventListener('click', () => setActive(i));
      indmark.className = 'indmark';
      indicator.append(indmark);
    }
    indicator.querySelector('.indmark').classList.add('active');
    cont.append(indicator);

    const firstImg = imgs[0];

    firstImg.addEventListener('load', () => {
      const c = cont.cloneNode(true);
      c.style.display = 'inline-block';
      document.body.appendChild(c);
      const contWidth = c.offsetWidth;
      const contHeight = c.offsetHeight;
      document.body.removeChild(c);

      const naturalWidth = firstImg.naturalWidth;
      const naturalHeight = firstImg.naturalHeight;

      if (contWidth && contHeight) {
      } else if (contWidth || contHeight) {
        cont.style.aspectRatio = `${naturalWidth / naturalHeight}`;
      } else {
        const scale = firstImg.src.includes('@2x') ? 2 : (firstImg.src.includes('@3x') ? 3 : 1);
        cont.style.width = `${naturalWidth / scale}px`;
        cont.style.height = `${naturalHeight / scale}px`;
      }
    });

    let tsX, tsY, firstMove = 0, allowSlide = 1, curActiveId = 0, touchStartId;

    imgWindow.addEventListener('touchstart', (e) => {
      tsX = e.touches[0].pageX;
      tsY = e.touches[0].pageY;
      allowSlide = 0;
      touchStartId = curActiveId;
    });

    imgWindow.addEventListener('mousemove', handleMove);
    imgWindow.addEventListener('touchmove', handleMove);

    function handleMove(e) {
      if (firstMove !== 0) return nextStep(e);

      firstMove = 1;
      if (e.touches) {
        const diffX = Math.abs(tsX - (e.touches ? e.touches[0].pageX : e.pageX));
        const diffY = Math.abs(tsY - (e.touches ? e.touches[0].pageY : e.pageY));
        if (diffX > diffY && firstMove === 1) {
          cont.classList.add('hover_slider-touch_active');
          allowSlide = 1;
        }
      }
      nextStep(e);
    }

    function nextStep(e) {
      if (allowSlide !== 1) return;

      e.preventDefault();
      const curX = e.touches ? e.touches[0].pageX : e.pageX;
      const {left: contLeft} = cont.getBoundingClientRect();
      const sectionWidth = cont.offsetWidth / n;
      const relX = curX - contLeft;
      let relDiff = 0;

      if (e.touches && touchRelative) {
        relDiff = (tsX - contLeft) - (sectionWidth * (touchStartId));
      }

      const x = (relX  - relDiff) / sectionWidth;
      let nextActiveId = ~~(x);

      setActive(nextActiveId, e.touches && touchLoop);
    }

    imgWindow.addEventListener('touchend', () => {
      firstMove = 0;
      allowSlide = 1;
      cont.classList.remove('hover_slider-touch_active');
    });

    function setActive(nextActiveId, loop = false) {
      if (typeof nextActiveId === 'undefined' || curActiveId === nextActiveId) return;
      if (!loop && (nextActiveId < 0 || nextActiveId >= n)) return;
      nextActiveId = ((nextActiveId % n) + n) % n;

      const currentActiveImg = imgs[nextActiveId];
      const previousActiveImgs = cont.querySelectorAll('.active');

      if (previousActiveImgs.length > 0) {
        previousActiveImgs.forEach(el => {
          el.classList.replace('active','prevActive');
        });
      }

      currentActiveImg.classList.add('active');
      previousActiveImgs.forEach(el => {el.classList.remove('prevActive')});

      const indmarks = indicator.querySelectorAll('.indmark');
      indmarks.forEach(el => el.classList.remove('active'));
      indmarks[nextActiveId].classList.add('active');

      curActiveId = nextActiveId;
    }
  });
}