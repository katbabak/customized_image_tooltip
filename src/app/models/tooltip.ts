import {
  POSITION_X,
  POSITION_Y
} from './enums';

export class ToolTip {
  posX: POSITION_X.LEFT | POSITION_X.CENTER | POSITION_X.RIGHT;
  posY: POSITION_Y.TOP | POSITION_Y.BOTTOM;
  color: string;
  text: string;
}
