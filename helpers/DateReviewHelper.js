function reviewDate() {

let date = new Date();
let businessDays = 0;

while (businessDays < 3) {

date.setDate(date.getDate() + 1);

const day = date.getDay();

if (day !== 0 && day !== 6) {
businessDays++;
}
}

return date.toDateString();
}

module.exports = {
reviewDate
};