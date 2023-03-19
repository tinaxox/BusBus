// import { Method } from "axios";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var url = "http://localhost:5000/";
function get(URL) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(URL, { method: "GET" })];
                case 1:
                    response = _a.sent();
                    if (response.ok) {
                        return [2 /*return*/, response.json()];
                    }
                    return [2 /*return*/, null];
            }
        });
    });
}
function changeVisibility(buttons, visibility) {
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].style.display = visibility;
    }
}
var search = document.getElementById("search");
var btn_group = document.getElementById("btn_group");
search === null || search === void 0 ? void 0 : search.addEventListener("keydown", function (e) { return __awaiter(_this, void 0, void 0, function () {
    var input, buttons, i;
    return __generator(this, function (_a) {
        if (e.key !== "Enter" && e.key !== "Backspace")
            return [2 /*return*/];
        input = e.target.value;
        if (btn_group) {
            buttons = btn_group.getElementsByClassName("btn");
            if (e.key === "Backspace" && input.length == 1) {
                changeVisibility(buttons, "initial");
                return [2 /*return*/];
            }
            if (e.key === "Enter" && input.length > 0) {
                for (i = 0; i < buttons.length; i++) {
                    if (!buttons[i].innerHTML.toLowerCase().includes(input.toLowerCase())) {
                        buttons[i].style.display = "none";
                    }
                }
            }
        }
        return [2 /*return*/];
    });
}); });
function onStopClick(bus, time, li) {
    if (li.innerHTML != bus) {
        li.innerHTML = bus;
        li.style.background = "rgb(80, 200, 120)";
    }
    else {
        li.innerHTML = time;
        li.style.background = "white";
    }
}
function makeStops(response) {
    var today = new Date();
    var time = today.getHours() * 60 + today.getMinutes();
    var hours_min = Math.floor((time - 10) / 60);
    var minutes_min = (time - 10) % 60;
    var min = hours_min + ":" + (minutes_min > 10 ? minutes_min : "0" + minutes_min);
    var hours_max = Math.floor((time + 10) / 60);
    var minutes_max = (time + 10) % 60;
    var max = hours_max + ":" + (minutes_max > 10 ? minutes_max : "0" + minutes_max);
    var ul = document.createElement("ul");
    ul.className = "stops";
    var _loop_1 = function (i) {
        if (response.busDepartureA[i].time < min ||
            response.busDepartureA[i].time > max)
            return "continue";
        var li = document.createElement("li");
        li.innerHTML = response.busDepartureA[i].time;
        li.className = "stop";
        li.style.cursor = "pointer";
        li.onclick = function () {
            return onStopClick(response.busDepartureA[i].busLineId, response.busDepartureA[i].time, li);
        };
        ul.appendChild(li);
    };
    for (var i = 0; i < response.busDepartureA.length; i++) {
        _loop_1(i);
    }
    document.body.appendChild(ul);
}
//smerove da uvedes, proveri koja je koja stanica
//ime stanice iznad stops kada se klikne
//mogucnost vracanja nazad
//vikendi (fajl i datum uvedi da uzima i tako izlistava po danu)
function onClick(btn_text) {
    return __awaiter(this, void 0, void 0, function () {
        var name, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = btn_text.split(" ").join("_");
                    return [4 /*yield*/, get("".concat(url).concat(name))];
                case 1:
                    response = _a.sent();
                    if (btn_group) {
                        document.body.removeChild(btn_group);
                    }
                    makeStops(response);
                    return [2 /*return*/];
            }
        });
    });
}
function getButtons(url) {
    return __awaiter(this, void 0, void 0, function () {
        var options;
        return __generator(this, function (_a) {
            options = {
                method: "GET"
            };
            fetch(url, options)
                .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                else
                    throw new Error("Response: " + response.status);
            })
                .then(function (data) {
                var array = data.stations_arr;
                var _loop_2 = function (i) {
                    var btn = document.createElement("button");
                    btn.innerHTML = array[i];
                    btn.className = "btn";
                    btn.id = "btn_id";
                    btn.onclick = function () { return onClick(btn.innerHTML); };
                    var group = document.querySelector("#btn_group");
                    if (group) {
                        group.appendChild(btn);
                    }
                };
                for (var i = 0; i < array.length; i++) {
                    _loop_2(i);
                }
            });
            return [2 /*return*/];
        });
    });
}
function start() {
    getButtons(url);
}
start();
