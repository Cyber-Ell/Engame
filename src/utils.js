import { words } from "../../../Tenzies/src/word";

export function   getRandomWord () {
      const randomIndex = Math.floor(Math.random() * words.length);
      return words[randomIndex];
}

export function getFarewellText(language){
      const option = [
            `Farewell, ${language}`,
            `Adios, ${language}`,
            `R.I.P, ${language}`,
            `we'll miss you, ${language}`,
            `oh no ,not  ${language}`,
            ` ${language} bies the dust`,
            `Gone but not forgotten, ${language}`,
            `The end of ${language} as we know it`,
            `Off into the sundet, ${language}`,
            ` ${language} its been real`,
            ` ${language} your watcg has ended`,
            ` ${language} has left the building`,
      ];

      const randomIndex = Math.floor(Math.random() * option.length)
      return option[randomIndex]
}