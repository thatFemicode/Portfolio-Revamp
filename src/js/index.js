import headline from '../headline/headline.css';
import headlines from '../headline/headline';
import sass from '../scss/main.scss';

window.onload = function () {
  const bars = document.querySelectorAll('.progress-bar');
  //   console.log(bars);
  // function to populate the bars with the width
  bars.forEach(function (bar) {
    let percentage = bar.dataset.percent;
    let tooltip = bar.children[0];
    tooltip.innerText = percentage + '%';
    bar.style.width = percentage + '%';
    bar.style.height = '1px';
  });
  // FUNCTION to tun counter with intersection observer api
  const counters = document.querySelectorAll('.counter');
  console.log(counters);
  function runCounter() {
    counters.forEach((counter) => {
      counter.innerText = 0;
      let target = +counter.dataset.count;
      let step = target / 100;

      let countIt = function () {
        let displayedCount = +counter.innerText;
        if (displayedCount < target) {
          counter.innerText = Math.ceil(displayedCount + step);
          setTimeout(countIt, 50);
        } else {
          counter.innerText = target;
        }
      };
      countIt();
    });
  }
  let counterSection = document.querySelector('.counter-section');

  let options = {
    rootMargin: '0px 0px -200px 0px',
  };
  let done = 0;

  const sectionObserver = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting && done !== 1) {
      done = 1;
      runCounter();
    }
  }, options);

  sectionObserver.observe(counterSection);
};
