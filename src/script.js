const scheduleUrl =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vRh7005aXEPMu2yZ7X6GmNyHEDMQRiwMzyd2KtHSTlOso3dgXe-w9gRPheWv6sS3Jr9i5IUTvoCCRuM/pub?gid=0&single=true&output=csv';

async function fetchScheduleItems() {
    let scheduleData = [];
    await fetch(scheduleUrl)
        .then((response) => response.text())
        .then((data) => (scheduleData = Papa.parse(data).data));

    if (scheduleData.length === 0) return [];

    const scheduleItems = [];
    for (let i = 1; i < scheduleData.length; i++) {
        const newItem = {};
        for (let j = 0; j < scheduleData[0].length; j++) {
            newItem[scheduleData[0][j]] = scheduleData[i][j];
        }
        scheduleItems.push(newItem);
    }
    return scheduleItems;
}

function createProgramCard(info) {
    const div = document.createElement('div');
    div.className = 'inline-block';
    div.innerHTML = `
      <div class="class-card card">
        <figure>
          <img src="/img/${info['Image']}" alt="${info['Name']} Image" />
        </figure>
        <div class="card-body p-4">
          <h2 class="card-title">${info['Name']}</h2>
          <p>${info['Date']}</p>
          <p>
            <a href="${info['Google Maps URL']}" class="link" target="_blank">
              ${info['Address']}
            </a>
          </p>
          <p>
            <b>${info['Price']}</b>
            , incl. online support
          </p>
          <div class="card-actions justify-start">
            <button class="btn btn-accent" onclick="modalApply.showModal()">Apply</button>
            <a href="#programs-info" class="btn btn-outline btn-accent">Learn More</a>
          </div>
        </div>
      </div>`;
    return div;
}

async function updateProgramsDiv() {
    const programsDiv = document.getElementById('programs');
    const items = await fetchScheduleItems();
    console.log(items);

    items.forEach((item) => programsDiv.appendChild(createProgramCard(item)));

    document.getElementById('programs-loading').remove();
}

updateProgramsDiv();
