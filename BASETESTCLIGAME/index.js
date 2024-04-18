#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow("How well do you know me? \n");

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue("HOW TO PLAY")} 
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed("killed")}
    So get all the questions right...

  `);
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });

  playerName = answers.player_name;
}

async function question1() {
  const answers = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message: "whats my brothers name?\n",
    choices: ["lexso", "rolando", "leon", "alveiro "],
  });

  return handleAnswer(answers.question_1 === "Jose Roberto Molina Duran");
}

async function question2() {
  const answers = await inquirer.prompt({
    name: "question_2",
    type: "list",
    message: "whats my favorite movie?\n",
    choices: ["memento", "about time", "how to train your dragon", "avengers "],
  });

  return handleAnswer(answers.question_2 === "about time");
}

async function question3() {
  const answers = await inquirer.prompt({
    name: "question_3",
    type: "list",
    message: "whats favorite food?\n",
    choices: ["pizza", "burguers", "burritos", "tacos "],
  });

  return handleAnswer(answers.question_3 === "burguers");
}

async function question4() {
  const answers = await inquirer.prompt({
    name: "question_4",
    type: "list",
    message: "when is my birthday?\n",
    choices: ["jun 5", "jul 5", "jun 7", "april 14 "],
  });

  return handleAnswer(answers.question_4 === "jun 5");
}

async function question5() {
  const answers = await inquirer.prompt({
    name: "question_5",
    type: "list",
    message: "whats my favorite hobbie?\n",
    choices: ["watch movies", "draw", "sleep", "eat"],
  });

  return handleAnswer(answers.question_5 === "watch movies");
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer...").start();
  await sleep();

  if (isCorrect) {
    spinner.success({ text: `Nice work ${playerName}. That's a legit answer` });
  } else {
    spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
    process.exit(1);
  }
}

function winner() {
  console.clear();
  figlet(`Congrats , ${playerName} !`, (err, data) => {
    console.log(gradient.pastel.multiline(data) + "\n");

    console.log(chalk.green(`I owe you your favorite thing in the world`));

    process.exit(0);
  });
}

console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
winner();
