export function showProgress(skills) {
    const container = document.getElementById("skills");
    container.innerHTML = ''; // Clear previous contents
    skills.forEach((value, skill) => {
      // Create skill container
      const skillContainer = document.createElement("div");
      skillContainer.classList.add("skill-container");
      skillContainer.style.display = 'flex';
      skillContainer.style.alignItems = 'center';
      skillContainer.style.marginBottom = '10px';
      // Create skill name element
      const skillName = document.createElement("span");
      skillName.textContent = skill + ': ';
      skillName.style.flexGrow = '1';
      // Create SVG container for the donut chart
      const svgContainer = document.createElement("div");
      svgContainer.style.width = '100px'; // Size of the donut chart
      svgContainer.style.height = '100px';
      // Calculate circumference for the donut chart
      const radius = 50; // Half the width and height
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (value / 100) * circumference;
      // Create SVG element
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
      svg.setAttribute('viewBox', '0 0 100 100');
      // Create circle for the background
      const bgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      bgCircle.setAttribute('cx', '50');
      bgCircle.setAttribute('cy', '50');
      bgCircle.setAttribute('r', radius.toString());
      bgCircle.style.fill = 'none';
      bgCircle.style.stroke = '#eee';
      bgCircle.style.strokeWidth = '10';
      // Create circle for the value
      const valueCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      valueCircle.setAttribute('cx', '50');
      valueCircle.setAttribute('cy', '50');
      valueCircle.setAttribute('r', radius.toString());
      valueCircle.style.fill = 'none';
      valueCircle.style.stroke = 'steelblue';
      valueCircle.style.strokeWidth = '10';
      valueCircle.style.strokeDasharray = circumference.toString();
      valueCircle.style.strokeDashoffset = offset.toString();
      valueCircle.style.transition = 'stroke-dashoffset 1s';
      svg.appendChild(bgCircle);
      svg.appendChild(valueCircle);
      svgContainer.appendChild(svg);
      // Append elements to the skill container
      skillContainer.appendChild(skillName);
      skillContainer.appendChild(svgContainer);
      // Append the skill container to the main container
      container.appendChild(skillContainer);
    });
  }
  