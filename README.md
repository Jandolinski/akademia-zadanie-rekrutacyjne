# akademia-zadanie-rekrutacyjne
recruitment task for Akademia.pl (Frontend Developer)

See live demo: http://akademia.jandolinski.pl/

## Launch

### Development environmemt
1. `git clone https://github.com/Jandolinski/akademia-zadanie-rekrutacyjne.git`
2. `cd akademia-zadanie-rekrutacyjne`
3. `npm install`
4. `npm start`
5. The development server should start on `http://localhost:3000`

### Production environment
1. Download project files
2. Upload project files to the server
3. Accessing `index.html` will make the application running

## JSON data editing guide
You can manage content by editing `data.json` file.

### Input groups
You have a couple of input groups:
1. `standard_bonuses` - manage "Standardowe bonusy" section
2. `additional_bonuses` - manage "Dodatkowe bonusy" section
3. `customer_type` - manage "Kim jest Twój klient?" section
4. `course_content` - manage  "Co zawiera Twój kurs" section

For each of that group you can specify following options:
* `id` (required) - id of HTML element where generated inputs will be appended
* `type` - type of inputs. Supported values:
  * `checkbox`
  * `radio`
* `price_type_affect` - Define which price type the input should affect. Supported values:
  * `standard` - "Cena bez bonusów"
  * `with_bonuses` - "Cena z bonusami"

### Inputs
Just add/edit element in `elements` array inside specific input group. You can specify following options for inputs:
* `label` - label for input
* `price` - value that will be added to the price if the input will be checked
* `tooltip` - Additional text that will be visible on tooltip icon hover

### Summary boxes
You can edit Summary boxes inside `summary_boxes` array (elements visible in last section of app). You can specify following options for boxes:
* `img` (required) - logo for the box
* `alt` - alternate text for the `img`
* `link` - link followed after clicking on the box
* `background_color` - background-color of the box
