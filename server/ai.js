// ai.js - the AI feature: it reads a food name and suggests a fridge category.
// It uses Transformers.js with a small zero-shot classification model that runs on this computer.
// The model is downloaded once from Hugging Face into .model-cache and then works offline.

const path = require("path");
const { pathToFileURL } = require("url");

const MODEL = process.env.AI_MODEL || "Xenova/nli-deberta-v3-xsmall";

// What the model chooses from, and the Soonish category each answer means.
const LABELS = {
  "a dairy product": "Dairy",
  "a vegetable": "Vegetables",
  "a fruit": "Fruit",
  "meat": "Meat",
  "a cooked meal": "Leftovers",
  "a sauce or snack": "Other"
};

let classifierPromise = null;

// Loads the model only once. Transformers.js is an ES module, so it is loaded with import().
function getClassifier() {
  if (!classifierPromise) {
    classifierPromise = (async () => {
      const entry = require.resolve("@huggingface/transformers");
      const { pipeline, env } = await import(pathToFileURL(entry).href);
      env.cacheDir = path.join(__dirname, ".model-cache");
      return pipeline("zero-shot-classification", MODEL, { dtype: "q8" });
    })();
    classifierPromise.catch(() => {
      classifierPromise = null; // try again on the next request
    });
  }
  return classifierPromise;
}

async function suggestCategory(foodName) {
  const classifier = await getClassifier();
  const result = await classifier(foodName, Object.keys(LABELS), {
    hypothesis_template: foodName + " is {}."
  });
  return {
    category: LABELS[result.labels[0]],
    confidence: Math.round(result.scores[0] * 100)
  };
}

module.exports = { suggestCategory, getClassifier, MODEL };
