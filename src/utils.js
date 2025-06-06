import { mageSkillsTree } from "./mageSkillsTree";
import { guerrierSkillsTree } from "./guerrierSkillsTree";
import { rodeurSkillsTree } from "./rodeurSkillsTree";

export function restoreSkillGetters(skillsTree, classe) {
  let refTree;
  if (classe === "mage") refTree = mageSkillsTree;
  else if (classe === "guerrier") refTree = guerrierSkillsTree;
  else if (classe === "rodeur") refTree = rodeurSkillsTree;
  else return skillsTree;

  function restore(key) {
    if (refTree[key] && skillsTree[key]) {
      if (refTree[key].hasOwnProperty("damage")) {
        Object.defineProperty(
          skillsTree[key],
          "damage",
          Object.getOwnPropertyDescriptor(refTree[key], "damage")
        );
      }
      if (skillsTree[key].children && Array.isArray(skillsTree[key].children)) {
        skillsTree[key].children.forEach(restore);
      }
    }
  }

  // Lance la restauration sur chaque racine
  Object.keys(skillsTree).forEach(restore);

  return skillsTree;
}