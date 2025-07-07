/**
 * Represents a keyboard input handler for the game.
 * Tracks the state of various input keys for character control.
 * @class KeyBoard
 */
class KeyBoard {
  /** @type {boolean} Left arrow key state */
  LEFT = false;
  /** @type {boolean} Right arrow key state */
  RIGHT = false;
  /** @type {boolean} Up arrow key state */
  UP = false;
  /** @type {boolean} Down arrow key state */
  DOWN = false;
  /** @type {boolean} Space/Jump key state */
  JUMP = false;
  /** @type {boolean} Throw key state */
  THROW = false;
  /** @type {boolean} F key state for special actions */
  F = false;
}
