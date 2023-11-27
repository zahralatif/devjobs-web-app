const jobsSection = document.querySelector(".jobs-section");
const jobsTitle = document.querySelector("#job-title");
const jobsLocation = document.querySelector("#job-location");
const jobsType = document.querySelector("#job-type");
const theme = document.querySelector("#checking-theme");
const body = document.querySelector("body");
let result = [];

const data = [
    {
        id: 1,
        title: 'Senior Software Engineer',
        image: './assets/images/job_ex.svg',
        time: '5h ago',
        workType: 'Part Time',
        company: 'Scoot',
        location: 'United Kingdom'
    },
    {
        id: 2,
        title: 'Senior Software Developer',
        image: './assets/images/job_ex.svg',
        time: '13h ago',
        workType: 'Full Time',
        company: 'Scoot',
        location: 'United States'
    },
    {
        id: 3,
        title: 'Middle Software Engineer',
        image: './assets/images/job_ex.svg',
        time: '22h ago',
        workType: 'Full Time',
        company: 'Scoot',
        location: 'United Kingdom'
    },
]

function getData(data) {
    let dataHtml = '';

    data.map((item) => {
        dataHtml += `
        <div class="jobs-item">
            <div class="jobs-item_image">
              <img src="${item.image}" alt="" />
            </div>
            <div class="jobs-item_container">
              <div class="jobs-item_details">
                <p>${item.time}</p>
                <div class="oval">
                  <img src="./assets/images/Oval.svg" alt="" />
                </div>
                <p>${item.workType}</p>
              </div>
              <a href="/job-details.html?id=${item.id}" class="jobs-item_info">
                ${item.title}
              </a>
              <div class="jobs-item_company">${item.company}</div>
            </div>
            <div class="jobs-item_footer">
              <p class="jobs-item_location">${item.location}</p>
            </div>
        </div>
        `
    })

    jobsSection?.innerHTML = dataHtml;
}

getData(data);

theme.addEventListener('click', (e) => {
    if (e.target.checked) {
        body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
    else {
        body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
})

window.onload = function () {
    let pageTheme = localStorage.getItem('theme');
    if (pageTheme == 'dark') {
        body.classList.add('dark');
        theme.checked = true;
    } else {
        body.classList.remove('dark');
    }
}

function search(searchTerm, key, data) {
    searchTerm = searchTerm.toLowerCase();

    const filteredData = data.filter((item) => {
        const currentItemValue = item[key].toLowerCase();
        return currentItemValue.includes(searchTerm);
    });

    return filteredData;
}

jobsTitle?.addEventListener('keyup', (e) => {
    result = search(e.target.value, "title", data);
    getData(result);
})

jobsLocation?.addEventListener('keyup', (e) => {
    result = search(e.target.value, "location", data);
    getData(result);
})

jobsType?.addEventListener('click', (e) => {
    if (e.target.checked) {
        result = search('Full Time', 'workType', data);
        getData(result);
    } else {
        getData(data);
    }
})