import GameStateService from "./GameStateService";

export default class GameState {
  static from(object) {
    // TODO: create object
    let gameStateService = new GameStateService(localStorage);
    gameStateService.save(object);
    return null;
  }
}
