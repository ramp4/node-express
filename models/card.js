const path = require("path");
const fs = require("fs");
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "card.json"
);

class Card {
  static async remove(id) {
    const card = await Card.fetch();
    const idx = card.courses.findIndex(item => item.id === id);
    const course = card.courses[idx];

    if (course.count === 1) {
      // card.courses.filter(item => item.id !== id);
      card.courses.splice(idx, 1);
    } else {
      card.courses[idx].count--;
    }
    card.price -= course.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(card), err => {
        if (err) reject(err);
        resolve(card);
      });
    });
  }

  static async add(course) {
    const card = await Card.fetch();

    const idx = card.courses.findIndex(item => item.id === course.id);
    const candidate = card.courses[idx];

    if (candidate) {
      candidate.count++;
      card.courses[idx] = candidate;
    } else {
      course.count = 1;
      card.courses.push(course);
    }

    card.price += +course.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(card), err => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(p, "utf-8", (err, content) => {
        if (err) reject(err);
        resolve(JSON.parse(content));
      });
    });
  }
}

module.exports = Card;
