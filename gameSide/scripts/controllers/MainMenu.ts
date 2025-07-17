// MainMenu.ts
import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MainMenu')
export class MainMenu extends Component {
  @property(Node)
  buttonsContainer: Node = null!;  // drag ButtonContainer here

  onLoad() {
    this.buttonsContainer.children.forEach(btnNode => {
      btnNode.on('click', () => {
        // Extract level number from button name
        // e.g. btnNode.name = "Btn_Level1" → sceneName = "Level1"
        // e.g. btnNode.name = "Btn_Level2" → sceneName = "Level2"
        const buttonName = btnNode.name;
        const levelMatch = buttonName.match(/Level(\d+)/);
        
        if (levelMatch) {
          const levelNumber = levelMatch[1];
          const sceneName = `Level${levelNumber}`;
          console.log(`Loading scene: ${sceneName}`);
          director.loadScene(sceneName);
        } else {
          console.warn(`Could not extract level from button name: ${buttonName}`);
        }
      });
    });
  }
}