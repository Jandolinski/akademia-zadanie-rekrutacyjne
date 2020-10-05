const changeSection = (direction) => {

    let currentSection = parseInt(document.querySelector('.active[data-step]').getAttribute('data-step'));

    document.querySelector('.active[data-step]').classList.add('hidden');
    document.querySelector('.active[data-step]').classList.remove('active');

    if(direction === 'next') {

        currentSection += 1;

        document.querySelector(`[data-step="${currentSection}"]`).classList.remove('hidden');
        document.querySelector(`[data-step="${currentSection}"]`).classList.add('active');

    } else if(direction === 'prev') {

        currentSection -= 1;

        document.querySelector(`[data-step="${currentSection}"]`).classList.remove('hidden');
        document.querySelector(`[data-step="${currentSection}"]`).classList.add('active');

    }

    const timelineItems = document.querySelectorAll('.timeline__item[data-timeline-step]');

    timelineItems.forEach((el) => {

        if(parseInt(el.getAttribute('data-timeline-step')) < currentSection) {

            el.classList.remove('timeline__item--active');
            el.classList.add('timeline__item--completed');
        
        } else if(parseInt(el.getAttribute('data-timeline-step')) === currentSection) {

            el.classList.remove('timeline__item--completed');
            el.classList.add('timeline__item--active');

        } else {

            el.classList.remove('timeline__item--completed');
            el.classList.remove('timeline__item--active');

        }

    });

}

const startCalculator = document.getElementById('start');
const nextBtn = document.getElementById('nextSection');
const prevBtn = document.getElementById('prevSection');

startCalculator.addEventListener('click', () => changeSection('next'));
nextBtn.addEventListener('click', () => changeSection('next'));
prevBtn.addEventListener('click', () => changeSection('prev'));