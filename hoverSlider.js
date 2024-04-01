function hoverSlider(containersSelector = '.hover_slider') {
  const conts = document.querySelectorAll(containersSelector);

  conts.forEach(cont => {
    cont.classList.add('hover_slider');
    const imgs = cont.querySelectorAll('img');
    const n = imgs.length;

    const imgWindow = document.createElement('div');
    imgWindow.className = 'hover_slider-window';
    imgWindow.append(...imgs);
    cont.append(imgWindow);

    const indicator = document.createElement('div');
    indicator.className = 'hover_slider-indicator';
    for (let i = 0; i < n; i++) {
      const indmark = document.createElement('div');
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
        // Both dimensions are set, do nothing
      } else if (contWidth) {
        // cont.style.height = `${(contWidth * naturalHeight) / naturalWidth}px`; 
        cont.style.aspectRatio = `${naturalWidth / naturalHeight}`;
      } else if (contHeight) {
        // cont.style.width = `${(contHeight * naturalWidth) / naturalHeight}px`;
        cont.style.aspectRatio = `${naturalWidth / naturalHeight}`;
      } else {
        const scale = firstImg.src.includes('@2x') ? 2 : (firstImg.src.includes('@3x') ? 3 : 1);
        cont.style.width = `${naturalWidth / scale}px`;
        cont.style.height = `${naturalHeight / scale}px`;
      }
    });

    let tsX, tsY, firstMove = 0, allowSlide = 1, curActiveId = 1;

    cont.addEventListener('touchstart', (e) => {
      tsX = e.touches[0].pageX;
      tsY = e.touches[0].pageY;
      allowSlide = 0;
    });

    cont.addEventListener('mousemove', handleMove);
    cont.addEventListener('touchmove', handleMove);

    function handleMove(e) {
      if (firstMove !== 0) return nextStep(e);

      firstMove = 1;
      if (tsX) {
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
      if (allowSlide === 1) {
        e.preventDefault();
        const curX = e.touches ? e.touches[0].pageX : e.pageX;
        const xy = cont.getBoundingClientRect();
        const w = cont.offsetWidth;
        const relX = curX - xy.left;

        if (relX >= 0 && relX <= w) {
          const x = relX / (w / n);
          const active = Math.ceil(x);
          setActive(active);
        }
      }
    }

    cont.addEventListener('touchend', () => {
      firstMove = 0;
      allowSlide = 1;
      cont.classList.remove('hover_slider-touch_active');
    });

    function setActive(active) {
      if (!active || curActiveId === active || active < 1 || active > n) return;

      const currentActiveImg = imgs[active - 1];
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
      indmarks[active - 1].classList.add('active');

      curActiveId = active;
    }
  });
}