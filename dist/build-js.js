"use strict";var changeSection=function(e){var t=document.querySelector(".active[data-step]"),c=Array.from(document.querySelectorAll("[data-step]")).length;if(!t)return!1;var n=parseInt(t.getAttribute("data-step"));t.classList.add("hidden"),t.classList.remove("active"),"next"===e?(1==n&&document.getElementById("multiStepSection").classList.remove("hidden"),n+=1,(t=document.querySelector('[data-step="'.concat(n,'"]')))&&(t.classList.remove("hidden"),t.classList.add("active"))):"prev"===e&&(2==n&&document.getElementById("multiStepSection").classList.add("hidden"),--n,(a=document.querySelector('[data-step="'.concat(n,'"]')))&&(a.classList.remove("hidden"),a.classList.add("active")));var a=document.getElementById("sectionsNavigation");n==c?a.classList.add("hidden"):a.classList.remove("hidden"),refreshTimeline(n)},refreshTimeline=function(t){Array.from(document.querySelectorAll(".timeline__item[data-timeline-step]")).forEach(function(e){parseInt(e.getAttribute("data-timeline-step"))<t?(e.classList.remove("timeline__item--active"),e.classList.add("timeline__item--completed")):parseInt(e.getAttribute("data-timeline-step"))===t?(e.classList.remove("timeline__item--completed"),e.classList.add("timeline__item--active")):(e.classList.remove("timeline__item--completed"),e.classList.remove("timeline__item--active"))})},refreshInputs=function(){Array.from(document.querySelectorAll('input[type="checkbox"], input[type="radio"]')).forEach(function(e){e.checked=!1}),recalculatePrices()},refreshCalculator=function(){var e=document.querySelector(".active[data-step]"),t=document.querySelector('[data-step="1"]'),c=document.getElementById("multiStepSection");refreshInputs(),refreshTimeline(1),c.classList.add("hidden"),e.classList.add("hidden"),e.classList.remove("active"),t.classList.remove("hidden"),t.classList.add("active")},recalculatePrices=function(){var e=Array.from(document.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked')),c=0,n=0,t=document.querySelectorAll("#wholePrice .price__value, #summaryWholePrice .price__value"),a=document.querySelector("#standardPrice .price__value");if(e.length<=0)return t.forEach(function(e){e.textContent=0}),a.textContent=0,!1;e.forEach(function(e){var t=Number(e.getAttribute("data-price")),e=e.getAttribute("data-price-type");0<t&&("standard"===e||"with_bonuses"===e)&&(c+=t,"standard"===e&&(n+=t))}),t.forEach(function(e){e.textContent=c.toFixed(2)}),a.textContent=n.toFixed(2)},fetchJSONData=new Promise(function(i,e){fetch("data.json").then(function(e){return e.json()}).then(function(e){var t,c=e.inputs;for(t in c)(function(a){var e=c[a],t=document.getElementById(e.id);if(!t)return;var i=e.type,o=(o=e.price_type_affect)||"none",r="";e.elements.forEach(function(e,t){var c=e.label,n=e.price,e=e.tooltip,n=n||0;r+=e?'<li class="input-group__item '.concat(i," ").concat(i,'--with-tooltip">'):'<li class="input-group__item '.concat(i,'">'),"checkbox"===i?r+='<input type="'.concat(i,'" name="').concat(a,"_").concat(t,'" id="').concat(a,"_").concat(t,'" class="sr-only" data-price="').concat(n,'" data-price-type="').concat(o,'">'):"radio"===i&&(r+='<input type="'.concat(i,'" name="').concat(a,'" id="').concat(a,"_").concat(t,'" class="sr-only" data-price="').concat(n,'" data-price-type="').concat(o,'">')),r+='<label for="'.concat(a,"_").concat(t,'" class="').concat(i,'__label"><span class="label__text">').concat(c,"</span>"),e&&(r+='<span class="checkbox__tooltip" data-text="'.concat(e,'"></span>')),r+="</label></li>"}),t.innerHTML=r})(t);var n=e.summary_boxes,e=document.getElementById("summaryBoxes"),a="";n.forEach(function(e){var t=e.img,c=e.alt,n=e.link,e=e.background_color;if(!t)return!1;c=c||"",n=n||"",a+='\n            <li class="summary__box" style="background-color:'.concat(e=e||"#fff",'">\n                <a href="').concat(n,'" target="_blank" rel="nofollow" class="box__link">\n                    <img loading="lazy" src="').concat(t,'" alt="').concat(c,'" class="box__img">\n                </a>\n            </li>\n            ')}),e.innerHTML=a,i(!0)})}),init=function(){fetchJSONData.then(function(e){document.getElementById("loader").classList.remove("active");var t=document.getElementById("start"),c=document.getElementById("nextSection"),n=document.getElementById("prevSection"),a=document.getElementById("restart");t.addEventListener("click",function(){return changeSection("next")}),c.addEventListener("click",function(){return changeSection("next")}),n.addEventListener("click",function(){return changeSection("prev")}),a.addEventListener("click",refreshCalculator),Array.from(document.querySelectorAll('input[type="checkbox"], input[type="radio"]')).forEach(function(e){e.addEventListener("change",recalculatePrices)})})};window.onload=init;