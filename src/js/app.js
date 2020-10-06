const changeSection = direction => {

    const currentSection = document.querySelector('.active[data-step]');

    if(!currentSection) {

        return false;

    }

    let currentSectionNumber = parseInt(currentSection.getAttribute('data-step'));

    currentSection.classList.add('hidden');
    currentSection.classList.remove('active');

    if(direction === 'next') {

        if(currentSectionNumber == 1) {

            document.getElementById('multiStepSection').classList.remove('hidden');

        }

        currentSectionNumber += 1;

        const newCurrentSection = document.querySelector(`[data-step="${currentSectionNumber}"]`);

        if(newCurrentSection) {

            newCurrentSection.classList.remove('hidden');
            newCurrentSection.classList.add('active');
        
        }

    } else if(direction === 'prev') {

        if(currentSectionNumber == 2) {

            document.getElementById('multiStepSection').classList.add('hidden');

        }

        currentSectionNumber -= 1;

        const newCurrentSection = document.querySelector(`[data-step="${currentSectionNumber}"]`);

        if(newCurrentSection) {

            newCurrentSection.classList.remove('hidden');
            newCurrentSection.classList.add('active');
        
        }

    }

    refreshTimeline(currentSectionNumber);

}

const refreshTimeline = currentSection => {

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