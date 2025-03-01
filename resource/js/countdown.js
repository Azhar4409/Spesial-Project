document.addEventListener('DOMContentLoaded', function() {
    const fastingStartDate = new Date('March 1, 2025');
    const fastingEndDate = new Date('April 1, 2025');
    const today = new Date();
  
    let daysOfFasting = null;
    if (today >= fastingStartDate && today <= fastingEndDate) {
      const timeDiff = today - fastingStartDate;
      daysOfFasting = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1; // +1 to include the first day
    }
  
    document.getElementById('fasting-days').textContent = daysOfFasting !== null ? daysOfFasting : 'null';
  });