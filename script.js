const asyncBtn = document.getElementById("async-btn");
const syncBtn = document.getElementById("sync-btn");
const isoBtn = document.getElementById("iso-btn");

const binaryBitsContainer = document.getElementById("binary-bits-container");
const arrow = document.getElementById("arrow");

// Function to generate random binary bits, ensuring first is 1 (Stop) and last is 0 (Start)
function generateBinaryData(length) {
  let binaryData = [1]; // First bit as Stop (1)
  for (let i = 1; i < length - 1; i++) {
    binaryData.push(Math.random() > 0.5 ? 1 : 0);
  }
  binaryData.push(0); // Last bit as Start (0)
  return binaryData;
}

function createBinaryBits(data, transmissionType) {
  binaryBitsContainer.innerHTML = ''; // Clear the previous bits

  // Apply specific frame styles for Synchronous or Isochronous
  if (transmissionType === "sync") {
    binaryBitsContainer.classList.add('synchronous-frame');
  } else if (transmissionType === "iso") {
    binaryBitsContainer.classList.add('isochronous-frame');
  }

  data.forEach((bit, index) => {
    const bitElement = document.createElement('div');
    bitElement.classList.add('binary-bit');
    bitElement.textContent = bit;
    
    // Add text for "Stop" and "Start" bits
    const label = document.createElement('span');
    if (index === 0) {
      bitElement.textContent = '1'; // First bit as Stop
      label.textContent = 'Stop';
    } else if (index === data.length - 1) {
      bitElement.textContent = '0'; // Last bit as Start
      label.textContent = 'Start';
    }

    bitElement.appendChild(label);
    
    // Position each bit starting aligned with sender
    bitElement.style.left = `${120 + (index * 50)}px`; // Stagger the bits across

    binaryBitsContainer.appendChild(bitElement);

    // Trigger animation for each bit with a delay
    setTimeout(() => {
      bitElement.classList.add('active');
    }, 200 * index); // Delay for bit by bit movement
  });

  // Animate arrow movement after a delay
  setTimeout(() => {
    arrow.style.animation = 'arrowMove 2s forwards';
    arrow.style.opacity = 1;
  }, 200);
}

asyncBtn.addEventListener("click", () => {
  binaryBitsContainer.classList.remove('synchronous-frame', 'isochronous-frame');
  const binaryData = generateBinaryData(6); // Generate 6 bits with first as Stop and last as Start
  createBinaryBits(binaryData, "async");
  animateBinaryBits();
});

syncBtn.addEventListener("click", () => {
  binaryBitsContainer.classList.remove('isochronous-frame');
  const binaryData = generateBinaryData(6); // Generate 6 bits
  createBinaryBits(binaryData, "sync");
  animateBinaryBits();
});

isoBtn.addEventListener("click", () => {
  binaryBitsContainer.classList.remove('synchronous-frame');
  const binaryData = generateBinaryData(6); // Generate 6 bits
  createBinaryBits(binaryData, "iso");
  animateBinaryBits();
});

// Animate the binary bits
function animateBinaryBits() {
  const bits = document.querySelectorAll('.binary-bit');
  bits.forEach(bit => {
    bit.style.animation = 'transmit 2s forwards';
  });
}
