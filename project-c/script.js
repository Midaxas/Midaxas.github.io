const yearNode = document.getElementById('year');
const faqItems = document.querySelectorAll('.faq-item');
const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');
const bmiButton = document.getElementById('calc-bmi');
const bmiResult = document.getElementById('bmi-result');

if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
}

faqItems.forEach((item, index) => {
    if (index > 0) {
        item.classList.add('closed');
    }

    const button = item.querySelector('.faq-q');
    if (!button) return;

    button.addEventListener('click', () => {
        item.classList.toggle('closed');
    });
});

function bmiCategory(value) {
    if (value < 18.5) return 'Underweight';
    if (value < 25) return 'Normal range';
    if (value < 30) return 'Overweight';
    return 'Obesity';
}

if (bmiButton && heightInput && weightInput && bmiResult) {
    bmiButton.addEventListener('click', () => {
        const height = Number(heightInput.value);
        const weight = Number(weightInput.value);

        if (!height || !weight) {
            bmiResult.textContent = 'Please enter valid height and weight values.';
            return;
        }

        const bmi = weight / ((height / 100) * (height / 100));
        bmiResult.textContent = `BMI: ${bmi.toFixed(1)} — ${bmiCategory(bmi)}`;
    });
}
