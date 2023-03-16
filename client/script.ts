// import { Method } from "axios";

const url = "http://localhost:5000/";

async function get(URL: string) {
  const response = await fetch(URL, { method: "GET" });
  if (response.ok) {
    return response.json();
  }
  return null;
}
function changeVisibility(
  buttons: HTMLCollectionOf<Element>,
  visibility: string
) {
  for (let i = 0; i < buttons.length; i++) {
    (buttons[i] as HTMLElement).style.display = visibility;
  }
}
const search = document.getElementById("search");
const btn_group = document.getElementById("btn_group");
search?.addEventListener("keydown", async (e) => {
  if (e.key !== "Enter" && e.key !== "Backspace") return;
  const input = (e.target as HTMLInputElement).value;
  if (btn_group) {
    const buttons = btn_group.getElementsByClassName("btn"); // || [], ako je btn_group null

    if (e.key === "Backspace" && input.length == 1) {
      changeVisibility(buttons, "initial");
      return;
    }
    if (e.key === "Enter" && input.length > 0) {
      for (let i = 0; i < buttons.length; i++) {
        if (!buttons[i].innerHTML.toLowerCase().includes(input.toLowerCase())) {
          (buttons[i] as HTMLElement).style.display = "none";
        }
      }
    }
  }
});

function onStopClick(bus: string, li: HTMLLIElement) {
  li.innerHTML = bus;
  li.style.background = "rgb(80, 200, 120)";
}

function makeStops(response: any) {
  console.log(response);
  const ul = document.createElement("ul");
  ul.className = "stops";
  for (let i = 0; i < response.busDepartureA.length; i++) {
    const li = document.createElement("li");
    li.innerHTML = response.busDepartureA[i].time;
    li.className = "stop";
    li.style.cursor = "pointer";
    li.id = response.busDepartureA[i].busLineId;
    li.onclick = () => onStopClick(li.id, li);
    console.log(li.innerHTML);
    ul.appendChild(li);
  }
  document.body.appendChild(ul);
}

async function onClick(btn_text: string) {
  const name = btn_text.split(" ").join("_");
  console.log(name);
  const response = await get(`${url}${name}`);

  if (btn_group) {
    document.body.removeChild(btn_group);
  }
  makeStops(response);
  //tu ce da budu spiskovi buseva na stanici
  //izbacuje sve buseve na stanici u to vreme -10min
}

async function getButtons(url: string) {
  const options: RequestInit = {
    method: "GET",
  };
  fetch(url, options)
    .then(function (response) {
      if (response.ok) {
        // console.log(response.json());
        return response.json();
      } else throw new Error("Response: " + response.status);
    })
    .then(function (data) {
      const array: string[] = data.stations_arr;
      for (let i = 0; i < array.length; i++) {
        const btn = document.createElement("button");
        btn.innerHTML = array[i];
        btn.className = "btn";
        btn.id = "btn_id";
        btn.onclick = () => onClick(btn.innerHTML);
        const group = document.querySelector("#btn_group");
        if (group) {
          group.appendChild(btn);
        }
      }
    });
}
function start() {
  getButtons(url);
}
start();
