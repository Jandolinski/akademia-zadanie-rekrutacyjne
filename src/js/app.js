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

    recalculatePrices();

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

const recalculatePrices = () => {

    const inputs = Array.from(document.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked'));
    
    let wholePriceValue = 0;

    let standardPriceValue = 0;

    const wholePrice = document.querySelectorAll('#wholePrice .price__value, #summaryWholePrice .price__value');
    
    const standardPrice = document.querySelector('#standardPrice .price__value');

    if(inputs.length <= 0) {

        wholePrice.forEach(priceEl => {

            priceEl.textContent = 0;

        });

        standardPrice.textContent = 0;

    
        return false;

    }


    inputs.forEach(input => {

        const inputPrice = Number(input.getAttribute('data-price'));
        
        const inputPriceType = input.getAttribute('data-price-type');
    
        if(inputPrice > 0 && (inputPriceType === 'standard' || inputPriceType === 'with_bonuses')) {

            wholePriceValue += inputPrice;
    
            if(inputPriceType === 'standard') {

                standardPriceValue += inputPrice;

            }
            
        }
        
    });

    if(Number.isInteger(wholePriceValue)) {

        wholePriceValue = wholePriceValue.toFixed(0);

    } else {

        wholePriceValue = wholePriceValue.toFixed(2)

    }

    wholePrice.forEach(priceEl => {

        priceEl.textContent = wholePriceValue;

    });

    if(Number.isInteger(standardPriceValue)) {

        standardPriceValue = standardPriceValue.toFixed(0);

    } else {

        standardPriceValue = standardPriceValue.toFixed(2)

    }

    standardPrice.textContent = standardPriceValue;
    
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

                const elementTooltip = el.tooltip;

                if(!elementPrice) {

                    elementPrice = 0;

                }

                if(elementTooltip) {

                    html += `<li class="input-group__item ${inputGroupType} ${inputGroupType}--with-tooltip">`;

                } else {

                    html += `<li class="input-group__item ${inputGroupType}">`;

                }

                if(inputGroupType === 'checkbox') {

                    html += `<input type="${inputGroupType}" name="${inputGroup}_${index}" id="${inputGroup}_${index}" class="sr-only" data-price="${elementPrice}" data-price-type="${inputGroupPriceType}">`;

                } else if(inputGroupType === 'radio') {

                    html += `<input type="${inputGroupType}" name="${inputGroup}" id="${inputGroup}_${index}" class="sr-only" data-price="${elementPrice}" data-price-type="${inputGroupPriceType}">`;
                
                }

                html += `<label for="${inputGroup}_${index}" class="${inputGroupType}__label"><span class="label__text">${elementLabel}</span>`;

                if(elementTooltip) {

                    html += `<span class="checkbox__tooltip" data-text="${elementTooltip}"></span>`;

                }

                html += '</label></li>';

            });

            parentElement.innerHTML = html;

        }

        const summaryBoxes = json.summary_boxes;

        const summaryBoxesWrapper = document.getElementById('summaryBoxes');

        let summaryBoxesHTML = '';

        summaryBoxes.forEach(el => {

            let img = el.img;
            let alt = el.alt;
            let link = el.link;
            let background = el.background_color;

            if(!img) {
                return false;
            }
            if(!alt) {
                alt = '';
            }
            if(!link) {
                link = '';
            }
            if(!background) {
                background = '#fff';
            }

            summaryBoxesHTML += `
            <li class="summary__box" style="background-color:${background}">
                <a href="${link}" target="_blank" rel="nofollow" class="box__link">
                    <img loading="lazy" src="${img}" alt="${alt}" class="box__img">
                </a>
            </li>
            `;

        });

        summaryBoxesWrapper.innerHTML = summaryBoxesHTML;

        resolve(true);
    });


});

const init = () => {

    fetchJSONData.then(res => {

        document.getElementById('loader').classList.remove('active');
    
        const startCalculator = document.getElementById('start');
        const nextBtn = document.getElementById('nextSection');
        const prevBtn = document.getElementById('prevSection');
        const restart = document.getElementById('restart');

        startCalculator.addEventListener('click', () => changeSection('next'));
        nextBtn.addEventListener('click', () => changeSection('next'));
        prevBtn.addEventListener('click', () => changeSection('prev'));
        restart.addEventListener('click', refreshCalculator);

        const inputs = Array.from(document.querySelectorAll('input[type="checkbox"], input[type="radio"]'));

        inputs.forEach(input => {
        
            input.addEventListener('change', recalculatePrices);
        
        });
    
    });

}


window.onload = init;