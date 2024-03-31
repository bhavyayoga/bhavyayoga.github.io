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

async function updateProgramsDiv() {
    const programsDiv = document.getElementById('programs');
    const items = await fetchScheduleItems();
    console.log(items);
}

updateProgramsDiv();
