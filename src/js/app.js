const changeSection = direction => {

    const currentSection = document.querySelector('.active[data-step]');

    const sectionsCount = Array.from(document.querySelectorAll('[data-step]')).length;

    if(!currentSection) {

        return false;

    }

    let currentSectionNumber = parseInt(currentSection.getAttribute('data-step'));

    currentSection.classList.add('hidden');
    currentSection.classList.remove('active');

    if(direction === 'next') {

        // Switch from first section to multiStepSection
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

        // Switch from multiStepSection to first section
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

    // Hide sections navigation on last step

    const sectionsNavigation = document.getElementById('sectionsNavigation');

    if(currentSectionNumber == sectionsCount) {

        sectionsNavigation.classList.add('hidden');

    } else {

        sectionsNavigation.classList.remove('hidden');

    }

    refreshTimeline(currentSectionNumber);

}

const refreshTimeline = currentSection => {

    const timelineItems = Array.from(document.querySelectorAll('.timeline__item[data-timeline-step]'));

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

const refreshInputs = () => {

    const inputs = Array.from(document.querySelectorAll('input[type="checkbox"], input[type="radio"]'));

    inputs.forEach(el => {

        el.checked = false;

    });

}

const refreshCalculator = () => {
    
    const currentSection = document.querySelector('.active[data-step]');
    const firstSection = document.querySelector('[data-step="1"]');
    const multiStepSection = document.getElementById('multiStepSection');
    
    refreshInputs();

    refreshTimeline(1);

    multiStepSection.classList.add('hidden');

    currentSection.classList.add('hidden');
    currentSection.classList.remove('active');

    firstSection.classList.remove('hidden');
    firstSection.classList.add('active');


}

const fetchJSONData = new Promise((resolve, reject) => {

    fetch("data.json")
    .then(response => response.json())
    .then(json => {

        const inputs = json.inputs;

        for(const inputGroup in inputs) {

            const inputGroupObject = inputs[inputGroup];

            const parentElement = document.getElementById(inputGroupObject.id);

            if(!parentElement) {
                continue;
            }

            const inputGroupType = inputGroupObject.type;
            
            let inputGroupPriceType = inputGroupObject.price_type_affect;

            if(!inputGroupPriceType) {

                inputGroupPriceType = 'none';

            }

            let html = '';

            inputGroupObject.elements.forEach((el, index) => {

                const elementLabel = el.label;


                let elementPrice = el.price;

                if(!elementPrice) {

                    elementPrice = 0;

                }

                html += `<li class="input-group__item ${inputGroupType}">`;

                if(inputGroupType === 'checkbox') {

                    html += `<input type="${inputGroupType}" name="${inputGroup}_${index}" id="${inputGroup}_${index}" data-price="${elementPrice}" data-price-type="${inputGroupPriceType}">`;

                } else if(inputGroupType === 'radio') {

                    html += `<input type="${inputGroupType}" name="${inputGroup}" id="${inputGroup}_${index}" data-price="${elementPrice}" data-price-type="${inputGroupPriceType}">`;
                
                }

                html += `
                    <label for="${inputGroup}_${index}" class="${inputGroupType}__label">${elementLabel}</label>
                </li>
                `;

            });

            parentElement.innerHTML = html;

        }

        resolve(true);
    });

});

const init = () => {

    fetchJSONData.then(res => {

        document.getElementById('loader').classList.remove('active');
    
    });

}

const startCalculator = document.getElementById('start');
const nextBtn = document.getElementById('nextSection');
const prevBtn = document.getElementById('prevSection');
const restart = document.getElementById('restart');

startCalculator.addEventListener('click', () => changeSection('next'));
nextBtn.addEventListener('click', () => changeSection('next'));
prevBtn.addEventListener('click', () => changeSection('prev'));
restart.addEventListener('click', refreshCalculator);

window.onload = init;