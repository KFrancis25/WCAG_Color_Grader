const color1Input = document.getElementById('color1');
const color2Input = document.getElementById('color2');
const generateButton = document.getElementById('generate');
const contrastResult = document.getElementById('contrast-result');
const contrastRatioElement = document.getElementById('contrast-ratio');
const wcagGradeElement = document.getElementById('wcag-grade');
const colorPreview1 = document.getElementById('color-preview-1');
const colorPreview2 = document.getElementById('color-preview-2');

color1Input.addEventListener('input', () => {
  colorPreview1.style.backgroundColor = color1Input.value;
});

color2Input.addEventListener('input', () => {
  colorPreview2.style.backgroundColor = color2Input.value;
});

generateButton.addEventListener('click', () => {
  const color1 = color1Input.value;
  const color2 = color2Input.value;
  const contrastRatio = calculateContrastRatio(color1, color2);
  const wcagGrade = getWcagGrade(contrastRatio);

  contrastRatioElement.textContent = `Contrast Ratio: ${contrastRatio.toFixed(2)}`;
  wcagGradeElement.textContent = `WCAG Grade: ${wcagGrade}`;
});

function calculateContrastRatio(color1, color2) {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const contrastRatio = (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
  return contrastRatio;
}

function getLuminance(color) {
  const rgb = hexToRgb(color);
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum;
}

function hexToRgb(hex) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return { r, g, b };
}

function getWcagGrade(contrastRatio) {
  if (contrastRatio >= 7) {
    return 'AAA';
  } else if (contrastRatio >= 4.5) {
    return 'AA';
  } else if (contrastRatio >= 3) {
    return 'A';
  } else {
    return 'Fail';
  }
}