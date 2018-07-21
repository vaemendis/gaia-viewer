import {Player, AdvTechTile, TechTile, TechTilePos, ScoringTile, FinalTile, AvailableCommand, GaiaHex, AdvTechTilePos, Booster} from "@gaia-project/engine";

export interface AugmentedPlayer extends Player {
  progress: {[key in FinalTile]: number};
}

export type MapData = GaiaHex[];

export interface Data {
  map: MapData,
  availableCommands: AvailableCommand[];
  players: AugmentedPlayer[];
  round: number;
  techTiles: {
    [key in TechTilePos]: {
      tile: TechTile,
      numTiles: number
    }
  },
  advTechTiles: {
    [key in TechTilePos]: {
      tile: AdvTechTile,
      numTiles: number
    }
  },
  roundBoosters: {
    [key in Booster]?: boolean
  },
  roundScoringTiles: [ScoringTile, ScoringTile, ScoringTile, ScoringTile, ScoringTile, ScoringTile];
  finalScoringTiles: [FinalTile, FinalTile];
  // Should the next move be placed on a whole new line?
  newTurn: boolean;
}

export type HighlightHexData = Map<GaiaHex, {cost?: string}>;

export interface GameContext {
  highlighted: {
    hexes: HighlightHexData,
    researchTiles: Set<string>,
    techs: Set<TechTilePos | AdvTechTilePos>,
    boosters: Set<Booster>
  };

  coordsMap: Map<string, GaiaHex>;
  activeButton: any;
}
