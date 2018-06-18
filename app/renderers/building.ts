import { Building, Faction } from "@gaia-project/engine";
import { factionColor } from "../graphics/utils";

export default class BuildingRenderer extends PIXI.Graphics {
  constructor(building: Building, faction:Faction, scale: number, border: number) {
    super();

    this.lineStyle(border*2, 0x303030);
    this.beginFill(factionColor(faction));
//TODO render different buildings
    switch (building) {
      case Building.Mine: {
        this.drawRect(-0.2*scale, -0.2 * scale, 0.4 * scale, 0.4 * scale);
        break;
      }
      case Building.PlanetaryInstitute: {
        this.drawRect(-0.4*scale, -0.4 * scale, 0.8 * scale, 0.8 * scale);
        break;
      }
      case Building.TradingStation: {
        this.drawPolygon([-0.5, Math.sqrt(3)/4, 0.5, Math.sqrt(3)/4, 0, -Math.sqrt(3)/4, -0.5, Math.sqrt(3)/4].map(x => x * scale*0.6));
        break;
      }
      case Building.ResearchLab: {
        this.drawCircle(0, 0, 0.3*scale);
        break;
      }
      case Building.Academy1:
      case Building.Academy2: {
        this.drawCircle(0, 0, 0.5*scale);
        break;
      }
      case Building.PlanetaryInstitute: {
        this.drawRect(-0.3*scale, -0.3 * scale, 0.6 * scale, 0.6 * scale);
        break;
      }
    }

    this.endFill();
  }
}