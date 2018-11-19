
export default function handleArrows(direction) {
  if (direction === "Left" || direction === "Right") {
    if (this.state.words.length === 0) {
      return;
    }

    this.setState(state => {
      this.handleCursorMove(state, direction);
      return state;
    });
  }
}
  